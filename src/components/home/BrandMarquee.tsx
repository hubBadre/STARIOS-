import { useTranslations } from 'next-intl';

interface BrandLike {
  id: string;
  name: string;
  slug: string;
}

/**
 * Bandeau des marques partenaires.
 *
 * Les noms sont rendus en typographie plutôt qu'en logos : afficher un logo
 * de marque approximatif ou non autorisé dessert la crédibilité. À remplacer
 * par les logos officiels une fois les autorisations obtenues.
 */
export function BrandMarquee({ brands }: { brands: BrandLike[] }) {
  const t = useTranslations('home.brands');

  // La piste est dupliquée : l'animation translate de -50% et boucle sans saut.
  const track = [...brands, ...brands];

  return (
    <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] py-12">
      <div className="container">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {t('title')}
        </p>
      </div>

      <div
        className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <ul className="flex w-max animate-marquee items-center gap-14 motion-reduce:animate-none motion-reduce:justify-center">
          {track.map((brand, index) => (
            <li
              key={`${brand.id}-${index}`}
              aria-hidden={index >= brands.length ? 'true' : undefined}
              className="font-heading text-2xl font-semibold tracking-[-0.04em] text-slate-400 transition-colors duration-200 hover:text-slate-600"
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
