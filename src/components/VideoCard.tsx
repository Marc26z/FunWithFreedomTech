import { useState } from 'react';
import { Play, Clock, Film, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ParsedVideo } from '@/hooks/useVideos';

interface VideoCardProps {
  video: ParsedVideo;
}

function formatDuration(seconds: string | undefined): string {
  if (!seconds) return '';
  const secs = parseFloat(seconds);
  if (isNaN(secs)) return '';
  
  const mins = Math.floor(secs / 60);
  const remainingSecs = Math.floor(secs % 60);
  
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}:${remainingMins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  }
  
  return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
}

function formatDate(timestamp: number | undefined): string {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWarning, setShowWarning] = useState(!!video.contentWarning);
  
  const primaryMedia = video.media[0];
  const thumbnail = primaryMedia?.thumbnail;
  const duration = primaryMedia?.duration;
  
  const handlePlayClick = () => {
    if (video.contentWarning && showWarning) {
      setShowWarning(false);
      return;
    }
    setIsPlaying(true);
  };
  
  return (
    <Card className="overflow-hidden group bg-card hover:bg-card/80 transition-all duration-300 border-border/50 hover:border-primary/30">
      <div className="relative aspect-video bg-black">
        {isPlaying ? (
          <video
            src={primaryMedia?.url}
            controls
            autoPlay
            className="w-full h-full object-contain"
            poster={thumbnail}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={video.alt || video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <Film className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
            
            {/* Content Warning Overlay */}
            {video.contentWarning && showWarning && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center">
                <AlertTriangle className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Content Warning</p>
                <p className="text-sm font-medium mb-4">{video.contentWarning}</p>
                <button
                  onClick={handlePlayClick}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Show Anyway
                </button>
              </div>
            )}
            
            {/* Play Button Overlay */}
            {(!video.contentWarning || !showWarning) && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Play video"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
            )}
            
            {/* Duration Badge */}
            {duration && !showWarning && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(duration)}
              </div>
            )}
            
            {/* Video Type Badge */}
            {video.isShort && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Short
              </Badge>
            )}
          </>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {video.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(video.publishedAt)}</span>
          
          {video.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-end">
              {video.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
