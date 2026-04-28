import { weddingConfig } from '@/lib/wedding-config';

export default function VenueMap() {
  const url = weddingConfig.venue.mapEmbedUrl;

  if (!url) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-3xl border border-dashed border-turquoise-300 bg-turquoise-50 text-sm text-turquoise-700">
        Map coming soon
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-3xl shadow-md">
      <iframe
        src={url}
        title="Venue map"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
