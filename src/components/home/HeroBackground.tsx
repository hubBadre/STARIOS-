'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/WhatsApp%20Image%202026-08-27%20at%2017.03.06.jpeg',
  '/images/WhatsApp%20Image%202026-08-27%20at%2017.15.51.jpeg',
  '/images/WhatsApp%20Image%202026-08-27%20at%2017.35.28.jpeg',
];

const INTERVAL_MS = 6000;

export function HeroBackground() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [activeIndex]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0">
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-navy/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2.5">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Afficher l'image ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </>
  );
}
