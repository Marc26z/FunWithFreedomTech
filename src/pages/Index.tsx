import { useState, useEffect } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Video, Plus, Film, Loader2, BookOpen, ShoppingBag, Home, Menu, X, Heart, Clock, Bitcoin, CreditCard, Github, Link } from 'lucide-react';
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
import { ProfileZapButton } from '@/components/ProfileZapButton';
import { FreedomTechStats } from '@/components/FreedomTechStats';
import { useVideos } from '@/hooks/useVideos';
import { useCurrentUser } from '@/hooks/useCurrentUser';

// Marc's pubkey — npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0
const MARC_PUBKEY = 'df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useCurrentUser();

  // Load the lightning-messageboard custom element
  useEffect(() => {
    if (document.querySelector('script[data-messageboard]')) return;
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://esm.sh/@getalby/lightning-messageboard@latest';
    script.setAttribute('data-messageboard', 'true');
    document.head.appendChild(script);
  }, []);
  const { data: videos, isLoading, error } = useVideos();
  
  useSeoMeta({
    title: "Fun With Freedom Tech",
    description: 'Fun With Freedom Tech',
  });

  

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <a href="https://funwithfreedomtech.com/" className="shrink-0">
                <img
                  src="/FunWithFreedomTechLogo.png"
                  alt="Fun With Freedom Tech"
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </a>
              <div>
                
 <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#484dd4]">
                   Fun With Freedom Tech
                 </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <a
                href="https://funwithfreedomtech.com/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </a>
              <a
                href="https://wordstr.funwithfreedomtech.com/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </a>
              <a
                href="https://btcpay.funwithfreedomtech.com/apps/ohbN8koRxmVReyGbaurvgQtC5q1/pos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Store
              </a>
              <a
                href="https://github.com/Marc26z/FunWithFreedomTech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://nostrlinks.funwithfreedomtech.com/naddr1qvzqqqr4xvpzph68s45y080zdd9g8sdacnd6kcd4ejpwrgcju2eghjq45y4f28n8qqkxummnw3ex2efdvven2ef3xc6rztfcxdjrytf5vsmxzttpxqurstf48qmrxetxxu6kxvmzxvk5uv0h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Link className="w-4 h-4" />
                Nostr Links
              </a>
              <a
                href="https://primal.net/marc/support/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Heart className="w-4 h-4" />
                Support
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user && (
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 gap-2">
                      <Plus className="w-4 h-4" />
                      Post Video
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-border">
              <nav className="flex flex-col gap-1 mb-4">
                <a
                  href="httpsfunwithfreedomtech.com/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Home
                </a>
                <a
                  href="https://funwithfreedomtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  Blog
                </a>
                <a
                  href="https://shopstr.store/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Store
                </a>
                <a
                  href="https://timestamper.funwithfreedomtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Clock className="w-5 h-5" />
                  Timestamper
                </a>
                <a
                  href="https://lightningtipjar.shakespeare.wtf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bitcoin className="w-5 h-5" />
                  Make A Bitcoin Tip Jar
                </a>
                <a
                  href="https://cashucards.shakespeare.wtf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CreditCard className="w-5 h-5" />
                  Turn Bitcoin Into a Greeting Card
                </a>
                <a
                  href="https://github.com/Marc26z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://nostrlinks.shakespeare.wtf/naddr1qvzqqqr4xvpzph68s45y080zdd9g8sdacnd6kcd4ejpwrgcju2eghjq45y4f28n8qqkxummnw3ex2efdvven2ef3xc6rztfcxdjrytf5vsmxzttpxqurstf48qmrxetxxu6kxvmzxvk5uv0h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link className="w-5 h-5" />
                  Nostr Links
                </a>
                <a
                  href="https://primal.net/marc/support/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  Support
                </a>
              </nav>
              <div className="flex flex-col gap-3 px-4 pb-3">
                {user && (
                  <Dialog open={uploadDialogOpen} onOpenChange={(open) => { setUploadDialogOpen(open); if (open) setMobileMenuOpen(false); }}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                        <Plus className="w-4 h-4" />
                        Post Video
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
                <LoginArea className="flex" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Banner */}
      <div className="w-full flex justify-center bg-background py-4">
        <img
          src="/FunWithFreedomTechLogo.png"
          alt="Fun With Freedom Tech"
          className="max-h-[280px] w-auto object-contain"
        />
      </div>

      {/* Live Stats */}
      <FreedomTechStats />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground max-w-2xl mx-auto">
Fun With Freedom Tech
          </h2>
          <h3 className="text-xl md:text-2xl">
            <a 
              href="https://nostr.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#484dd4] hover:text-[#484dd4]/80 hover:underline transition-colors"
            >
              Have Fun Staying Free.
            </a>
          </h3>
          <p className="text-[#484dd4] font-semibold text-lg">
            Thank you for visiting.
          </p>
          <div className="flex justify-center pt-2">
            <ProfileZapButton pubkey={MARC_PUBKEY} />
          </div>
        </div>

        {/* Forum Section */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Fun With Freedom Tech Message Board
          </h2>
          {/* Replace the nwc-url value with a new NWC connection from your Alby wallet */}
          <div className="border-2 border-[#484dd4] rounded-xl overflow-hidden">
            <div
              dangerouslySetInnerHTML={{
                __html: `<lightning-messageboard
                  nwc-url="nostr+walletconnect://f96c53d55cda6b3603fb96266c3d8c8ce930b20c89d6e3766819365f2c112b46?relay=wss://relay.getalby.com&relay=wss://relay2.getalby.com&secret=b6163938675a64c868838a1c769e99bd77e252c93547cfc46d03f0877ad87ac2"
                  theme='{
                    "primary-color": "#484dd4",
                    "background-color": "#000000",
                    "border-color": "#484dd4",
                    "text-color": "#484dd4",
                    "text-muted-color": "#999999",
                    "button-text-color": "#484dd4",
                    "border-radius": "0.75rem"
                  }'
                ></lightning-messageboard>`,
              }}
            />
          </div>
        </div>

        {/* Short Videos Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
              Shakespeare & a pinch of🍝 code from npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0
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