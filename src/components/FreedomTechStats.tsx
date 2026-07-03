import { useEffect, useState } from 'react';
import { Bitcoin, Zap, Gauge, Users } from 'lucide-react';

interface Stats {
  blockHeight: number | null;
  satsPerDollar: number | null;
  mediumFee: number | null;
  nostrUsers: number | null;
}

const CORS_PROXY = 'https://proxy.shakespeare.diy/?url=';

async function fetchJSON(url: string) {
  const res = await fetch(CORS_PROXY + encodeURIComponent(url));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
  unit?: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold text-foreground">
          {value ?? <span className="animate-pulse text-muted-foreground text-base">Loading…</span>}
          {value && unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</div>
      </div>
    </div>
  );
}

export function FreedomTechStats() {
  const [stats, setStats] = useState<Stats>({
    blockHeight: null,
    satsPerDollar: null,
    mediumFee: null,
    nostrUsers: null,
  });

  // Fetch Bitcoin stats from mempool.space
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [heightRes, priceData, feeData] = await Promise.all([
          fetch(CORS_PROXY + encodeURIComponent('https://mempool.space/api/blocks/tip/height'))
            .then((r) => r.text()),
          fetchJSON('https://mempool.space/api/v1/prices'),
          fetchJSON('https://mempool.space/api/v1/fees/recommended'),
        ]);

        if (cancelled) return;

        const height = parseInt(heightRes.trim(), 10);
        const usdPrice = priceData.USD as number;
        const satsPerDollar = usdPrice > 0 ? Math.round(100_000_000 / usdPrice) : null;
        const mediumFee = feeData.halfHourFee as number;

        setStats((prev) => ({
          ...prev,
          blockHeight: isNaN(height) ? null : height,
          satsPerDollar,
          mediumFee,
        }));
      } catch (err) {
        console.error('Failed to fetch Bitcoin stats:', err);
      }
    }

    load();
    const interval = setInterval(load, 60_000); // refresh every minute
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  // Fetch Nostr live user count via nostrarchives WebSocket
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function connect() {
      if (cancelled) return;
      try {
        ws = new WebSocket('wss://api.nostrarchives.com/v1/ws/live-metrics');

        ws.onmessage = (e) => {
          if (cancelled) return;
          try {
            const data = JSON.parse(e.data);
            if (typeof data.online_users === 'number') {
              setStats((prev) => ({ ...prev, nostrUsers: data.online_users }));
            } else if (typeof data.active_pubkeys === 'number') {
              setStats((prev) => ({ ...prev, nostrUsers: data.active_pubkeys }));
            }
          } catch {
            // ignore parse errors
          }
        };

        ws.onerror = () => { ws?.close(); };

        ws.onclose = () => {
          if (!cancelled) reconnectTimer = setTimeout(connect, 5000);
        };
      } catch {
        if (!cancelled) reconnectTimer = setTimeout(connect, 5000);
      }
    }

    connect();
    return () => {
      cancelled = true;
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={Bitcoin}
          label="Block Height"
          value={stats.blockHeight !== null ? stats.blockHeight.toLocaleString() : null}
          color="bg-primary"
        />
        <StatCard
          icon={Zap}
          label="Sats per Monopoly Money Buck"
          value={stats.satsPerDollar !== null ? stats.satsPerDollar.toLocaleString() : null}
          unit="sats/$"
          color="bg-primary"
        />
        <StatCard
          icon={Gauge}
          label="Medium Priority Fee"
          value={stats.mediumFee !== null ? String(stats.mediumFee) : null}
          unit="sat/vB"
          color="bg-primary"
        />
        <StatCard
          icon={Users}
          label="People on Nostr Right Now"
          value={stats.nostrUsers !== null ? stats.nostrUsers.toLocaleString() : null}
          color="bg-primary"
        />
      </div>
    </div>
  );
}
