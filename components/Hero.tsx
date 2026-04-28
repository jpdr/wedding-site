import Countdown from './Countdown';
import { weddingConfig } from '@/lib/wedding-config';

function formatWeddingDate(iso: string): string {
  const d = new Date(iso);
  const datePart = d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  return `${datePart}, ${weekday}`;
}

export default function Hero() {
  const { partner1, partner2 } = weddingConfig.coupleNames;
  const dateLabel = formatWeddingDate(weddingConfig.weddingDate);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-turquoise-700 via-turquoise-800 to-turquoise-900 px-6 py-24 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/80 sm:text-sm">
          We&apos;re getting married
        </p>
        <h1 className="font-script text-7xl leading-none tracking-normal sm:text-8xl lg:text-9xl">
          {partner1}
          <span className="mx-3 inline-block text-white/80 sm:mx-5">&</span>
          {partner2}
        </h1>
        <div className="h-px w-24 bg-white/40" />
        <p className="font-pt-serif text-lg tracking-wide sm:text-xl">
          {dateLabel}
        </p>
        <div className="mt-2">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
