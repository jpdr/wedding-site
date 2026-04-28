export const weddingConfig = {
  coupleNames: { partner1: 'TODO Partner 1', partner2: 'TODO Partner 2' },
  weddingDate: '2026-12-31T16:00:00+08:00',
  venue: {
    name: 'TODO Venue Name',
    address: 'TODO Venue Address',
    mapEmbedUrl: process.env.NEXT_PUBLIC_VENUE_MAP_EMBED ?? '',
  },
  schedule: [
    { time: '3:00 PM', label: 'Ceremony' },
    { time: '4:30 PM', label: 'Cocktail Hour' },
    { time: '6:00 PM', label: 'Reception' },
  ],
  dressCode: 'TODO: e.g. Semi-formal — Turquoise & Emerald accents welcome',
  story: {
    headline: 'How We Met',
    body: 'TODO: write your story here. This is the placeholder text — replace it before launch.',
    photo: '/photos/story.jpg',
  },
  heroPhoto: '/photos/hero.jpg',
  rsvpDeadline: '2026-XX-XX',
};
