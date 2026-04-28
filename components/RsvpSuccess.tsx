interface RsvpSuccessProps {
  attending: boolean;
  name: string;
}

export default function RsvpSuccess({ attending, name }: RsvpSuccessProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 p-10 text-center text-white shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-3xl">
        ✓
      </div>
      <h3 className="mt-6 font-serif text-3xl font-light">
        Thank you, {name}!
      </h3>
      <p className="mt-3 text-white/90">
        {attending
          ? "We can't wait to celebrate with you."
          : "We'll miss you, but thank you for letting us know."}
      </p>
    </div>
  );
}
