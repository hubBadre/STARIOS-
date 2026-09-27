// Types dérivés des schémas Zod, et non de @prisma/client : ce module est
// importé par le wizard côté client, qui ne doit pas embarquer Prisma.
import type { PROPERTY_TYPES, SERVICE_CATEGORIES } from '@/schemas/quote.schema';

type PropertyType = (typeof PROPERTY_TYPES)[number];
type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

/**
 * Estimation indicative d'un devis de climatisation.
 *
 * ⚠️ Les montants produits ici ne sont PAS contractuels. Ils servent à donner
 * un ordre de grandeur au visiteur ; toute page qui les affiche doit afficher
 * la mention correspondante (voir `ESTIMATE_DISCLAIMER`).
 *
 * ⚠️ TARIFS FICTIFS — recalibrer `PRICE_TIERS` et `LABOUR_MAD` sur les vrais
 * prix Starios. Toute la logique de calcul est en dessous et n'a pas besoin
 * d'être modifiée pour cela.
 */

/** BTU nécessaires par m², selon l'usage du local. */
const BTU_PER_M2: Record<PropertyType, number> = {
  APPARTEMENT: 130,
  VILLA: 150,
  BUREAU: 160,
  COMMERCE: 180,
  RESTAURANT: 220, // cuisine + affluence = charge thermique élevée
  INDUSTRIE: 250,
};

/** Paliers commerciaux réellement disponibles à la vente. */
const PRICE_TIERS: { btu: number; equipmentMAD: number }[] = [
  { btu: 9000, equipmentMAD: 4200 },
  { btu: 12000, equipmentMAD: 5400 },
  { btu: 18000, equipmentMAD: 7900 },
  { btu: 24000, equipmentMAD: 10500 },
  { btu: 36000, equipmentMAD: 15800 },
  { btu: 48000, equipmentMAD: 21500 },
];

/** Main d'œuvre de pose, par unité installée. */
const LABOUR_MAD = 1200;

/** Forfaits pour les prestations sans vente de matériel. */
const FLAT_SERVICES: Partial<Record<ServiceCategory, [number, number]>> = {
  MAINTENANCE: [450, 900],
  PLOMBERIE: [300, 1200],
  B13_PLATRE: [800, 3000],
};

/** Marge d'incertitude appliquée au total (bas / haut). */
const SPREAD = { min: 0.9, max: 1.25 };

export const ESTIMATE_DISCLAIMER = {
  fr: 'Estimation indicative et non contractuelle, établie à partir des informations saisies. Un technicien confirmera le montant après visite technique.',
  ar: 'تقدير إرشادي غير تعاقدي بناءً على المعلومات المُدخلة. سيؤكد الفني المبلغ النهائي بعد المعاينة.',
};

export interface EstimateInput {
  category: ServiceCategory;
  propertyType: PropertyType;
  surfaceM2: number;
  roomsCount?: number | null;
}

export interface EstimateResult {
  estimatedBtu: number;
  units: number;
  min: number;
  max: number;
  /** true quand le calcul sort de la grille (très grande surface) */
  requiresSurvey: boolean;
}

function roundToTier(btu: number) {
  return PRICE_TIERS.find((tier) => tier.btu >= btu) ?? PRICE_TIERS[PRICE_TIERS.length - 1];
}

export function estimateQuote(input: EstimateInput): EstimateResult {
  const { category, propertyType, surfaceM2, roomsCount } = input;

  // Prestations forfaitaires : le prix dépend du nombre d'unités, pas de la surface.
  const flat = FLAT_SERVICES[category];
  if (flat) {
    const units = Math.max(1, roomsCount ?? 1);
    return {
      estimatedBtu: 0,
      units,
      min: Math.round(flat[0] * units),
      max: Math.round(flat[1] * units),
      requiresSurvey: false,
    };
  }

  const safeSurface = Math.max(1, surfaceM2);
  const totalBtu = safeSurface * BTU_PER_M2[propertyType];

  // Une unité couvre une pièce : on répartit la charge sur le nombre de pièces
  // déclaré, sinon on estime une unité par tranche de 35 m².
  const units = Math.max(1, roomsCount ?? Math.ceil(safeSurface / 35));
  const btuPerUnit = totalBtu / units;

  const tier = roundToTier(btuPerUnit);
  const rawTotal = (tier.equipmentMAD + LABOUR_MAD) * units;

  return {
    estimatedBtu: Math.round(totalBtu),
    units,
    min: Math.round((rawTotal * SPREAD.min) / 50) * 50,
    max: Math.round((rawTotal * SPREAD.max) / 50) * 50,
    // Au-delà de la grille, seule une visite technique a du sens.
    requiresSurvey: btuPerUnit > PRICE_TIERS[PRICE_TIERS.length - 1].btu || safeSurface > 400,
  };
}
