import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { nip19 } from 'nostr-tools';
import type { NostrEvent } from '@nostrify/nostrify';

// Marc's pubkey — npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0
const MARC_PUBKEY = 'df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67';

interface BlogPost {
  title: string;
  summary: string;
  publishedAt: number;
  image?: string;
  url: string;
  slug: string;
}

function parseBlogPost(event: NostrEvent): BlogPost | null {
  const title = event.tags.find(([name]) => name === 'title')?.[1];
  const dTag = event.tags.find(([name]) => name === 'd')?.[1];
  if (!title || !dTag) return null;

  const summary = event.tags.find(([name]) => name === 'summary')?.[1]
    ?? event.content.slice(0, 200).trim() + (event.content.length > 200 ? '…' : '');
  const image = event.tags.find(([name]) => name === 'image')?.[1];
  const publishedAtStr = event.tags.find(([name]) => name === 'published_at')?.[1];
  const publishedAt = publishedAtStr ? parseInt(publishedAtStr) : event.created_at;

  // Build the naddr URL for the post
  const naddr = nip19.naddrEncode({
    kind: event.kind,
    pubkey: event.pubkey,
    identifier: dTag,
    relays: [],
  });

  return {
    title,
    summary,
    publishedAt,
    image,
    url: `https://staging-funwithfreedomtechblog.shakespeare.wtf/${naddr}`,
    slug: dTag,
  };
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="overflow-hidden border-border/50 hover:border-[#484dd4]/50 transition-all h-full">
        {post.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardContent className="p-4">
          <h3 className="font-semibold text-base text-[#484dd4] line-clamp-2 mb-2 group-hover:underline">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {post.summary}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarDays className="w-3 h-3" />
            {formatDate(post.publishedAt)}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

function BlogSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <Skeleton className="h-3 w-24" />
      </CardContent>
    </Card>
  );
}

export function RecentBlogPosts() {
  const { nostr } = useNostr();

  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts', MARC_PUBKEY],
    queryFn: async ({ signal }) => {
      const events = await nostr.query(
        [{
          kinds: [30023],
          authors: [MARC_PUBKEY],
          limit: 10,
        }],
        { signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]) }
      );

      return events
        .map(parseBlogPost)
        .filter((p): p is BlogPost => p !== null)
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, 3);
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#484dd4] text-center mb-6">
        Latest Blog Posts
      </h2>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
        </div>
      )}

      {error && (
        <Card className="border-dashed max-w-md mx-auto">
          <CardContent className="py-8 px-8 text-center">
            <p className="text-muted-foreground text-sm">
              Having trouble loading blog posts. Please check your connection.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && posts && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {!isLoading && !error && (!posts || posts.length === 0) && (
        <Card className="border-dashed max-w-md mx-auto">
          <CardContent className="py-8 px-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                No blog posts found yet.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
