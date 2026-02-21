import { useState } from 'react';
import { Video, Link, FileText, Tag, AlertTriangle, Upload, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/useToast';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { VIDEO_KINDS } from '@/hooks/useVideos';

interface FormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  mimeType: string;
  duration: string;
  tags: string;
  contentWarning: string;
  isShort: boolean;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  videoUrl: '',
  thumbnailUrl: '',
  mimeType: 'video/mp4',
  duration: '',
  tags: '',
  contentWarning: '',
  isShort: false,
};

export function VideoUploadForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useCurrentUser();
  const { mutateAsync: createEvent } = useNostrPublish();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const generateDTag = () => {
    // Generate a unique d-tag from title + timestamp
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${slug}-${Date.now()}`;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to post videos.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a video title.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!formData.videoUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a video URL.',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(formData.videoUrl);
    } catch {
      toast({
        title: 'Error',
        description: 'Please enter a valid video URL.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const dTag = generateDTag();
      const kind = formData.isShort ? VIDEO_KINDS.SHORT : VIDEO_KINDS.NORMAL;
      const now = Math.floor(Date.now() / 1000);
      
      // Build imeta tag according to NIP-92
      const imetaParts = [`url ${formData.videoUrl}`];
      
      if (formData.mimeType) {
        imetaParts.push(`m ${formData.mimeType}`);
      }
      
      if (formData.thumbnailUrl) {
        imetaParts.push(`image ${formData.thumbnailUrl}`);
      }
      
      if (formData.duration) {
        imetaParts.push(`duration ${formData.duration}`);
      }
      
      // Build tags array
      const tags: string[][] = [
        ['d', dTag],
        ['title', formData.title.trim()],
        ['published_at', now.toString()],
        ['imeta', ...imetaParts],
        ['alt', `Video: ${formData.title.trim()}`],
      ];
      
      // Add content warning if provided
      if (formData.contentWarning.trim()) {
        tags.push(['content-warning', formData.contentWarning.trim()]);
      }
      
      // Add hashtags
      const hashtags = formData.tags
        .split(',')
        .map((t) => t.trim().toLowerCase().replace(/^#/, ''))
        .filter((t) => t.length > 0);
      
      for (const tag of hashtags) {
        tags.push(['t', tag]);
      }
      
      await createEvent({
        kind,
        content: formData.description.trim(),
        tags,
        created_at: now,
      });
      
      toast({
        title: 'Success',
        description: 'Your video has been posted!',
      });
      
      // Reset form
      setFormData(initialFormData);
      
      // Invalidate videos query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      
    } catch (error) {
      console.error('Failed to post video:', error);
      toast({
        title: 'Error',
        description: 'Failed to post video. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Post a Video
          </CardTitle>
          <CardDescription>
            Log in to post your own NIP-71 videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Please log in with your Nostr account to post videos.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Post a Video
        </CardTitle>
        <CardDescription>
          Share a video to the Nostr network using NIP-71 format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your video..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-secondary border-border min-h-[100px]"
            />
          </div>
          
          {/* Video URL */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              Video URL *
            </Label>
            <Input
              id="videoUrl"
              type="url"
              placeholder="https://example.com/video.mp4"
              value={formData.videoUrl}
              onChange={(e) => handleChange('videoUrl', e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Direct link to your video file (MP4, WebM, etc.)
            </p>
          </div>
          
          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Thumbnail URL
            </Label>
            <Input
              id="thumbnailUrl"
              type="url"
              placeholder="https://example.com/thumbnail.jpg"
              value={formData.thumbnailUrl}
              onChange={(e) => handleChange('thumbnailUrl', e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          
          {/* MIME Type and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mimeType">MIME Type</Label>
              <Input
                id="mimeType"
                placeholder="video/mp4"
                value={formData.mimeType}
                onChange={(e) => handleChange('mimeType', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                type="number"
                step="0.001"
                placeholder="120.5"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="music, tutorial, gaming"
              value={formData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Separate tags with commas
            </p>
          </div>
          
          {/* Content Warning */}
          <div className="space-y-2">
            <Label htmlFor="contentWarning" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Content Warning
            </Label>
            <Input
              id="contentWarning"
              placeholder="Optional: Add a content warning"
              value={formData.contentWarning}
              onChange={(e) => handleChange('contentWarning', e.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          
          {/* Short Video Toggle */}
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="isShort" className="text-base">Short Video</Label>
              <p className="text-xs text-muted-foreground">
                Mark as a short-form vertical video (Reels/Shorts style)
              </p>
            </div>
            <Switch
              id="isShort"
              checked={formData.isShort}
              onCheckedChange={(checked) => handleChange('isShort', checked)}
            />
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Post Video
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
