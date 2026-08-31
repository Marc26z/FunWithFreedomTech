import { useState, useEffect } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Video, Plus, Film, Loader2, BookOpen, ShoppingBag, Home, Menu, X, Github, Link, Wrench, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { RecentBlogPosts } from '@/components/RecentBlogPosts';
import { useVideos } from '@/hooks/useVideos';
import { useCurrentUser } from '@/hooks/useCurrentUser';
 
// Marc's pubkey — npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0
const MARC_PUBKEY = 'df478568479de26b4a83c1bdc4dbab61b5cc82e1a312e2b28bc815a12a951e67';

// Listmonk newsletter configuration
// 1. Set LISTMONK_URL to your Listmonk instance URL (e.g. https://listmonk.funwithfreedomtech.com)
// 2. Set LISTMONK_LIST_UUID to your public list's UUID (found in the Listmonk admin dashboard under Lists)
const LISTMONK_URL = 'https://listmonk.funwithfreedomtech.com';
const LISTMONK_LIST_UUID = '';

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
                href="https://btcpay.funwithfreedomtech.com/apps/9UT7XBHWVKJhbSZhfthKgV96on2/pos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Support
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
                href="https://art.funwithfreedomtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Link className="w-4 h-4" />
                Art
              </a>
              <a
                href="https://nostrlinks.funwithfreedomtech.com/naddr1qvzqqqr4xvpzph68s45y080zdd9g8sdacnd6kcd4ejpwrgcju2eghjq45y4f28n8qqkxummnw3ex2efdvymnqd3jxajxgtfc8ycrvtf5v3jngtfcvcuxxtfcxvmnye3c89jrzctyv5m079ck"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Wrench className="w-4 h-4" />
                ToolBox
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
                  href="https://funwithfreedomtech.com/"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  Home
                </a>
                <a
                  href="https://wordstr.funwithfreedomtech.com/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  Blog
                </a>
                <a
                  href="https://btcpay.funwithfreedomtech.com/apps/9UT7XBHWVKJhbSZhfthKgV96on2/pos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Support
                </a>
                <a
                  href="https://github.com/Marc26z/FunWithFreedomTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://art.funwithfreedomtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link className="w-5 h-5" />
                  Art
                </a>
                <a
                  href="https://nostrlinks.funwithfreedomtech.com/naddr1qvzqqqr4xvpzph68s45y080zdd9g8sdacnd6kcd4ejpwrgcju2eghjq45y4f28n8qqkxummnw3ex2efdvymnqd3jxajxgtfc8ycrvtf5v3jngtfcvcuxxtfcxvmnye3c89jrzctyv5m079ck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Wrench className="w-5 h-5" />
                  ToolBox
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
          <h2 className="text-2xl md:text-3xl font-semibold text-[#484dd4] max-w-2xl mx-auto">
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
          <p className="text-[#ffffff] font-semibold text-lg">
            This website is a place used to display art that celebrates technology that keeps us free. Freedom tech has <a href="https://en.wikipedia.org/wiki/Interoperability">Interoperability</a>. Freedom tech is fun.
          </p>
          <div className="flex justify-center pt-2">
            <ProfileZapButton pubkey={MARC_PUBKEY} />
          </div>
        </div>

        {/* Forum Section */}
        <div className="mb-10">
          <h4 className="text-2xl md:text-3xl font-semibold text-[#484dd4] text-center mb-6">
             Have Fun Writing On My Board
          </h4>
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
                    "text-color": "#ffffff",
                    "text-muted-color": "#999999",
                    "button-text-color": "#484dd4",
                    "border-radius": "0.75rem"
                  }'
                ></lightning-messageboard>`,
              }}
            />
          </div>
        </div>

        {/* Email Subscribe Section — hidden until the Listmonk server is ready.
            To re-enable: remove this comment wrapper (the opening line above and the closing marker below).
            Note: the hidden input name="l" holds the Listmonk list UUID — one hidden input per list.
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#484dd4] text-center mb-6">
            Have Fun Reading My Emails
          </h2>
          <div className="max-w-xl mx-auto border-2 border-[#484dd4] rounded-xl p-6 md:p-8 bg-card">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#484dd4]/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-[#484dd4]" />
              </div>
              <p className="text-muted-foreground">
                Subscribe to my newsletter for updates on freedom tech, nostr, and bitcoin.
              </p>
            </div>
            <form
              method="post"
              action={`${LISTMONK_URL}/subscription/form`}
              target="_blank"
              className="space-y-3"
            >
              <Input
                type="text"
                name="name"
                placeholder="Name (optional)"
                className="bg-background border-[#484dd4]/50 focus-visible:ring-[#484dd4]"
              />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="bg-background border-[#484dd4]/50 focus-visible:ring-[#484dd4]"
              />
              <input type="hidden" name="l" value={LISTMONK_LIST_UUID} />
              <Button
                type="submit"
                className="w-full bg-[#484dd4] hover:bg-[#484dd4]/90 text-white gap-2"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Powered by{' '}
              <a
                href="https://listmonk.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#484dd4] hover:underline"
              >
                Listmonk
              </a>
              {' '}— self-hosted, just like everything else here.
            </p>
          </div>
        </div>
        End of Email Subscribe Section */}

        {/* Latest Blog Posts */}
        <RecentBlogPosts />

        {/* My Divine Videos Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#484dd4] text-center mt-12 mb-6">
          My Divine Videos
        </h2>

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

        {/* Divine CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Like short videos?{' '}
            <a
              href="https://divine.video/discovery/classics/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#484dd4] hover:text-[#484dd4]/80 font-semibold hover:underline transition-colors"
            >
              Join Divine — the Vine reboot built on freedom tech. 🎬
            </a>
          </p>
        </div>
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
              Shakespeare & 🍝 code from Marc
            </a>
          </p>
    <p>
        <a href="https://primal.net/marc">npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0</a>
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