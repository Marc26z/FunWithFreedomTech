import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { Plus, Film, Loader2, BookOpen, ShoppingBag, Home, Menu, X, Github, Link, Wrench, Play } from 'lucide-react';
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
import { RecentBlogPosts } from '@/components/RecentBlogPosts';
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
                href="https://habla.news/p/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </a>
              <a
                href="https://primal.net/marc/support/"
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
                  href="https://habla.news/p/npub1marc26z8nh3xkj5rcx7ufkatvx6ueqhp5vfw9v5teq26z254renshtf3g0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5" />
                  Blog
                </a>
                <a
                  href="https://primal.net/marc/support/"
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

          {/* Yakihonne follow CTA */}
          <p className="text-muted-foreground text-base">
            Want to get notified when I publish new blogs?{' '}
            <a
              href="https://yakihonne.com/users/nprofile1qqs9l4jjqs4kpq4shg2lgk2ze9r5wu7prl9xsxp75g46fzq5yjegm9cpremhxue69uhkummnw3ez6ur4vgh8wetvd3hhyer9wghxuet5qgswaehxw309ahx7uewd3hkcqpr4mhxue69uhhyetvv9ujuam9wd6x2unwvf6xxtnrdaks4qe3e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#484dd4] hover:text-[#484dd4]/80 font-semibold hover:underline transition-colors"
            >
              Follow me on Yakihonne
            </a>
            {' '}— a free Nostr app built for long-form reading.{' '}
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-1 text-[#484dd4] hover:text-[#484dd4]/80 font-semibold hover:underline transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Watch how it works
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black border-[#484dd4]/50">
                <DialogHeader className="px-4 pt-4 pb-2">
                  <DialogTitle className="text-[#484dd4]">Getting started with Yakihonne</DialogTitle>
                </DialogHeader>
                <div className="px-4 pb-4">
                  <video
                    src="https://yakihonne.s3.ap-east-1.amazonaws.com/videos/yakihonne-mobile-app-promo.mp4"
                    controls
                    autoPlay
                    className="w-full rounded-lg border border-[#484dd4]/30"
                    style={{ maxHeight: '60vh' }}
                  />
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    After watching, download the app and search for{' '}
                    <a
                      href="https://yakihonne.com/users/nprofile1qqs9l4jjqs4kpq4shg2lgk2ze9r5wu7prl9xsxp75g46fzq5yjegm9cpremhxue69uhkummnw3ez6ur4vgh8wetvd3hhyer9wghxuet5qgswaehxw309ahx7uewd3hkcqpr4mhxue69uhhyetvv9ujuam9wd6x2unwvf6xxtnrdaks4qe3e"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#484dd4] hover:underline"
                    >
                      marc@funwithfreedomtech.com
                    </a>
                    {' '}to follow and get notified of new articles.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </p>
          <div className="flex justify-center pt-2">
            <ProfileZapButton pubkey={MARC_PUBKEY} />
          </div>
        </div>

        {/* Latest Blog Posts */}
        <RecentBlogPosts />

        {/* Blog disclaimer & Boris */}
        <p className="text-muted-foreground text-sm text-center max-w-2xl mx-auto mt-4 mb-10 leading-relaxed">
          This is an independent website. This is not investment or cybersecurity advice. This is how I play with cryptography.{' '}
          <strong className="text-white">To listen to the blog, click on the headphones icon within the article. You will be taken to the{' '}
          <a href="https://github.com/dergigi/boris" target="_blank" rel="noopener noreferrer" className="text-[#484dd4] hover:underline">Boris App</a>
          {' '}or{' '}
          <a href="https://read.withboris.com/explore" target="_blank" rel="noopener noreferrer" className="text-[#484dd4] hover:underline">website</a>
          . This nostr client allows readers to listen to the article.</strong>
        </p>

        {/* My Divine Videos Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#484dd4] text-center mt-12 mb-4">
          My Divine Videos
        </h2>

        {/* Divine CTA */}
        <div className="mb-6 text-center">
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