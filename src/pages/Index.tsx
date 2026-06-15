import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Video, Plus, Film, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoginArea } from '@/components/auth/LoginArea';
import { VideoCard } from '@/components/VideoCard';
import { VideoUploadForm } from '@/components/VideoUploadForm';
import { useVideos } from '@/hooks/useVideos';
import { useCurrentUser } from '@/hooks/useCurrentUser';

function VideoSkeleton() {
  return (
    <Card className="overflow-hidden bg-card border-border/50">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

const Index = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { user } = useCurrentUser();
  const { data: videos, isLoading, error } = useVideos();
  
  useSeoMeta({
    title: "Marc's Freedom Tech Fun",
    description: 'Fun With Freedom Tech',
  });

  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <a href="https://marc.shakespeare.wtf/" className="shrink-0">
                <img
                  src="/FreedomTech.jpg"
                  alt="Freedom Tech"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </a>
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                  Marc's Freedom Tech Fun
                </h1>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <a
                href="https://habla.coracle.social/p/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {user && (
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Post Video</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="sr-only">Post a Video</DialogTitle>
                    </DialogHeader>
                    <VideoUploadForm />
                  </DialogContent>
                </Dialog>
              )}
              <LoginArea className="max-w-[200px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground max-w-2xl mx-auto">
            Fun With Freedom Tech
          </h2>
          <h3 className="text-xl md:text-2xl">
            <a 
              href="https://divine.video/discovery/classics" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Welcome To The Free Internet. We have Vine Videos.
            </a>
          </h3>
        </div>

        {/* Short Videos Grid */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <VideoSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <Card className="border-dashed max-w-md mx-auto">
            <CardContent className="py-12 px-8 text-center">
              <div className="max-w-sm mx-auto space-y-4">
                <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
                <p className="text-muted-foreground">
                  Having trouble loading videos. Please check your connection and try again.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !error && (
          <>
            {videos && videos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {videos.map((video) => (
                  <VideoCard key={video.event.id} video={video} />
                ))}
              </div>
            ) : (
              <EmptyState type="shorts" />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Vibed with{' '}
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shakespeare
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

function EmptyState({ type = 'videos' }: { type?: 'videos' | 'shorts' | string }) {
  const getMessage = () => {
    switch (type) {
      case 'shorts':
        return 'No short videos found yet. Check back later!';
      case 'videos':
        return 'No long-form videos found yet. Check back later!';
      default:
        return 'No videos found yet. Be the first to post one!';
    }
  };

  return (
    <Card className="border-dashed max-w-md mx-auto">
      <CardContent className="py-12 px-8 text-center">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
            <Film className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            {getMessage()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Index;
