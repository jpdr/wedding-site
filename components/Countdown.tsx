'use client';

import { useEffect, useState } from 'react';
import { weddingConfig } from '@/lib/wedding-config';

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeParts(target: number): TimeParts {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  return { days, hours, minutes, seconds, done: false };
}

export default function Countdown() {
  const target = new Date(weddingConfig.weddingDate).getTime();
  const [parts, setParts] = useState<TimeParts | null>(null);

  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) {
        return;
      }
      const next = getTimeParts(target);
      setParts(next);
      if (next.done) {
        return;
      }
      timerId = window.setTimeout(tick, 1000);
    };
    let timerId = window.setTimeout(tick, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [target]);

  if (!parts) {
    return <div className="h-[88px]" aria-hidden="true" />;
  }

  if (parts.done) {
    return (
      <div className="inline-flex items-center rounded-full bg-white/30 px-6 py-3 text-2xl text-white backdrop-blur">
        Today is the day!
      </div>
    );
  }

  const items = [
    { value: parts.days, label: 'Days' },
    { value: parts.hours, label: 'Hours' },
    { value: parts.minutes, label: 'Minutes' },
    { value: parts.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-[72px] rounded-2xl bg-white/15 px-4 py-3 text-center text-white ring-1 ring-white/20 backdrop-blur-md sm:min-w-[88px]"
        >
          <div className="text-3xl font-light leading-none sm:text-4xl">
            {item.value.toString().padStart(2, '0')}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] sm:text-xs">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
