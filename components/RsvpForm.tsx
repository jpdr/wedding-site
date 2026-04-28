'use client';

import { useState, useTransition } from 'react';
import SectionContainer from './SectionContainer';
import RsvpSuccess from './RsvpSuccess';
import { submitRsvpAction } from '@/lib/actions/rsvp';
import { weddingConfig } from '@/lib/wedding-config';

type Attending = 'yes' | 'no' | '';

function formatDeadline(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function RsvpForm() {
  const deadline = formatDeadline(weddingConfig.rsvpDeadline);
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<Attending>('');
  const [guestCount, setGuestCount] = useState<1 | 2 | 3>(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; attending: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!attending) {
      setError('Please let us know if you can attend');
      return;
    }

    const formData = new FormData();
    formData.set('name', name.trim());
    formData.set('attending', attending);
    formData.set('guest_count', String(attending === 'yes' ? guestCount : 1));
    formData.set('message', message.trim());

    startTransition(async () => {
      const result = await submitRsvpAction(formData);
      if (result.ok) {
        setSubmitted({ name: name.trim(), attending: attending === 'yes' });
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <SectionContainer className="bg-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-turquoise-700">RSVP</p>
        <h2 className="mt-3 text-4xl font-light text-turquoise-900 sm:text-5xl">
          Will you join us?
        </h2>
        <div className="mx-auto mt-6 h-px w-16 bg-turquoise-500" />
        {deadline && (
          <p className="mt-6 text-sm text-slate-600">
            Kindly respond on or before{' '}
            <span className="font-medium text-turquoise-800">{deadline}</span>
          </p>
        )}
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        {submitted ? (
          <RsvpSuccess attending={submitted.attending} name={submitted.name} />
        ) : (
          <form
            onSubmit={onSubmit}
            className="space-y-6 rounded-3xl bg-turquoise-50/40 p-8 ring-1 ring-turquoise-100 sm:p-10"
            noValidate
          >
            <div>
              <label
                htmlFor="rsvp-name"
                className="block text-xs font-medium uppercase tracking-[0.2em] text-turquoise-700"
              >
                Your Name
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                className="mt-2 w-full rounded-xl border border-turquoise-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                placeholder="Full name"
              />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise-700">
                Attending?
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <label
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    attending === 'yes'
                      ? 'border-turquoise-700 bg-turquoise-700 text-white shadow-sm'
                      : 'border-turquoise-200 bg-white text-slate-700 hover:border-turquoise-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === 'yes'}
                    onChange={() => setAttending('yes')}
                    className="sr-only"
                  />
                  Joyfully Accepts
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    attending === 'no'
                      ? 'border-turquoise-700 bg-turquoise-700 text-white shadow-sm'
                      : 'border-turquoise-200 bg-white text-slate-700 hover:border-turquoise-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === 'no'}
                    onChange={() => setAttending('no')}
                    className="sr-only"
                  />
                  Regretfully Declines
                </label>
              </div>
            </div>

            {attending === 'yes' && (
              <div>
                <label
                  htmlFor="rsvp-guests"
                  className="block text-xs font-medium uppercase tracking-[0.2em] text-turquoise-700"
                >
                  Number of guests
                </label>
                <select
                  id="rsvp-guests"
                  value={guestCount}
                  onChange={(e) =>
                    setGuestCount(Number(e.target.value) as 1 | 2 | 3)
                  }
                  className="mt-2 w-full rounded-xl border border-turquoise-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                >
                  <option value={1}>Just me (1)</option>
                  <option value={2}>Me +1 (2)</option>
                  <option value={3}>Me +2 (3)</option>
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  Total people including yourself
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="rsvp-message"
                className="block text-xs font-medium uppercase tracking-[0.2em] text-turquoise-700"
              >
                Message <span className="lowercase text-slate-400">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                rows={4}
                className="mt-2 w-full rounded-xl border border-turquoise-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-turquoise-500 focus:ring-2 focus:ring-turquoise-200"
                placeholder="Share a note for the couple..."
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-turquoise-700 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-md transition-all hover:bg-turquoise-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'Sending...' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </SectionContainer>
  );
}
