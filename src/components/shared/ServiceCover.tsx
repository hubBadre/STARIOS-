import type { SVGProps } from 'react';

/**
 * Illustrations vectorielles maison — une par catégorie de service.
 * Évite toute dépendance à des photos sous licence externe ; la palette
 * reprend les tokens de marque (brand, navy) définis dans tailwind.config.
 */

const COLORS = {
  bgSoft: '#F0F9FF',
  bg: '#E0F2FE',
  accent: '#BAE6FD',
  fillLight: '#7DD3FC',
  fillMid: '#38BDF8',
  line: '#0369A1',
  lineMid: '#0284C7',
  dark: '#0F172A',
  white: '#FFFFFF',
} as const;

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
      <rect width="400" height="240" fill={COLORS.bgSoft} />
      <circle cx="340" cy="20" r="120" fill={COLORS.bg} />
      <circle cx="30" cy="230" r="90" fill={COLORS.accent} opacity="0.5" />
      {children}
    </svg>
  );
}

function CoverInstallationClim(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* Mur + unité intérieure split */}
      <rect x="90" y="70" width="220" height="14" rx="7" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <rect x="98" y="84" width="204" height="46" rx="10" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <rect x="112" y="98" width="80" height="8" rx="4" fill={COLORS.fillLight} />
      <circle cx="270" cy="102" r="9" fill={COLORS.fillMid} />
      {/* flux d'air */}
      <path d="M110 138C140 150 170 150 200 138" stroke={COLORS.lineMid} strokeWidth="4" strokeLinecap="round" />
      <path d="M118 156C148 168 178 168 208 156" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      <path d="M126 174C152 184 178 184 202 174" stroke={COLORS.fillLight} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      {/* liaison frigorifique vers unité extérieure */}
      <path d="M302 108H330C338 108 344 114 344 122V190" stroke={COLORS.line} strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
      <rect x="316" y="188" width="60" height="42" rx="6" fill={COLORS.dark} />
      <circle cx="346" cy="209" r="13" fill="none" stroke={COLORS.fillMid} strokeWidth="3" />
    </Backdrop>
  );
}

function CoverPlatre(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* faux plafond en grille */}
      <rect x="60" y="52" width="280" height="70" rx="4" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <path d="M130 52V122M200 52V122M270 52V122" stroke={COLORS.accent} strokeWidth="3" />
      <path d="M60 87H340" stroke={COLORS.accent} strokeWidth="3" />
      <circle cx="130" cy="70" r="9" fill={COLORS.fillLight} />
      <circle cx="270" cy="104" r="9" fill={COLORS.fillLight} />
      {/* trappe de visite ouverte */}
      <rect x="164" y="87" width="72" height="35" rx="3" fill={COLORS.bg} stroke={COLORS.lineMid} strokeWidth="2.5" strokeDasharray="4 4" />
      {/* rouleau de peintre */}
      <g transform="translate(150 150) rotate(-25)">
        <rect x="0" y="0" width="90" height="20" rx="10" fill={COLORS.fillMid} />
        <rect x="90" y="6" width="46" height="8" rx="4" fill={COLORS.dark} />
        <rect x="132" y="-4" width="10" height="28" rx="3" fill={COLORS.dark} />
      </g>
    </Backdrop>
  );
}

function CoverProduits(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* sac / vitrine */}
      <path
        d="M108 108C108 96 118 86 130 86H270C282 86 292 96 292 108V192C292 204 282 214 270 214H130C118 214 108 204 108 192V108Z"
        fill={COLORS.white}
        stroke={COLORS.line}
        strokeWidth="3"
      />
      <path d="M150 108V86C150 68 165 54 183 54H217C235 54 250 68 250 86V108" stroke={COLORS.lineMid} strokeWidth="4" fill="none" />
      {/* mini split posé dans la vitrine */}
      <rect x="140" y="128" width="120" height="34" rx="8" fill={COLORS.bg} stroke={COLORS.lineMid} strokeWidth="2.5" />
      <rect x="152" y="139" width="46" height="6" rx="3" fill={COLORS.fillLight} />
      <circle cx="234" cy="145" r="6" fill={COLORS.fillMid} />
      {/* étiquette prix */}
      <path d="M228 176L252 176L266 190L252 204L228 204Z" fill={COLORS.fillMid} />
      <circle cx="238" cy="190" r="4" fill={COLORS.white} />
    </Backdrop>
  );
}

function CoverMaintenance(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* unité extérieure */}
      <rect x="96" y="110" width="150" height="90" rx="10" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <circle cx="171" cy="155" r="30" fill="none" stroke={COLORS.lineMid} strokeWidth="3" />
      <circle cx="171" cy="155" r="4" fill={COLORS.lineMid} />
      <path d="M171 131V179M147 155H195M155 139L187 171M187 139L155 171" stroke={COLORS.fillMid} strokeWidth="2.5" />
      {/* clé plate */}
      <g transform="translate(255 118) rotate(35)">
        <path
          d="M0 10C0 4 5 0 11 0C17 0 22 4 22 10C22 13 20 16 18 17L18 70C18 74 15 77 11 77C7 77 4 74 4 70L4 17C2 16 0 13 0 10Z"
          fill={COLORS.dark}
        />
        <circle cx="11" cy="10" r="5" fill={COLORS.bgSoft} />
      </g>
      {/* badge validé */}
      <circle cx="292" cy="188" r="22" fill={COLORS.fillMid} />
      <path d="M282 188L289 195L303 180" stroke={COLORS.white} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Backdrop>
  );
}

function CoverVentilation(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* hélice de ventilateur */}
      <circle cx="180" cy="140" r="66" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <g stroke={COLORS.lineMid} strokeWidth="3" fill={COLORS.fillLight}>
        <path d="M180 140C180 140 176 96 194 84C210 96 200 132 180 140Z" />
        <path d="M180 140C180 140 224 132 240 148C224 166 190 152 180 140Z" />
        <path d="M180 140C180 140 190 184 172 198C154 184 162 150 180 140Z" />
        <path d="M180 140C180 140 138 150 122 134C138 116 172 128 180 140Z" />
      </g>
      <circle cx="180" cy="140" r="9" fill={COLORS.dark} />
      {/* flux d'air sortant */}
      <path d="M256 118C286 122 306 132 318 148" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <path d="M252 150C284 156 306 166 320 180" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </Backdrop>
  );
}

function CoverCaisson(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* toiture technique */}
      <rect x="40" y="176" width="320" height="16" fill={COLORS.accent} />
      {/* socle */}
      <rect x="140" y="150" width="90" height="30" rx="4" fill={COLORS.white} stroke={COLORS.lineMid} strokeWidth="2.5" />
      {/* dôme du caisson d'extraction */}
      <path
        d="M120 150C120 118 152 96 185 96C218 96 250 118 250 150Z"
        fill={COLORS.white}
        stroke={COLORS.line}
        strokeWidth="3"
      />
      <ellipse cx="185" cy="150" rx="65" ry="10" fill={COLORS.bg} stroke={COLORS.lineMid} strokeWidth="2.5" />
      {/* tourbillon d'air */}
      <path
        d="M185 70C205 70 218 82 216 96"
        stroke={COLORS.fillMid}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M216 96L226 90M216 96L214 84" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* gaine descendante */}
      <rect x="270" y="150" width="16" height="42" fill={COLORS.white} stroke={COLORS.lineMid} strokeWidth="2.5" />
    </Backdrop>
  );
}

function CoverPompeChaleur(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* bloc pompe à chaleur */}
      <rect x="110" y="104" width="160" height="96" rx="10" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      <circle cx="190" cy="152" r="34" fill="none" stroke={COLORS.lineMid} strokeWidth="3" />
      <path d="M190 128V176M166 152H214M172 134L208 170M208 134L172 170" stroke={COLORS.fillLight} strokeWidth="2.5" />
      {/* flocon (froid) */}
      <g stroke={COLORS.lineMid} strokeWidth="2.5" strokeLinecap="round">
        <path d="M300 84V116M290 90L310 110M310 90L290 110" />
      </g>
      {/* flamme (chaud) */}
      <path
        d="M300 150C312 160 314 172 306 182C310 174 302 170 300 176C296 168 292 162 296 152C298 156 300 152 300 150Z"
        fill={COLORS.fillMid}
      />
      {/* flèche de boucle énergie */}
      <path d="M260 96C282 88 300 98 306 116" stroke={COLORS.line} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M258 200C280 208 300 198 306 180" stroke={COLORS.line} strokeWidth="3" strokeLinecap="round" fill="none" />
    </Backdrop>
  );
}

function CoverCTA(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* caisson de centrale de traitement d'air */}
      <rect x="90" y="76" width="220" height="120" rx="10" fill={COLORS.white} stroke={COLORS.line} strokeWidth="3" />
      {/* filtres empilés */}
      <rect x="112" y="96" width="176" height="22" rx="4" fill={COLORS.bg} stroke={COLORS.lineMid} strokeWidth="2" />
      <rect x="112" y="126" width="176" height="22" rx="4" fill={COLORS.fillLight} stroke={COLORS.lineMid} strokeWidth="2" />
      <rect x="112" y="156" width="176" height="22" rx="4" fill={COLORS.bg} stroke={COLORS.lineMid} strokeWidth="2" />
      {/* flèche de traversée d'air */}
      <path d="M60 136H100" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" />
      <path d="M300 136H336" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" />
      <path d="M328 128L340 136L328 144" stroke={COLORS.fillMid} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Backdrop>
  );
}

function CoverPlomberie(props: SVGProps<SVGSVGElement>) {
  return (
    <Backdrop>
      {/* coude de tuyauterie */}
      <path
        d="M120 90H176C192 90 204 102 204 118V210"
        stroke={COLORS.line}
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M120 90H176C192 90 204 102 204 118V210"
        stroke={COLORS.fillLight}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* robinet / vanne */}
      <circle cx="260" cy="90" r="18" fill={COLORS.white} stroke={COLORS.lineMid} strokeWidth="3" />
      <path d="M247 90H273M260 77V103" stroke={COLORS.lineMid} strokeWidth="3" strokeLinecap="round" />
      <rect x="204" y="82" width="40" height="16" rx="4" fill={COLORS.white} stroke={COLORS.lineMid} strokeWidth="2.5" />
      {/* goutte d'eau */}
      <path
        d="M232 168C232 156 248 140 248 140C248 140 264 156 264 168C264 177 257 185 248 185C239 185 232 177 232 168Z"
        fill={COLORS.fillMid}
      />
      <circle cx="243" cy="164" r="4" fill={COLORS.white} opacity="0.7" />
    </Backdrop>
  );
}

const COVERS: Record<string, (props: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  AirVent: CoverInstallationClim,
  PaintRoller: CoverPlatre,
  ShoppingBag: CoverProduits,
  Wrench: CoverMaintenance,
  Fan: CoverVentilation,
  Wind: CoverCaisson,
  Flame: CoverPompeChaleur,
  Layers: CoverCTA,
  Droplets: CoverPlomberie,
};

export function ServiceCover({ name, className }: { name: string; className?: string }) {
  const Cover = COVERS[name] ?? CoverInstallationClim;
  return (
    <div className={className}>
      <Cover />
    </div>
  );
}
