import SectionContainer from './SectionContainer';
import VenueMap from './VenueMap';
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

export default function WeddingDetails() {
  const { venue, schedule, dressCode, weddingDate } = weddingConfig;
  const dateLabel = formatWeddingDate(weddingDate);

  return (
    <SectionContainer
      id="details"
      className="bg-gradient-to-b from-turquoise-50 to-white"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-turquoise-700">
          The Details
        </p>
        <h2 className="mt-3 text-4xl font-light text-turquoise-900 sm:text-5xl">
          When <span className="font-script">&amp;</span> Where
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-turquoise-500" />
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-turquoise-100">
          <p className="text-xs uppercase tracking-[0.2em] text-turquoise-700">
            Date
          </p>
          <p className="mt-3 font-display text-2xl text-turquoise-900">{dateLabel}</p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-turquoise-100">
          <p className="text-xs uppercase tracking-[0.2em] text-turquoise-700">
            Venue
          </p>
          <p className="mt-3 font-display text-2xl text-turquoise-900">{venue.name}</p>
          <p className="mt-2 text-sm text-slate-600">{venue.address}</p>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-turquoise-100">
          <p className="text-xs uppercase tracking-[0.2em] text-turquoise-700">
            Dress Code
          </p>
          <p className="mt-3 text-base leading-relaxed text-slate-700">
            {dressCode}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-turquoise-100 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-turquoise-700">
          Schedule
        </p>
        <ul className="mt-6 divide-y divide-turquoise-100">
          {schedule.map((item) => (
            <li
              key={`${item.time}-${item.label}`}
              className="flex items-start justify-between gap-4 py-4"
            >
              <div>
                <p className="font-display text-xl text-turquoise-900">{item.label}</p>
                {item.sublabel && (
                  <p className="mt-1 text-sm text-slate-500">{item.sublabel}</p>
                )}
              </div>
              <span className="whitespace-nowrap pt-1 text-sm uppercase tracking-wider text-turquoise-700">
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
