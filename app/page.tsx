import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import WeddingDetails from '@/components/WeddingDetails';
import RsvpForm from '@/components/RsvpForm';
import { weddingConfig } from '@/lib/wedding-config';

export default function HomePage() {
  const { partner1, partner2 } = weddingConfig.coupleNames;
  const year = new Date(weddingConfig.weddingDate).getFullYear();

  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <OurStory />
        <WeddingDetails />
        <section id="rsvp">
          <RsvpForm />
        </section>
      </main>
      <footer className="border-t border-emerald-100 bg-emerald-50/40 px-6 py-10 text-center text-sm text-slate-500">
        <p className="font-serif text-lg text-emerald-900">
          {partner1} &amp; {partner2}
        </p>
        <p className="mt-2">{year} · Made with love</p>
      </footer>
    </>
  );
}
