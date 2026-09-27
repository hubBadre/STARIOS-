'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/** Diaporama simple : les images défilent automatiquement l'une après l'autre. */
export function ServiceGallery({
  images,
  alt,
  variant = 'panel',
}: {
  images: string[];
  alt: string;
  /** panel : fiche détaillée (fond blanc, image entière visible). bare : vignette de carte (remplit le parent, recadrée). */
  variant?: 'panel' | 'bare';
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  if (images.length === 0) return null;

  const isBare = variant === 'bare';

  return (
    <div
      className={
        isBare
          ? 'relative size-full overflow-hidden'
          : 'relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-white shadow-card sm:aspect-video'
      }
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}/${images.length}`}
          fill
          sizes={isBare ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          className={`transition-opacity duration-700 ease-in-out ${
            isBare ? 'object-cover' : 'object-contain p-4'
          } ${i === index ? 'opacity-100' : 'opacity-0'}`}
          priority={i === 0}
        />
      ))}

      {images.length > 1 ? (
        <div
          className={`absolute inset-x-0 flex justify-center gap-1.5 ${isBare ? 'bottom-2' : 'bottom-3'}`}
          aria-hidden="true"
        >
          {images.map((src, i) => (
            <span
              key={src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? `w-5 ${isBare ? 'bg-white' : 'bg-brand-600'}`
                  : `w-1.5 ${isBare ? 'bg-white/50' : 'bg-brand-200'}`
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
