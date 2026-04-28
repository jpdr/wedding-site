export const weddingConfig = {
  coupleNames: { partner1: 'Joshua', partner2: 'Ella' },
  weddingDate: '2026-05-26T11:00:00+08:00',
  venue: {
    name: 'Girasol Tagaytay',
    address: 'Aguinaldo (Tagaytay-Nasugbu) Highway, Alfonso, Cavite 4123',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.8494460857974!2d120.8875295!3d14.086063300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd9dc7308331b9%3A0x7da8c2e788ec046d!2sGirasol%20Tagaytay!5e0!3m2!1sen!2sph!4v1777383544131!5m2!1sen!2sph',
  },
  schedule: [
    { time: '11:00 AM', label: 'Civil Wedding', sublabel: 'Immediate family and sponsors only' },
    { time: '1:00 PM', label: 'Wedding Reception' },
  ] as { time: string; label: string; sublabel?: string }[],
  dressCode:
    'Semi-formal attire is requested. Please feel free to join us in any colors or tones you are most comfortable with.',
  rsvpDeadline: '2026-05-12',
};
