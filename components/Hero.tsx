import Countdown from './Countdown';
import { weddingConfig } from '@/lib/wedding-config';

function formatWeddingDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Hero() {
  const { partner1, partner2 } = weddingConfig.coupleNames;
  const dateLabel = formatWeddingDate(weddingConfig.weddingDate);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-teal-400 via-emerald-500 to-emerald-700 px-6 py-24 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/80 sm:text-sm">
          We&apos;re getting married
        </p>
        <h1 className="font-serif text-5xl font-light leading-tight tracking-tight sm:text-7xl lg:text-8xl">
          {partner1}
          <span className="mx-3 inline-block text-white/70 sm:mx-5">&</span>
          {partner2}
        </h1>
        <div className="h-px w-24 bg-white/40" />
        <p className="text-lg font-light tracking-wide sm:text-xl">
          {dateLabel}
        </p>
        <div className="mt-2">
          <Countdown />
        </div>
        <a
          href="#story"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white"
        >
          Scroll <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
