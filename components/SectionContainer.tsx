import { ReactNode } from 'react';

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  id,
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`px-6 py-20 sm:py-28 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
