import SectionContainer from './SectionContainer';
import { weddingConfig } from '@/lib/wedding-config';

export default function OurStory() {
  const { headline, body } = weddingConfig.story;

  return (
    <SectionContainer id="story" className="bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
          Our Story
        </p>
        <h2 className="mt-3 font-serif text-4xl font-light text-emerald-900 sm:text-5xl">
          {headline}
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-teal-400" />
        <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-700 sm:text-lg">
          {body}
        </p>
      </div>
    </SectionContainer>
  );
}
