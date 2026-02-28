import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';

// Video author pubkeys
const VIDEO_AUTHOR_PUBKEYS = [
  'df478fc5f39807c6085e431fea34e6e8197fe4cd7a91bbe9aef75263056ab619', // npub1marcl30nnqruvzz7gv075d8xaqvhlexd02gmh6dw7afxxpt2kcvs44xf53
  'df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67', // npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0
];

// NIP-71 Video kinds
const VIDEO_KINDS = {
  NORMAL: 34235,      // Addressable normal videos
  SHORT: 34236,       // Addressable short videos
};

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
 * Hook to fetch NIP-71 videos from the configured authors
 */
export function useVideos() {
  const { nostr } = useNostr();

  return useQuery<ParsedVideo[]>({
    queryKey: ['videos', VIDEO_AUTHOR_PUBKEYS],
    queryFn: async ({ signal }) => {
      const events = await nostr.query(
        [{
          kinds: [VIDEO_KINDS.NORMAL, VIDEO_KINDS.SHORT],
          authors: VIDEO_AUTHOR_PUBKEYS,
          limit: 100,
        }],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]) }
      );
      
      // Parse and filter valid video events
      const videos = events
        .map(parseVideoEvent)
        .filter((v): v is ParsedVideo => v !== null)
        .sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
      
      return videos;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

export { VIDEO_KINDS };
