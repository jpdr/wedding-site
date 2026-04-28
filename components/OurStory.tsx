import Image from 'next/image';
import SectionContainer from './SectionContainer';
import { weddingConfig } from '@/lib/wedding-config';

export default function OurStory() {
  const { headline, body, photo } = weddingConfig.story;

  return (
    <SectionContainer id="story" className="bg-white">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-teal-200 via-emerald-200 to-emerald-400 shadow-xl">
          {photo ? (
            <Image
              src={photo}
              alt="Our story"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
            Our Story
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light text-emerald-900 sm:text-5xl">
            {headline}
          </h2>
          <div className="mt-6 h-px w-16 bg-teal-400" />
          <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-700 sm:text-lg">
            {body}
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
