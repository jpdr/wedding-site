import SectionContainer from './SectionContainer';
import VenueMap from './VenueMap';
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

export default function WeddingDetails() {
  const { venue, schedule, dressCode, weddingDate } = weddingConfig;
  const dateLabel = formatWeddingDate(weddingDate);

  return (
    <SectionContainer id="details" className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-600">
          The Details
        </p>
        <h2 className="mt-3 font-serif text-4xl font-light text-emerald-900 sm:text-5xl">
          When &amp; Where
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-teal-400" />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600">
            Date
          </p>
          <p className="mt-3 font-serif text-2xl text-emerald-900">
            {dateLabel}
          </p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600">
            Venue
          </p>
          <p className="mt-3 font-serif text-2xl text-emerald-900">
            {venue.name}
          </p>
          <p className="mt-2 text-sm text-slate-600">{venue.address}</p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-emerald-100">
          <p className="text-xs uppercase tracking-[0.2em] text-teal-600">
            Dress Code
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {dressCode}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-emerald-100 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-teal-600">
          Schedule
        </p>
        <ul className="mt-6 divide-y divide-emerald-100">
          {schedule.map((item) => (
            <li
              key={`${item.time}-${item.label}`}
              className="flex items-baseline justify-between py-4"
            >
              <span className="font-serif text-xl text-emerald-900">
                {item.label}
              </span>
              <span className="text-sm uppercase tracking-wider text-teal-600">
                {item.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <VenueMap />
      </div>
    </SectionContainer>
  );
}
