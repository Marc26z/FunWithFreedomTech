import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { useAppContext } from '@/hooks/useAppContext';

// Video author pubkey
const VIDEO_AUTHOR_PUBKEY = 'df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67'; // npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0

// NIP-71 Video kinds
const VIDEO_KINDS = {
  NORMAL: 34235,      // Addressable normal videos
  SHORT: 34236,       // Addressable short videos
};

// Hashtags that qualify a video for the video section.
const FEATURED_HASHTAGS = ['freedom', 'freedomtech', 'bitcoin'];

// nos.lol hosts some videos that are not on the user's configured relays
// (e.g. "PGP Is Not An NFT"), so always query it alongside them.
const EXTRA_READ_RELAYS = ['wss://nos.lol'];

export interface VideoMetadata {
  url: string;
  mimeType?: string;
  dimensions?: string;
  thumbnail?: string;
  blurhash?: string;
  duration?: string;
  bitrate?: string;
  fallbackUrls?: string[];
}

export interface ParsedVideo {
  event: NostrEvent;
  title: string;
  description: string;
  publishedAt?: number;
  dTag: string;
  isShort: boolean;
  media: VideoMetadata[];
  tags: string[];
  contentWarning?: string;
  alt?: string;
}

/**
 * Parse imeta tags from a video event according to NIP-92/NIP-71
 */
function parseImetaTags(tags: string[][]): VideoMetadata[] {
  const imetaTags = tags.filter(([name]) => name === 'imeta');
  
  return imetaTags.map((imetaTag) => {
    const metadata: VideoMetadata = { url: '' };
    const fallbackUrls: string[] = [];
    const thumbnails: string[] = [];
    
    // Parse each key-value pair in the imeta tag
    for (let i = 1; i < imetaTag.length; i++) {
      const entry = imetaTag[i];
      const spaceIndex = entry.indexOf(' ');
      if (spaceIndex === -1) continue;
      
      const key = entry.substring(0, spaceIndex);
      const value = entry.substring(spaceIndex + 1);
      
      switch (key) {
        case 'url':
          metadata.url = value;
          break;
        case 'm':
          metadata.mimeType = value;
          break;
        case 'dim':
          metadata.dimensions = value;
          break;
        case 'image':
          thumbnails.push(value);
          break;
        case 'blurhash':
          metadata.blurhash = value;
          break;
        case 'duration':
          metadata.duration = value;
          break;
        case 'bitrate':
          metadata.bitrate = value;
          break;
        case 'fallback':
          fallbackUrls.push(value);
          break;
      }
    }
    
    if (thumbnails.length > 0) {
      metadata.thumbnail = thumbnails[0];
    }
    if (fallbackUrls.length > 0) {
      metadata.fallbackUrls = fallbackUrls;
    }
    
    return metadata;
  }).filter((m) => m.url);
}

/**
 * Parse a NIP-71 video event into a structured format
 */
function parseVideoEvent(event: NostrEvent): ParsedVideo | null {
  const tags = event.tags;
  
  // Get required fields
  const dTag = tags.find(([name]) => name === 'd')?.[1];
  const title = tags.find(([name]) => name === 'title')?.[1];
  
  if (!dTag || !title) {
    return null;
  }
  
  // Parse imeta for video data
  const media = parseImetaTags(tags);

  if (media.length === 0) {
    // Some clients (e.g. flare.pub) publish a top-level `url` tag instead of imeta.
    const topLevelUrl = tags.find(([name]) => name === 'url')?.[1];
    if (topLevelUrl) {
      const topLevelThumb = tags.find(([name]) => name === 'thumb')?.[1]
        ?? tags.find(([name]) => name === 'image')?.[1];
      const topLevelDuration = tags.find(([name]) => name === 'duration')?.[1];
      media.push({
        url: topLevelUrl,
        mimeType: 'video/mp4',
        thumbnail: topLevelThumb,
        duration: topLevelDuration,
      });
    }
  }

  if (media.length === 0) {
    return null;
  }
  
  // Get optional fields
  const publishedAtStr = tags.find(([name]) => name === 'published_at')?.[1];
  const contentWarning = tags.find(([name]) => name === 'content-warning')?.[1];
  const alt = tags.find(([name]) => name === 'alt')?.[1];
  const hashtags = tags.filter(([name]) => name === 't').map(([, value]) => value);
  
  return {
    event,
    title,
    description: event.content,
    publishedAt: publishedAtStr ? parseInt(publishedAtStr) : event.created_at,
    dTag,
    isShort: event.kind === VIDEO_KINDS.SHORT,
    media,
    tags: hashtags,
    contentWarning,
    alt,
  };
}

/**
 * Returns true if a parsed video is tagged with one of FEATURED_HASHTAGS
 * (#freedom, #freedomtech, #bitcoin) — case-insensitive.
 * Checks both the t-tag array and the event content for inline hashtags.
 */
function hasFeaturedTag(video: ParsedVideo): boolean {
  const wanted = FEATURED_HASHTAGS;
  const inTags = video.tags.some((t) => wanted.includes(t.toLowerCase().replace(/^#/, '')));
  if (inTags) return true;
  const inline: string[] = video.event.content.match(/#[A-Za-z0-9_]+/g) ?? [];
  return inline.some((tag) => wanted.includes(tag.slice(1).toLowerCase()));
}

/**
 * Hook to fetch NIP-71 videos by Marc tagged with #freedom, #freedomtech, or #bitcoin.
 * Queries at the relay level for efficiency, then double-checks client-side
 * to catch any casing variations not caught by the relay filter.
 */
export function useVideos() {
  const { nostr } = useNostr();
  const { config } = useAppContext();

  return useQuery<ParsedVideo[]>({
    queryKey: ['videos', VIDEO_AUTHOR_PUBKEY, 'featured', FEATURED_HASHTAGS.join(','), config.relayMetadata.relays],
    queryFn: async ({ signal }) => {
      // Query the user's read relays plus the extra relays that host videos.
      const readRelays = config.relayMetadata.relays
        .filter((r) => r.read)
        .map((r) => r.url);
      const relays = [...new Set([...readRelays, ...EXTRA_READ_RELAYS])];

      const events = await nostr.query(
        [{
          kinds: [VIDEO_KINDS.NORMAL, VIDEO_KINDS.SHORT],
          authors: [VIDEO_AUTHOR_PUBKEY],
          // Relay `#t` filters are exact-match, so include the common casings.
          // Client-side hasFeaturedTag() below handles any edge cases.
          '#t': [
            'freedom', 'Freedom', 'FREEDOM',
            'freedomtech', 'FreedomTech', 'FREEDOMTECH',
            'bitcoin', 'Bitcoin', 'BITCOIN',
          ],
          limit: 500,
        }],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]), relays }
      );
      
      // Parse, validate, filter to the featured hashtags only, then sort newest first
      const videos = events
        .map(parseVideoEvent)
        .filter((v): v is ParsedVideo => v !== null)
        .filter(hasFeaturedTag)
        .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
      
      return videos;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

export { VIDEO_KINDS };
