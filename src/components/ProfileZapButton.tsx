import { Zap } from 'lucide-react';
import { ZapDialog } from '@/components/ZapDialog';
import { useAuthor } from '@/hooks/useAuthor';
import { Button } from '@/components/ui/button';
import type { Event } from 'nostr-tools';

interface ProfileZapButtonProps {
  pubkey: string;
  className?: string;
}

export function ProfileZapButton({ pubkey, className }: ProfileZapButtonProps) {
  const { data: author } = useAuthor(pubkey);

  // Need the kind 0 event and a lightning address to zap
  if (!author?.event || (!author?.metadata?.lud16 && !author?.metadata?.lud06)) {
    return null;
  }

  return (
    <ZapDialog target={author.event as unknown as Event}>
      <Button
        className={`gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold ${className ?? ''}`}
        size="lg"
      >
        <Zap className="w-5 h-5 fill-current" />
        Zap Marc ⚡
      </Button>
    </ZapDialog>
  );
}
