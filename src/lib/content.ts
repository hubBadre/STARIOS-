import { prisma } from './prisma';
import { SERVICE_SLUGS } from './navigation';

/**
 * Accès au contenu éditorial.
 *
 * Chaque lecture retombe sur un contenu statique si la base n'est pas
 * joignable (DATABASE_URL absente) ou si la table est vide (seed pas encore
 * lancé). Le site reste donc consultable sans aucune configuration, et
 * bascule automatiquement sur la base dès qu'elle répond.
 */

export interface ServiceContent {
  slug: string;
  category: string;
  icon: string;
  titleFr: string;
  titleAr: string;
  excerptFr: string;
  excerptAr: string;
  contentFr: string;
  contentAr: string;
}

export const FALLBACK_SERVICES: ServiceContent[] = [
  {
    category: 'INSTALLATION_CLIM',
    slug: SERVICE_SLUGS.INSTALLATION_CLIM,
    icon: 'AirVent',
    titleFr: 'Installation de climatisation',
    titleAr: 'تركيب أجهزة التكييف',
    excerptFr:
      'Split, gainable, cassette ou VRV/VRF : nous dimensionnons, fournissons et posons le système adapté à votre local.',
    excerptAr:
      'سبليت، مخفي، كاسيت أو VRV/VRF: نحسب ونوفّر ونركّب النظام المناسب لمحلك.',
    contentFr:
      "Le choix d'un climatiseur ne se résume pas à une puissance en BTU. Nous étudions la surface, l'orientation, l'isolation et l'usage du local avant de recommander un matériel. L'installation comprend le tirage au vide, le contrôle d'étanchéité du circuit frigorifique, la mise en service et la remise du certificat de garantie.",
    contentAr:
      'اختيار المكيّف لا يقتصر على القدرة بالوحدات الحرارية. ندرس المساحة والاتجاه والعزل واستعمال المحل قبل التوصية بالمعدات. يشمل التركيب تفريغ الهواء واختبار إحكام الدارة والتشغيل وتسليم شهادة الضمان.',
  },
  {
    category: 'B13_PLATRE',
    slug: SERVICE_SLUGS.B13_PLATRE,
    icon: 'PaintRoller',
    titleFr: 'B13 Plâtre — faux plafonds et habillage',
    titleAr: 'بلاتر B13 — أسقف مستعارة وتغليف',
    excerptFr:
      'Faux plafonds et coffrages en plâtre pour dissimuler gaines et unités gainables, avec finition prête à peindre.',
    excerptAr:
      'أسقف مستعارة وتغليف بالبلاتر لإخفاء القنوات والوحدات المخفية، بتشطيب جاهز للطلاء.',
    contentFr:
      "Une installation gainable ou un réseau de gaines bien conçu se termine par un travail de plâtre soigné. Notre équipe réalise les faux plafonds, trappes de visite et coffrages nécessaires pour dissimuler l'ensemble de l'installation, avec une finition lisse prête à peindre.",
    contentAr:
      'تنتهي أي عملية تركيب مخفي أو شبكة قنوات محكمة بعمل بلاتر متقن. يُنجز فريقنا الأسقف المستعارة وفتحات المراقبة والتغليف اللازم لإخفاء كامل التركيب، بتشطيب أملس جاهز للطلاء.',
  },
  {
    category: 'PRODUITS_CLIM',
    slug: SERVICE_SLUGS.PRODUITS_CLIM,
    icon: 'ShoppingBag',
    titleFr: 'Produits de climatisation',
    titleAr: 'منتجات التكييف',
    excerptFr:
      'Vente de climatiseurs split, gainables, cassettes et mobiles, toutes marques, avec conseil sur le modèle adapté à votre besoin.',
    excerptAr:
      'بيع مكيفات سبليت ومخفية وكاسيت ومتنقلة، لجميع الماركات، مع نصيحة حول الطراز المناسب لاحتياجكم.',
    contentFr:
      'Nous distribuons les grandes marques du marché (Daikin, LG, Samsung, Gree, Carrier, Mitsubishi Electric) et vous orientons vers le modèle correspondant réellement à votre surface, votre budget et votre usage, sans surdimensionnement inutile.',
    contentAr:
      'نوزّع العلامات الكبرى في السوق (دايكن، إل جي، سامسونغ، غري، كاريير، ميتسوبيشي إلكتريك) ونوجهكم نحو الطراز المناسب فعلاً لمساحتكم وميزانيتكم واستعمالكم، دون مبالغة في القدرة.',
  },
  {
    category: 'MAINTENANCE',
    slug: SERVICE_SLUGS.MAINTENANCE,
    icon: 'Wrench',
    titleFr: 'Maintenance et entretien',
    titleAr: 'الصيانة والعناية الدورية',
    excerptFr:
      "Contrat annuel ou visite ponctuelle : contrôle du gaz, des filtres et de l'écoulement pour éviter la panne en pleine chaleur.",
    excerptAr:
      'عقد سنوي أو زيارة ظرفية: فحص الغاز والمرشّحات والتصريف لتفادي العطل في عز الحرارة.',
    contentFr:
      "Un climatiseur entretenu consomme jusqu'à 20 % de moins et dure nettement plus longtemps. Notre visite d'entretien couvre le nettoyage des filtres et de l'échangeur, le contrôle de la charge en fluide frigorigène, la vérification des connexions électriques et le test de l'évacuation des condensats.",
    contentAr:
      'المكيّف المُصان يستهلك أقل بنسبة تصل إلى 20٪ ويدوم أطول. تشمل زيارة الصيانة تنظيف المرشّحات والمبادل، ومراقبة شحنة الغاز، وفحص التوصيلات الكهربائية، واختبار تصريف المياه.',
  },
  {
    category: 'VENTILATION',
    slug: SERVICE_SLUGS.VENTILATION,
    icon: 'Fan',
    titleFr: 'Ventilation',
    titleAr: 'التهوية',
    excerptFr:
      "Extraction, insufflation, VMC simple ou double flux pour renouveler l'air des logements et des locaux professionnels.",
    excerptAr: 'شفط، دفع، تهوية بتدفق بسيط أو مزدوج لتجديد هواء المساكن والمحلات المهنية.',
    contentFr:
      "Climatiser sans ventiler revient à recycler un air vicié. Nous installons des systèmes d'extraction et de renouvellement d'air dimensionnés selon le volume et l'occupation : cuisines professionnelles, sanitaires, salles de réunion, ateliers.",
    contentAr:
      'التكييف دون تهوية يعني إعادة تدوير هواء فاسد. نركّب أنظمة شفط وتجديد الهواء محسوبة حسب الحجم وعدد المستعملين: مطابخ مهنية، مرافق صحية، قاعات اجتماعات، ورشات.',
  },
  {
    category: 'VENTILATION_CAISSON',
    slug: SERVICE_SLUGS.VENTILATION_CAISSON,
    icon: 'Wind',
    titleFr: 'Deshumidificateur',
    titleAr: 'أجهزة الترطيب',
    excerptFr:
      'Fourniture et pose de caissons de ventilation (extraction ou insufflation) pour cuisines professionnelles, parkings et locaux techniques.',
    excerptAr:
      'توفير وتركيب صناديق التهوية (شفط أو دفع) للمطابخ المهنية والمرآب والمحلات التقنية.',
    contentFr:
      "Le caisson de ventilation centralise l'extraction ou l'insufflation d'air pour un bâtiment entier. Nous le dimensionnons selon le débit requis, l'installons en toiture ou en local technique, et le raccordons au réseau de gaines existant.",
    contentAr:
      'يجمّع صندوق التهوية عملية الشفط أو الدفع لمبنى كامل. نحسب حجمه حسب التدفق المطلوب، ونركّبه على السطح أو في محل تقني، ونربطه بشبكة القنوات القائمة.',
  },
  {
    category: 'POMPE_CHALEUR',
    slug: SERVICE_SLUGS.POMPE_CHALEUR,
    icon: 'Flame',
    titleFr: 'Pompe à chaleur',
    titleAr: 'مضخة حرارية',
    excerptFr:
      "Installation de pompes à chaleur air/air et air/eau pour chauffer, rafraîchir et produire de l'eau chaude sanitaire à moindre coût.",
    excerptAr:
      'تركيب مضخات حرارية هواء/هواء وهواء/ماء للتدفئة والتبريد وإنتاج الماء الساخن بتكلفة أقل.',
    contentFr:
      "La pompe à chaleur puise les calories de l'air extérieur pour chauffer ou rafraîchir votre logement, avec une consommation électrique nettement inférieure à un chauffage classique. Nous étudions votre installation existante avant de recommander un modèle air/air ou air/eau.",
    contentAr:
      'تستمد المضخة الحرارية السعرات من الهواء الخارجي لتدفئة أو تبريد منزلكم، باستهلاك كهربائي أقل بكثير من التدفئة التقليدية. ندرس تجهيزكم القائم قبل التوصية بطراز هواء/هواء أو هواء/ماء.',
  },
  {
    category: 'CTA',
    slug: SERVICE_SLUGS.CTA,
    icon: 'Layers',
    titleFr: 'Centrale de traitement d\'air (CTA)',
    titleAr: 'مركزية معالجة الهواء',
    excerptFr:
      'Conception, installation et maintenance de centrales de traitement d\'air pour immeubles, commerces et sites industriels.',
    excerptAr:
      'تصميم وتركيب وصيانة مركزيات معالجة الهواء للعمارات والمحلات والمواقع الصناعية.',
    contentFr:
      "Une centrale de traitement d'air filtre, chauffe, refroidit et déshumidifie l'air avant de le distribuer dans le bâtiment. Nous dimensionnons l'installation selon le débit et la qualité d'air requis, et assurons son entretien préventif.",
    contentAr:
      'تقوم مركزية معالجة الهواء بترشيح وتسخين وتبريد وتجفيف الهواء قبل توزيعه في المبنى. نحسب التركيب حسب التدفق وجودة الهواء المطلوبة، ونضمن صيانته الوقائية.',
  },
  {
    category: 'PLOMBERIE',
    slug: SERVICE_SLUGS.PLOMBERIE,
    icon: 'Droplets',
    titleFr: 'Plomberie',
    titleAr: 'السباكة',
    excerptFr:
      'Raccordements d\'évacuation des condensats, alimentation en eau et petits travaux de plomberie liés à votre installation de climatisation.',
    excerptAr:
      'توصيلات تصريف مياه التكثيف، التزويد بالماء وأشغال سباكة صغيرة مرتبطة بتركيب التكييف.',
    contentFr:
      "Une climatisation mal évacuée finit par tacher un plafond ou endommager un mur. Nous réalisons les raccordements d'évacuation des condensats, ainsi que les travaux de plomberie associés à une pompe à chaleur air/eau ou à une installation multi-split.",
    contentAr:
      'التكييف الذي لا يُصرَّف جيداً ينتهي بتلطيخ سقف أو إتلاف جدار. ننجز توصيلات تصريف مياه التكثيف، وكذا أشغال السباكة المرتبطة بمضخة حرارية هواء/ماء أو تركيب متعدد الوحدات.',
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 'f1',
    authorName: 'Karim Benjelloun',
    city: 'Casablanca',
    role: 'Gérant, Café Riad',
    rating: 5,
    contentFr:
      "Trois unités posées en une journée dans la salle, sans fermer le café. Le technicien a pris le temps d'expliquer le réglage à mon équipe.",
    contentAr:
      'ثلاث وحدات رُكّبت في يوم واحد داخل القاعة دون إغلاق المقهى. أخذ الفني وقته لشرح الضبط لفريقي.',
    avatarUrl: null,
  },
  {
    id: 'f2',
    authorName: 'Salma Idrissi',
    city: 'Rabat',
    role: 'Particulier',
    rating: 5,
    contentFr:
      "J'avais reçu trois devis très différents. Starios est le seul à avoir calculé la puissance au lieu de me vendre le plus gros modèle.",
    contentAr:
      'توصلت بثلاثة عروض مختلفة جداً. ستاريوس الوحيدة التي حسبت القدرة بدل بيعي أكبر جهاز.',
    avatarUrl: null,
  },
  {
    id: 'f3',
    authorName: 'Youssef El Amrani',
    city: 'Mohammedia',
    role: 'Responsable technique',
    rating: 4,
    contentFr:
      'Contrat de maintenance sur nos six bureaux depuis deux ans. Les visites sont faites aux dates prévues, ce qui est plus rare que ça ne devrait.',
    contentAr:
      'عقد صيانة لمكاتبنا الستة منذ سنتين. تُنجز الزيارات في المواعيد المحددة، وهو أمر أندر مما ينبغي.',
    avatarUrl: null,
  },
  {
    id: 'f4',
    authorName: 'Nadia Cherkaoui',
    city: 'Marrakech',
    role: 'Propriétaire de riad',
    rating: 5,
    contentFr:
      "Installation discrète dans un riad classé, avec des contraintes fortes sur le passage des gaines. Le résultat est propre et invisible.",
    contentAr:
      'تركيب متقن في رياض مصنّف، مع قيود كبيرة على تمرير القنوات. النتيجة نظيفة وغير مرئية.',
    avatarUrl: null,
  },
  {
    id: 'f5',
    authorName: 'Omar Tazi',
    city: 'Casablanca',
    role: 'Particulier',
    rating: 5,
    contentFr:
      "Dépannage un samedi d'août, unité repartie le jour même. Le diagnostic annoncé au téléphone correspondait à la facture.",
    contentAr:
      'إصلاح يوم سبت من غشت، واشتغلت الوحدة في نفس اليوم. التشخيص المُعلن هاتفياً طابق الفاتورة.',
    avatarUrl: null,
  },
  {
    id: 'f6',
    authorName: 'Claire Martin',
    city: 'Lyon',
    role: 'Chef de projet',
    rating: 5,
    contentFr:
      'Le team a installé une climatisation dans un appartement ancien sans dégâts. Tout était propre, précis et très bien expliqué avant la mise en service.',
    contentAr:
      'قم الفريق بتركيب مكيف في شقة قديمة دون أي أضرار. كان كل شيء منظفًا ودقيقًا ومشرحًا بشكل ممتاز قبل التشغيل.',
    avatarUrl: null,
  },
  {
    id: 'f7',
    authorName: 'Li Wei',
    city: 'Tangier',
    role: 'Propriétaire d’entreprise',
    rating: 5,
    contentFr:
      "Très professionnel et rapide. Les techniciens ont proposé une solution adaptée à notre bureau et nous ont aidé à réduire la consommation d’énergie.",
    contentAr:
      'احترافيون وسريعون جدًا. اقترح الفنيون حلًا مناسبًا لمكتبنا وساعدونا على تقليل استهلاك الطاقة.',
    avatarUrl: null,
  },
  {
    id: 'f8',
    authorName: 'Emily Johnson',
    city: 'Paris',
    role: 'Particulier',
    rating: 5,
    contentFr:
      'Nous avons choisi Starios pour la maintenance annuelle. Le service est fiable, ponctuel et le suivi après installation est excellent.',
    contentAr:
      'اخترنا ستاريوس للصيانة السنوية. الخدمة موثوقة ودقيقة والمتابعة بعد التركيب ممتازة.',
    avatarUrl: null,
  },
  {
    id: 'f9',
    authorName: 'Zhang Ming',
    city: 'Fès',
    role: 'Manager',
    rating: 4,
    contentFr:
      'Bonne communication, devis clair et travail soigné. L’équipe nous a conseillé le bon système selon la taille de notre espace.',
    contentAr:
      'تواصل جيد، عرض سعر واضح، وعمل دقيق. نصحنا الفريق بالنظام المناسب حسب حجم مساحتنا.',
    avatarUrl: null,
  },
  {
    id: 'f10',
    authorName: 'Sofia Laurent',
    city: 'Nantes',
    role: 'Propriétaire',
    rating: 5,
    contentFr:
      'Service très agréable et très professionnel. Le résultat est propre, silencieux et la climatisation fonctionne parfaitement dès le premier jour.',
    contentAr:
      'خدمة ممتازة جدًا ومهنية. النتيجة نظيفة وهادئة والمكيف يعمل بشكل مثالي منذ اليوم الأول.',
    avatarUrl: null,
  },
];

const FALLBACK_BRANDS = [
  { id: 'b1', name: 'Daikin', slug: 'daikin' },
  { id: 'b2', name: 'LG', slug: 'lg' },
  { id: 'b3', name: 'Samsung', slug: 'samsung' },
  { id: 'b4', name: 'Gree', slug: 'gree' },
  { id: 'b5', name: 'Carrier', slug: 'carrier' },
  { id: 'b6', name: 'Mitsubishi Electric', slug: 'mitsubishi-electric' },
  { id: 'b7', name: 'Hitachi', slug: 'hitachi' },
];

export async function getServices(): Promise<ServiceContent[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    if (rows.length === 0) return FALLBACK_SERVICES;
    return rows as unknown as ServiceContent[];
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceContent | null> {
  try {
    const row = await prisma.service.findUnique({ where: { slug } });
    if (row) return row as unknown as ServiceContent;
  } catch {
    // base indisponible : on retombe sur le contenu statique
  }
  return FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function getTestimonials() {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
      take: 6,
    });
    if (rows.length === 0) return FALLBACK_TESTIMONIALS;
    return rows;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getBrands() {
  try {
    const rows = await prisma.brand.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    if (rows.length === 0) return FALLBACK_BRANDS;
    return rows;
  } catch {
    return FALLBACK_BRANDS;
  }
}
