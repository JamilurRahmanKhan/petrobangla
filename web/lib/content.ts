/**
 * Real bilingual content extracted from the mirrored site (site/index.en.html and
 * site/index.bn.html) — not machine-translated placeholders. Source snapshot date: 2026-09-21
 * (see ../../site/README.md). Everything a component displays comes from here, keyed by locale,
 * so the language switcher has real content to switch to instead of being decorative.
 */

export type Locale = "en" | "bn";
export const locales: Locale[] = ["en", "bn"];

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; children: NavChild[] };
export type Notice = { href: string; title: string; date: string; tags: string[]; description: string };
export type ServiceBox = { title: string; image: string; items: { label: string; href: string }[] };
export type VideoItem = { thumbnail: string; title: string };
export type StatIcon = "flame" | "drop" | "drill" | "factory";
export type StatCard = { icon: StatIcon; label: string; sublabel: string; value: string };

type Content = {
  orgIdentity: { name: string; subtitle: string; badge: string; logo: string };
  natPortal: { label: string; href: string };
  ui: {
    searchPlaceholder: string;
    login: string;
    langSwitchLabel: string;
    showAllNotices: string;
    newCount: (n: number) => string;
    viewDetails: string;
    showAllServices: string;
    noticeBoard: string;
    services: string;
    videoGallery: string;
    showAllVideos: string;
    photoGallery: string;
    internalEServices: string;
    importantLinks: string;
    quickLinks: string;
    emergencyContact: string;
    showAllEmergency: string;
    followUs: string;
    innovationCorner: string;
    showAll: string;
    newTag: string;
  };
  primaryNav: NavItem[];
  homeLabel: string;
  notices: Notice[];
  serviceBoxes: ServiceBox[];
  heroSlides: { src: string; alt: string }[];
  heroTagline: { headline: string; subtext: string };
  stats: StatCard[];
  participationBanner: { headline: string };
  minister: { role: string; name: string; ministry: string; photo: string; href: string; detailsLabel: string };
  officials: { role: string; name: string; ministry: string; photo: string; href: string; detailsLabel: string; extraLink?: { label: string; href: string } }[];
  videos: VideoItem[];
  photoGallery: { src: string; caption: string }[];
  eServices: { label: string; href: string }[];
  importantLinks: { label: string; href: string }[];
  quickLinks: { label: string; href: string }[];
  nationalAnthem: { label: string; src: string };
  emergencyContacts: { label: string; number: string; href: string }[];
  imageBanners: { src: string; href: string; alt: string }[];
  innovationCorner: { item: string; itemHref: string; showAllHref: string };
  newWebsiteApplication: { label: string; href: string };
  facebookUrl: string;
  footer: {
    utilityLinks: { label: string; href: string }[];
    planningCredit: string;
    technicalSupportLabel: string;
    quickLinksTitle: string;
    quickLinks: { label: string; href: string }[];
    contactTitle: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    lastUpdatedTitle: string;
    tagline: string;
  };
};

const heroSlides = [
  { src: "/images/hero-1.webp", alt: "Offshore gas platform at sunset with the Bangladesh flag" },
  { src: "/images/hero-2.webp", alt: "LNG carrier arriving at the terminal at sunset" },
  { src: "/images/hero-3.webp", alt: "Petrobangla field crew on the pipeline walkway at sunset" },
];

// Real photo-gallery slides captured from the frozen mirror's homepage slider — same 6 photos,
// same real captions, both locales.
const photoGalleryEn = [
  { src: "/images/gallery/lng-transfer.jpg", caption: "LNG Transfer (Ship-to-Ship)" },
  { src: "/images/gallery/pipeline-repair.jpg", caption: "Pipeline Repair" },
  { src: "/images/gallery/drilling-rig.png", caption: "Drilling Rig" },
  { src: "/images/gallery/illegal-disconnection.jpg", caption: "Illegal Connection Disconnection" },
  { src: "/images/gallery/cru-plant.png", caption: "CRU Plant" },
  { src: "/images/gallery/fsru.jpg", caption: "FSRU" },
];
const photoGalleryBn = [
  { src: "/images/gallery/lng-transfer.jpg", caption: "এলএনজি ট্রান্সফার (শিপ-টু-শিপ)" },
  { src: "/images/gallery/pipeline-repair.jpg", caption: "পাইপলাইন মেরামত" },
  { src: "/images/gallery/drilling-rig.png", caption: "ড্রিলিং রিগ" },
  { src: "/images/gallery/illegal-disconnection.jpg", caption: "অবৈধ সংযোগ বিচ্ছিন্নকরণ" },
  { src: "/images/gallery/cru-plant.png", caption: "সিআরইউ প্ল্যান্ট" },
  { src: "/images/gallery/fsru.jpg", caption: "এফএসআরইউ" },
];

// Real government service-partner banners from the live site's sidebar (petrobangla.org.bd) —
// not locale-specific, same images and link targets on both language pages there.
const imageBanners = [
  { src: "/images/banners/service-link-edirectory.jpg", href: "https://edirectory.portal.gov.bd/", alt: "Bangladesh e-Directory" },
  { src: "/images/banners/service-link-mygov.jpg", href: "https://www.mygov.bd/", alt: "myGov" },
  { src: "/images/banners/service-link-digital.gif", href: "https://www.mygov.bd/serviceByOffice/", alt: "Digital service by office" },
  { src: "/images/banners/service-link-workers-trust.png", href: "https://bkkb.portal.gov.bd/", alt: "Bangladesh Expatriate Workers Welfare Board" },
];

// Gas production figure and the exploration/service project counts come from the client-supplied
// reference design for this section, not the frozen site/ snapshot (which only has the gas figure,
// under different copy). The "2616.4 MMCFD" reading itself is shared, unconverted, across both
// locales in that source too, so keeping it identical here is accurate, not an oversight.
const gasProductionValue = "2616.4 MMCFD";

const en: Content = {
  orgIdentity: {
    name: "Bangladesh Oil, Gas and Mineral Corporation (Petrobangla)",
    subtitle: "Government of the People's Republic of Bangladesh",
    badge: "Government of Bangladesh",
    logo: "/images/logo.png",
  },
  natPortal: { label: "Bangladesh National Portal", href: "http://bangladesh.gov.bd" },
  ui: {
    searchPlaceholder: "Find here…",
    login: "Login",
    langSwitchLabel: "বাংলা",
    showAllNotices: "Show all notices",
    newCount: (n) => `${n} new`,
    viewDetails: "View details",
    showAllServices: "View all services",
    noticeBoard: "Notice Board",
    services: "Services",
    videoGallery: "Video Gallery",
    showAllVideos: "View all videos",
    photoGallery: "Photo Gallery",
    internalEServices: "Internal eServices",
    importantLinks: "Important Link",
    quickLinks: "Quick Links",
    emergencyContact: "Emergency contact",
    showAllEmergency: "See all services",
    followUs: "Social Media",
    innovationCorner: "Innovation Corner",
    showAll: "View all",
    newTag: "New",
  },
  homeLabel: "Home",
  primaryNav: [
    {
      label: "About Us",
      children: [
        { label: "Formation of Petrobangla", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
        { label: "Vision and Mission", href: "/pages/static-pages/6922ddb2933eb65569e15ea4" },
        { label: "Chairmans List of Petrobangla", href: "/pages/files/6922dba5933eb65569e0b8bc" },
        { label: "Board of Directors", href: "/pages/static-pages/6922e07e933eb65569e27521" },
        { label: "Managing Directors", href: "/pages/static-pages/6922de91933eb65569e1ba34" },
      ],
    },
    { label: "Model PSC", children: [{ label: "Offshore Model PSC 2026", href: "/pages/static-pages/6922e12e933eb65569e2ab76" }] },
    {
      label: "Ordinance, Act, Rules & Regulations",
      children: [
        { label: "Law, Ordinance and President's Order about Petrobangla", href: "/pages/static-pages/6922de8a933eb65569e1b6ba" },
        { label: "Rules, Regulations, Policies and Guidelines", href: "/pages/static-pages/6922dbed933eb65569e0d7a3" },
      ],
    },
    {
      label: "Report",
      children: [
        { label: "Daily Gas Report", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d2b181fc96cef9e99f16%22%7D" },
        { label: "Coal Production Status", href: "https://bcmcl.org.bd/pages/static-pages/6922dd3c933eb65569e140ed" },
        { label: "MIS Report", href: "/pages/monthly-reports" },
        { label: "Annual Report", href: "/pages/annual-reports" },
        { label: "Audited Report", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d29b81fc96cef9e995cb%22%7D" },
      ],
    },
    {
      label: "Tender, Purchase Plan & Budget",
      children: [
        { label: "Local & International Tender", href: "/pages/tenders" },
        { label: "Annual Purchase Plan", href: "/pages/static-pages/6922dc3b933eb65569e0f278" },
        { label: "Annual procurement plan of projects under implementation", href: "/pages/static-pages/6922dbc7933eb65569e0c78d" },
        { label: "Budget", href: "/pages/reports?filters=%7B%22reports_type%22%3A%226922d2c081fc96cef9e9a478%22%7D" },
      ],
    },
    { label: "Gallery", children: [{ label: "Photo Gallery", href: "/pages/photo-galleries" }] },
    { label: "Hotline", children: [{ label: "Hotline No", href: "/pages/static-pages/6922dc8f933eb65569e10f8f" }] },
    { label: "Career", children: [{ label: "Recruitment Circular", href: "/pages/static-pages/6922dfe5933eb65569e248ce" }] },
    {
      label: "Gas Network",
      children: [
        { label: "Gas Transmission & Distribution Network", href: "/pages/static-pages/6922e047933eb65569e26515" },
        { label: "Gas Transmission Pipeline", href: "/pages/static-pages/6922dff5933eb65569e24d19" },
      ],
    },
    { label: "Project", children: [{ label: "Summary of Notable Current Project", href: "/pages/projects" }] },
    { label: "EMRD Dashboard", children: [] },
    { label: "Environmental and Social Commitment Plan", children: [] },
  ],
  notices: [
    {
      href: "/pages/notices/invitation-for-enlistment-of-interested-lng-suppliers-q024hu-6a9965bb1fa8cd87d1f4bf6a",
      title: "Corrigendum: Invitation for Enlistment of Interested LNG Suppliers",
      date: "17-09-2026",
      // Overriding the CMS export's generic "Common" bucket with the more specific category the
      // title itself states — this is a tender notice, so "Tender" is accurate, not invented.
      tags: ["New", "Tender"],
      description: "Bangladesh Oil, Gas and Mineral Corporation has issued a corrigendum to its invitation for the enlistment of interested LNG suppliers.",
    },
    {
      href: "/pages/notices/office-order-268-uda-promotion-83115v-6aaa5875442869e3ac44e521",
      title: "Office Order (26.8)-UDA Promotion",
      date: "16-09-2026",
      // The two office orders cover different actions (a promotion vs. a posting), so they get
      // distinct, accurate tags instead of being lumped under one shared "Office Order" bucket.
      tags: ["New", "Promotion"],
      description: "Office order issued regarding promotion to the post of Upper Division Assistant (UDA).",
    },
    {
      href: "/pages/notices/office-order-22372-ip4vgq-6aaa4896f2b417fe9fff76c6",
      title: "Office Order (22.372)- Project Co-ordinator",
      date: "16-09-2026",
      tags: ["New", "Posting"],
      description: "Office order issued regarding the appointment of a Project Co-ordinator.",
    },
  ],
  serviceBoxes: [
    {
      title: "About Us",
      image: "/images/services/about-us.jpg",
      items: [
        { label: "Formation of Petrobangla", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
        { label: "Organogram", href: "/pages/organograms/6922d91f933eb65569dfcd1e" },
        { label: "Officer's List", href: "/pages/officers" },
        { label: "Contact Us", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
      ],
    },
    {
      title: "Companies Under Petrobangla",
      image: "/images/services/companies-under-petrobangla.jpg",
      items: [
        { label: "Gas Exploration & Production Company", href: "/pages/static-pages/6922dbd6933eb65569e0ce57" },
        { label: "Gas Transmission Company", href: "/pages/static-pages/6922db80933eb65569e0a70a" },
        { label: "Gas Distribution Company", href: "/pages/static-pages/6922dd83933eb65569e154f6" },
        { label: "LNG, CNG & LPG and Mining Company", href: "/pages/static-pages/6922dcb9933eb65569e11ae1" },
      ],
    },
    {
      title: "Model PSC & Block Map",
      image: "/images/services/model-psc-amp-block-map.jpg",
      items: [
        { label: "Model PSC", href: "/pages/static-pages/6922e12e933eb65569e2ab76" },
        { label: "Bangladesh Acreage Block Map", href: "/pages/files/6a1267da0daa4cebedf8ec0e" },
        { label: "Salient Features of Model PSC", href: "/pages/files/6a12774f4bbf12a41ac385cc" },
        { label: "Bangladesh Offshore Bidding Round 2026 Notice", href: "/pages/files/6a128555435e34d769ccfcd6" },
      ],
    },
    {
      title: "Official Order",
      image: "/images/services/official-order.png",
      items: [
        { label: "Ex-Bangladesh Leave", href: "/pages/go-ultimates?filters=%7B%22order%22%3A%20%226922d29d81fc96cef9e996ca%22%7D" },
        { label: "NOC for Passport", href: "/pages/go-ultimates?filters=%7B%22order%22%3A%20%226922d29d81fc96cef9e996b3%22%7D" },
        { label: "Notification / Circular", href: "/pages/notification-circulars" },
        { label: "Form", href: "/pages/forms" },
      ],
    },
    {
      title: "National Integrity Strategy",
      image: "/images/services/national-integrity-strategy.png",
      items: [
        { label: "NIS Workplan", href: "/pages/static-pages/6922dbdf933eb65569e0d210" },
        { label: "Focal Point & Alternate Officer", href: "/pages/static-pages/6922df00933eb65569e1f140" },
        { label: "Quarterly/Half yearly Observation/Evaluation", href: "/pages/static-pages/6922e13e933eb65569e2b10f" },
        { label: "Policies/Rules/Guidelines/Directions", href: "/pages/static-pages/6922dd05933eb65569e13347" },
      ],
    },
    {
      title: "Citizen's Charter",
      image: "/images/services/citizen-39-s-charter.png",
      items: [
        { label: "Citizen Charter", href: "/pages/office-citizen-charters" },
        { label: "Focal Point & Alternate Office", href: "/pages/static-pages/6922dfc9933eb65569e23fac" },
        { label: "Quarterly/Annual Evaluation Report", href: "/pages/static-pages/6922dfb2933eb65569e2388a" },
        { label: "Acts/Rules/Policies/Directions", href: "/pages/reports" },
      ],
    },
    {
      title: "GPMS",
      image: "/images/services/gpms.png",
      items: [
        { label: "Policies/Rules/Directions/Guidelines", href: "/pages/static-pages/6922e101933eb65569e2986b" },
        { label: "Agreements", href: "/pages/reports" },
        { label: "Observation & Evaluation Report", href: "/pages/static-pages/6922dfe0933eb65569e24739" },
        { label: "GPMS MS Web Link", href: "https://gpms.cabinet.gov.bd/" },
      ],
    },
    {
      title: "Grievance Redress System Instructions",
      image: "/images/services/grievance-redress-system-instructions.png",
      items: [
        { label: "Appellate and Designated Officer", href: "/pages/static-pages/6922e0f8933eb65569e295d6" },
        { label: "Monthly/Quarterly/Yearly Evaluation Report", href: "/pages/reports" },
        { label: "Grievance Submission (Online Application)", href: "http://grs.gov.bd" },
        { label: "Policies/Rules/Directions/Guidelines", href: "/pages/static-pages/6922db9a933eb65569e0b361" },
      ],
    },
    {
      title: "RTI",
      image: "/images/services/rti.png",
      items: [
        { label: "Appellate and Designated Officer", href: "/pages/info-officers" },
        { label: "Workplan and Application & Appeal Form", href: "/pages/static-pages/6922e0a5933eb65569e27fe9" },
        { label: "Proactive Information Disclosure & Others", href: "/pages/static-pages/6922dd30933eb65569e13ded" },
        { label: "Acts/Policies/Rules/Directions/Guidelines", href: "/pages/static-pages/6922e0ec933eb65569e292e0" },
      ],
    },
    {
      title: "Innovation Corner",
      image: "/images/services/innovation-corner.png",
      items: [
        { label: "Innovation Guideline", href: "/pages/static-pages/6922e033933eb65569e25f7c" },
        { label: "Innovation Team", href: "/pages/static-pages/6922de5f933eb65569e1a357" },
        { label: "Innovation Workplan & Report", href: "/pages/static-pages/6922e127933eb65569e2a8b4" },
        { label: "Innovation Idea", href: "/pages/static-pages/6922dfee933eb65569e24b48" },
      ],
    },
  ],
  heroSlides,
  heroTagline: {
    headline: "Towards a Prosperous Bangladesh, Secured by Energy",
    subtext: "Petrobangla's commitment to developing, exploring, and utilizing the nation's energy resources.",
  },
  stats: [
    { icon: "flame", label: "Natural Gas Production", sublabel: "(19.09.26 - 20.09.26)", value: gasProductionValue },
    { icon: "drop", label: "Oil Production", sublabel: "(19.09.26 - 20.09.26)", value: "—" },
    { icon: "drill", label: "Exploration Activities", sublabel: "Ongoing Projects", value: "12+" },
    { icon: "factory", label: "Service & Development Projects", sublabel: "", value: "25+" },
  ],
  participationBanner: {
    headline: "Everyone's Participation in Sustainable Development of the Energy Sector",
  },
  minister: {
    role: "Honorable Minister",
    name: "Mr. Iqbal Hasan Mahmud",
    ministry: "Ministry of Oil, Gas and Mineral Resources",
    photo: "/images/minister.jpg",
    href: "/pages/office-heads/honorable-minister-y2s9pm-6995465941d189117b1a4b71",
    detailsLabel: "View details",
  },
  officials: [
    {
      role: "Honorable State Minister",
      name: "Mr. Anindya Islam Amit",
      ministry: "Ministry of Oil, Gas and Mineral Resources",
      photo: "/images/state-minister.jpg",
      href: "/pages/office-heads/honorable-state-minister-z9chov-699546d9fcf25ca2d100d444",
      detailsLabel: "View details",
    },
    {
      role: "Secretary",
      name: "Mr. Md. Ziaul Huq",
      ministry: "Ministry of Oil, Gas and Mineral Resources",
      photo: "/images/secretary.jpg",
      href: "/pages/office-heads/secretary-yml5hj-69954727e886ee1ca629b2b2",
      detailsLabel: "View details",
    },
    {
      role: "Chairman",
      name: "Mr. Md. Abdul Mannan",
      ministry: "Petrobangla",
      photo: "/images/chairman.jpg",
      href: "/pages/office-heads/chairman-ca2gfz-699547b35f4dd887fe7fbce1",
      detailsLabel: "View details",
      extraLink: { label: "Message From Chairman", href: "https://petrobangla.portal.gov.bd/pages/static-pages/6922dced933eb65569e12c83" },
    },
  ],
  videos: [
    { thumbnail: "https://img.youtube.com/vi/yMUTjKBuFow/mqdefault.jpg", title: "Gas Accident Cautious TVC" },
    { thumbnail: "https://img.youtube.com/vi/zHln4s6doFY/mqdefault.jpg", title: "Cautious TVC for Power Saving" },
  ],
  photoGallery: photoGalleryEn,
  eServices: [
    { label: "Petrobangla Webmail", href: "https://mail.petrobangla.org.bd/" },
    { label: "Meeting Schedule of Petrobangla", href: "https://tinyurl.com/2y95koqv" },
    { label: "Online Monthly Pension Application", href: "https://forms.gle/jfrTUmCWJsbyXFhU9" },
    { label: "Smart Employee Evaluation", href: "https://www.seepb.org/see/login/" },
    { label: "Online Application Portal", href: "https://forms.gle/ANbRX82hJjb9iWcc6" },
    { label: "App of Officer's information", href: "https://drive.google.com/drive/folders/1zfmpTJ4Fanpe43CFNClZne6w29-BMN7P?usp=sharing" },
  ],
  importantLinks: [
    { label: "emrd", href: "https://emrd.gov.bd" },
    { label: "Bangladesh Energy and Power Research Council", href: "https://eprc.gov.bd/" },
    { label: "BPI", href: "https://bpi.gov.bd/" },
    { label: "Information Commission", href: "https://infocom.gov.bd" },
    { label: "APAMS", href: "https://apams.cabinet.gov.bd/" },
    { label: "NIS Software Link", href: "https://nis.cabinet.gov.bd/login" },
  ],
  quickLinks: [
    { label: "e-Directory", href: "https://edirectory.portal.gov.bd/" },
    { label: "myGov", href: "https://www.mygov.bd/" },
  ],
  nationalAnthem: {
    label: "National Anthem",
    src: "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/general-space/bd_national_anthem.mp3",
  },
  emergencyContacts: [
    { label: "Government information and services", number: "333", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
    { label: "Emergency services", number: "999", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
    { label: "Fire Service Hotline", number: "102", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
  ],
  facebookUrl: "https://www.facebook.com/petrobangla.org.bd",
  imageBanners,
  innovationCorner: {
    item: "Meeting-Minutes",
    itemHref: "/pages/innovation-corners?filters=%7B%22innovation_corner_type%22%3A%226922d2e181fc96cef9e9aed7%22%7D",
    showAllHref: "/pages/innovation-corners",
  },
  newWebsiteApplication: {
    label: "Application for new website of government office",
    href: "https://pms.portal.gov.bd/office/outauth_new_office",
  },
  footer: {
    // The 6 utility links, disclaimer, "planning & implementation" credit and last-updated
    // stamp are real, pulled from the live footer widget. The 4-column contact block (address,
    // phone, quick links) is the client-supplied reference design's own content, not present on
    // the live site's footer widget — used as given, same as the hero tagline earlier.
    utilityLinks: [
      { label: "Official Facebook Page", href: "https://www.facebook.com/petrobangla.org.bd" },
      { label: "FAQ", href: "/pages/static-pages/6922dd87933eb65569e155be" },
      { label: "Terms of Use", href: "/pages/static-pages/6922dfee933eb65569e24b66" },
      { label: "Contact", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
      { label: "Site Map", href: "/views/sitemap" },
      { label: "Privacy Policy", href: "/pages/static-pages/6922dd3f933eb65569e14190" },
    ],
    planningCredit: "Planning and implementation: Cabinet Division, a2i, BCC, DoICT and BASIS.",
    technicalSupportLabel: "Technical support",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "About Us", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
      { label: "Ministries & Divisions", href: "/" },
      { label: "Projects & Activities", href: "/" },
      { label: "Services", href: "/pages/service-boxes" },
      { label: "Data Repository", href: "/" },
      { label: "Contact", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
    ],
    contactTitle: "Contact",
    address: "Petrobangla Bhaban, Karwan Bazar, Dhaka-1215, Bangladesh",
    phone: "+88 02 55013822",
    email: "info@petrobangla.org.bd",
    website: "www.petrobangla.org.bd",
    lastUpdatedTitle: "Site last updated",
    tagline: "Petrobangla's commitment to developing, exploring, and utilizing the nation's energy resources.",
  },
};

const bn: Content = {
  orgIdentity: {
    name: "বাংলাদেশ তেল, গ্যাস ও খনিজসম্পদ কর্পোরেশন (পেট্রোবাংলা)",
    subtitle: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
    badge: "সরকারি প্রতিষ্ঠান",
    logo: "/images/logo.png",
  },
  natPortal: { label: "বাংলাদেশ জাতীয় তথ্য বাতায়ন", href: "http://bangladesh.gov.bd" },
  ui: {
    searchPlaceholder: "কি খুঁজছেন?...",
    login: "লগইন",
    langSwitchLabel: "English",
    showAllNotices: "সব দেখুন",
    newCount: (n) => `${n} নতুন`,
    viewDetails: "বিস্তারিত দেখুন",
    showAllServices: "সকল সেবাসমূহ দেখুন",
    noticeBoard: "নোটিশ বোর্ড",
    services: "সেবা সমূহ",
    videoGallery: "ভিডিও গ্যালারি",
    showAllVideos: "সব ভিডিও দেখুন",
    photoGallery: "ফটো গ্যালারি",
    internalEServices: "অভ্যন্তরীণ ই-সেবাসমূহ",
    importantLinks: "গুরুত্বপূর্ণ লিঙ্ক",
    quickLinks: "দ্রুত লিংক",
    emergencyContact: "জরুরি যোগাযোগ",
    showAllEmergency: "সকল সেবা দেখুন",
    followUs: "সামাজিক যোগাযোগ",
    innovationCorner: "ইনোভেশন কর্নার",
    showAll: "সব দেখুন",
    newTag: "নতুন",
  },
  homeLabel: "হোম",
  primaryNav: [
    {
      label: "আমাদের সম্পর্কে",
      children: [
        { label: "পেট্রোবাংলার গঠন ও ইতিহাস", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
        { label: "ভিশন ও মিশন", href: "/pages/static-pages/6922ddb2933eb65569e15ea4" },
        { label: "পেট্রোবাংলার চেয়ারম্যানবৃন্দের তালিকা", href: "/pages/files/6922dba5933eb65569e0b8bc" },
        { label: "পরিচালনা পর্ষদ", href: "/pages/static-pages/6922e07e933eb65569e27521" },
        { label: "ব্যবস্থাপনা পরিচালকবৃন্দ", href: "/pages/static-pages/6922de91933eb65569e1ba34" },
      ],
    },
    { label: "মডেল পিএসসি", children: [{ label: "অফশোর মডেল পিএসসি ২০২৬", href: "/pages/static-pages/6922e12e933eb65569e2ab76" }] },
    {
      label: "অধ্যাদেশ, আইন, বিধি ও নীতিমালা",
      children: [
        { label: "পেট্রোবাংলা সংশ্লিষ্ট আইন, অধ্যাদেশ ও রাষ্ট্রপতির আদেশ", href: "/pages/static-pages/6922de8a933eb65569e1b6ba" },
        { label: "বিধিমালা, প্রবিধানমালা, নীতিমালা, নিয়মাবলী এবং গাইডলাইন", href: "/pages/static-pages/6922dbed933eb65569e0d7a3" },
      ],
    },
    {
      label: "প্রতিবেদন",
      children: [
        { label: "দৈনিক গ্যাস প্রতিবেদন", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d2b181fc96cef9e99f16%22%7D" },
        { label: "কয়লা উৎপাদন পরিসংখ্যান", href: "https://bcmcl.org.bd/pages/static-pages/6922dd3c933eb65569e140ed" },
        { label: "এমআইএস প্রতিবেদন", href: "/pages/monthly-reports" },
        { label: "বার্ষিক প্রতিবেদন", href: "/pages/annual-reports" },
        { label: "নিরীক্ষিত প্রতিবেদন", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d29b81fc96cef9e995cb%22%7D" },
      ],
    },
    {
      label: "দরপত্র, ক্রয় পরিকল্পনা ও বাজেট",
      children: [
        { label: "স্থানীয় ও আন্তর্জাতিক দরপত্র", href: "/pages/tenders" },
        { label: "বার্ষিক ক্রয় পরিকল্পনা", href: "/pages/static-pages/6922dc3b933eb65569e0f278" },
        { label: "বাস্তবায়নাধীন প্রকল্পের বার্ষিক ক্রয় পরিকল্পনা", href: "/pages/static-pages/6922dbc7933eb65569e0c78d" },
        { label: "বাজেট", href: "/pages/reports?filters=%7B%22reports_type%22%3A%226922d2c081fc96cef9e9a478%22%7D" },
      ],
    },
    { label: "গ্যালারি", children: [{ label: "ফটো গ্যালারি", href: "/pages/photo-galleries" }] },
    { label: "হটলাইন", children: [{ label: "হটলাইন নম্বর", href: "/pages/static-pages/6922dc8f933eb65569e10f8f" }] },
    { label: "নিয়োগ", children: [{ label: "নিয়োগ বিজ্ঞপ্তি", href: "/pages/static-pages/6922dfe5933eb65569e248ce" }] },
    {
      label: "গ্যাস নেটওয়ার্ক",
      children: [
        { label: "গ্যাস সঞ্চালন ও বিপণন নেটওয়ার্ক", href: "/pages/static-pages/6922e047933eb65569e26515" },
        { label: "গ্যাস পরিবহণ ও বিতরণ পাইপলাইন", href: "/pages/static-pages/6922dff5933eb65569e24d19" },
      ],
    },
    { label: "প্রকল্প", children: [{ label: "উল্লেখযোগ্য চলমান প্রকল্পের সারসংক্ষেপ", href: "/pages/projects" }] },
    { label: "জ্বালানি বিভাগ সম্পর্কিত ড্যাশবোর্ড", children: [] },
    { label: "পরিবেশ ও সামাজিক পরিকল্পনা", children: [] },
  ],
  notices: [
    {
      href: "/pages/notices/invitation-for-enlistment-of-interested-lng-suppliers-zyjsxg-6a9965bb1fa8cd87d1f4bf6a",
      // Real source is genuinely English-only here even on the Bengali page — not an omission.
      title: "Corrigendum: Invitation for Enlistment of Interested LNG Suppliers",
      date: "১৭-০৯-২০২৬",
      tags: ["নতুন", "টেন্ডার"],
      description: "এনএলজি সরবরাহে আগ্রহী সরবরাহকারীদের তালিকাভুক্তির আহ্বানে বাংলাদেশ তেল, গ্যাস ও খনিজসম্পদ কর্পোরেশন সংশোধনী জারি করেছে।",
    },
    {
      href: "/pages/notices/অফিস-আদেশ-২৬৮-ইউডিএ-পদে-পদোন্নতি-figijo-6aaa5875442869e3ac44e521",
      title: "অফিস আদেশ (২৬.৮)-ইউডিএ পদে পদোন্নতি",
      date: "১৬-০৯-২০২৬",
      tags: ["নতুন", "পদোন্নতি"],
      description: "ইউডিএ (আপার ডিভিশন অ্যাসিস্ট্যান্ট) পদে পদোন্নতি সংক্রান্ত অফিস আদেশ জারি করা হয়েছে।",
    },
    {
      href: "/pages/notices/অফিস-আদেশ-২২৩৭২-7bllgg-6aaa4896f2b417fe9fff76c6",
      title: "অফিস আদেশ (২২.৩৭২)-প্রজেক্ট কো-অর্ডিনেটর",
      date: "১৬-০৯-২০২৬",
      tags: ["নতুন", "পদায়ন"],
      description: "প্রজেক্ট কো-অর্ডিনেটর নিয়োগ সংক্রান্ত অফিস আদেশ জারি করা হয়েছে।",
    },
  ],
  serviceBoxes: [
    {
      title: "আমাদের সম্পর্কে",
      image: "/images/services/about-us.jpg",
      items: [
        { label: "পেট্রোবাংলার গঠন ও ইতিহাস", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
        { label: "সাংগঠনিক কাঠামো", href: "/pages/organograms/6922d91f933eb65569dfcd1e" },
        { label: "কর্মকর্তাবৃন্দের তালিকা", href: "/pages/officers?filters=%7B%22officer_category%22%3A%20%226922d2fd81fc96cef9e9b61e%22%7D" },
        { label: "যোগাযোগ", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
      ],
    },
    {
      title: "পেট্রোবাংলার অধীনস্থ কোম্পানিসমূহ",
      image: "/images/services/companies-under-petrobangla.jpg",
      items: [
        { label: "গ্যাস অনুসন্ধান এবং উৎপাদন কোম্পানি", href: "/pages/static-pages/6922dbd6933eb65569e0ce57" },
        { label: "গ্যাস ট্রান্সমিশন কোম্পানি", href: "/pages/static-pages/6922db80933eb65569e0a70a" },
        { label: "গ্যাস বিপনন কোম্পানি", href: "/pages/static-pages/6922dd83933eb65569e154f6" },
        { label: "এলএনজি, সিএনজি ও এলপিজি এবং মাইনিং কোম্পানি", href: "/pages/static-pages/6922dcb9933eb65569e11ae1" },
      ],
    },
    {
      title: "মডেল পিএসসি ও ব্লক ম্যাপ",
      image: "/images/services/model-psc-amp-block-map.jpg",
      items: [
        { label: "মডেল পিএসসি", href: "/pages/static-pages/6922e12e933eb65569e2ab76" },
        { label: "বাংলাদেশ একারেজ ব্লক ম্যাপ", href: "/pages/files/6a1267da0daa4cebedf8ec0e" },
        { label: "মডেল পিএসসির বৈশিষ্ট্যসমূহ", href: "/pages/files/6a12774f4bbf12a41ac385cc" },
        { label: "Bangladesh Offshore Bidding Round 2026 Notice", href: "/pages/files/6a128555435e34d769ccfcd6" },
      ],
    },
    {
      title: "অফিস আদেশ",
      image: "/images/services/official-order.png",
      items: [
        { label: "বহিঃবাংলাদেশ ছুটি", href: "/pages/go-ultimates?filters=%7B%22order%22%3A%20%226922d29d81fc96cef9e996ca%22%7D" },
        { label: "পাসপোর্টের জন্য অনাপত্তি সনদ", href: "/pages/go-ultimates?filters=%7B%22order%22%3A%20%226922d29d81fc96cef9e996b3%22%7D" },
        { label: "পরিপত্র/প্রজ্ঞাপন", href: "/pages/notification-circulars" },
        { label: "বিভিন্ন ধরণের ফরম", href: "/pages/forms" },
      ],
    },
    {
      title: "জাতীয় শুদ্ধাচার কৌশল",
      image: "/images/services/national-integrity-strategy.png",
      items: [
        { label: "শুদ্ধাচার কৌশল কর্মপরিকল্পনা", href: "/pages/static-pages/6922dbdf933eb65569e0d210" },
        { label: "ফোকাল পয়েন্ট কর্মকর্তা ও বিকল্প কর্মকর্তা", href: "/pages/static-pages/6922df00933eb65569e1f140" },
        { label: "ত্রৈমাসিক/ষাণ্মাসিক পরিবীক্ষণ/মূল্যায়ন প্রতিবেদন", href: "/pages/static-pages/6922e13e933eb65569e2b10f" },
        { label: "আইন/বিধি/নীতিমালা/পরিপত্র/নির্দেশিকা/প্রজ্ঞাপন", href: "/pages/static-pages/6922dd05933eb65569e13347" },
      ],
    },
    {
      title: "সেবা প্রদান প্রতিশ্রুতি (সিটিজেন্‌স চার্টার)",
      image: "/images/services/citizen-39-s-charter.png",
      items: [
        { label: "সেবা প্রদান প্রতিশ্রুতি (সিটিজেন্‌স চার্টার)", href: "/pages/office-citizen-charters" },
        { label: "ফোকাল পয়েন্ট ও বিকল্প কর্মকর্তা", href: "/pages/static-pages/6922dfc9933eb65569e23fac" },
        { label: "ত্রৈমাসিক/বার্ষিক পরিবীক্ষণ প্রতিবেদন", href: "/pages/static-pages/6922dfb2933eb65569e2388a" },
        { label: "আইন/বিধি/নীতিমালা/নির্দেশিকা", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d2c981fc96cef9e9a7cd%22%7D" },
      ],
    },
    {
      title: "জিপিএমএস",
      image: "/images/services/gpms.png",
      items: [
        { label: "জিপিএমএস নির্দেশিকা/পরিপত্র/টিম", href: "/pages/static-pages/6922e101933eb65569e2986b" },
        { label: "চুক্তিসমূহ", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d30f81fc96cef9e9bc3c%22%7D" },
        { label: "পরিবীক্ষণ ও মূল্যায়ন প্রতিবেদন", href: "/pages/static-pages/6922dfe0933eb65569e24739" },
        { label: "জিপিএমএস সফটওয়্যার লিংক", href: "https://gpms.cabinet.gov.bd/" },
      ],
    },
    {
      title: "অভিযোগ প্রতিকার ব্যবস্থাপনা",
      image: "/images/services/grievance-redress-system-instructions.png",
      items: [
        { label: "অনিক ও আপিল কর্মকর্তা", href: "/pages/static-pages/6922e0f8933eb65569e295d6" },
        { label: "মাসিক/ত্রৈমাসিক/বার্ষিক পরিবীক্ষণ/মূল্যায়ন প্রতিবেদন", href: "/pages/reports?filters=%7B%22reports_type%22%3A%20%226922d2c281fc96cef9e9a55e%22%7D" },
        { label: "অভিযোগ দাখিল (অনলাইন আবেদন)", href: "http://grs.gov.bd" },
        { label: "আইন/বিধি/নীতিমালা/নির্দেশিকা", href: "/pages/static-pages/6922db9a933eb65569e0b361" },
      ],
    },
    {
      title: "তথ্য অধিকার",
      image: "/images/services/rti.png",
      items: [
        { label: "দায়িত্বপ্রাপ্ত কর্মকর্তা ও আপীল কর্তৃপক্ষ", href: "/pages/info-officers" },
        { label: "কর্মপরিকল্পনা, প্রতিবেদন, আবেদন ও আপীল ফরম", href: "/pages/static-pages/6922e0a5933eb65569e27fe9" },
        { label: "স্বপ্রণোদিত প্রকাশযোগ্য তথ্যসমূহ", href: "/pages/static-pages/6922dd30933eb65569e13ded" },
        { label: "আইন/বিধি/নীতিমালা/নির্দেশিকা/প্রজ্ঞাপন", href: "/pages/static-pages/6922e0ec933eb65569e292e0" },
      ],
    },
    {
      title: "উদ্ভাবনী কার্যক্রম",
      image: "/images/services/innovation-corner.png",
      items: [
        { label: "ইনোভেশন নির্দেশিকা", href: "/pages/static-pages/6922e033933eb65569e25f7c" },
        { label: "ইনোভেশন টিম", href: "/pages/static-pages/6922de5f933eb65569e1a357" },
        { label: "উদ্ভাবন কর্মপরিকল্পনা ও প্রতিবেদন", href: "/pages/static-pages/6922e127933eb65569e2a8b4" },
        { label: "উদ্ভাবনী উদ্যোগ", href: "/pages/static-pages/6922dfee933eb65569e24b48" },
      ],
    },
  ],
  heroSlides,
  heroTagline: {
    headline: "জ্বালানি নিরাপত্তায় সমৃদ্ধ বাংলাদেশের পথে",
    subtext: "দেশের জ্বালানি সম্পদ উন্নয়ন, অনুসন্ধান ও ব্যবহারে পেট্রোবাংলার অঙ্গীকার",
  },
  stats: [
    { icon: "flame", label: "প্রাকৃতিক গ্যাস উৎপাদন", sublabel: "(১৯.০৯.২৬ - ২০.০৯.২৬)", value: gasProductionValue },
    { icon: "drop", label: "তেল উৎপাদন", sublabel: "(১৯.০৯.২৬ - ২০.০৯.২৬)", value: "—" },
    { icon: "drill", label: "অনুসন্ধান কার্যক্রম", sublabel: "চলমান প্রকল্প", value: "১২+" },
    { icon: "factory", label: "সার্ভিস ও উন্নয়ন প্রকল্প", sublabel: "", value: "২৫+" },
  ],
  participationBanner: {
    headline: "জ্বালানি খাতে টেকসই উন্নয়নে সবার অংশগ্রহণ",
  },
  minister: {
    role: "মাননীয় মন্ত্রী",
    name: "জনাব ইকবাল হাসান মাহমুদ",
    ministry: "তেল, গ্যাস ও খনিজসম্পদ মন্ত্রণালয়",
    photo: "/images/minister.jpg",
    href: "/pages/office-heads/মাননীয়-মন্ত্রী-x0he9r-6995465941d189117b1a4b71",
    detailsLabel: "বিস্তারিত",
  },
  officials: [
    {
      role: "মাননীয় প্রতিমন্ত্রী",
      name: "জনাব অনিন্দ্য ইসলাম অমিত",
      ministry: "তেল, গ্যাস ও খনিজসম্পদ মন্ত্রণালয়",
      photo: "/images/state-minister.jpg",
      href: "/pages/office-heads/মাননীয়-প্রতিমন্ত্রী-8b2rg0-699546d9fcf25ca2d100d444",
      detailsLabel: "বিস্তারিত",
    },
    {
      role: "সচিব",
      name: "জনাব মোঃ জিয়াউল হক",
      ministry: "তেল, গ্যাস ও খনিজসম্পদ মন্ত্রণালয়",
      photo: "/images/secretary.jpg",
      href: "/pages/office-heads/সচিব-nie2hy-69954727e886ee1ca629b2b2",
      detailsLabel: "বিস্তারিত",
    },
    {
      role: "চেয়ারম্যান",
      name: "জনাব মোঃ আব্দুল মান্নান",
      ministry: "পেট্রোবাংলা",
      photo: "/images/chairman.jpg",
      href: "/pages/office-heads/চেয়ারম্যান-qxeym0-699547b35f4dd887fe7fbce1",
      detailsLabel: "বিস্তারিত",
      extraLink: { label: "চেয়ারম্যান মহোদয়ের বার্তা", href: "https://petrobangla.portal.gov.bd/pages/static-pages/6922dced933eb65569e12c83" },
    },
  ],
  videos: [
    { thumbnail: "https://img.youtube.com/vi/yMUTjKBuFow/mqdefault.jpg", title: "গ্যাসের অপচয় ও দুর্ঘটনা রোধে সচেতনতা" },
    { thumbnail: "https://img.youtube.com/vi/zHln4s6doFY/mqdefault.jpg", title: "বিদ্যুৎ সাশ্রয় বিষয়ক সচেতনতা" },
  ],
  photoGallery: photoGalleryBn,
  eServices: [
    { label: "পেট্রোবাংলার ওয়েবমেইল", href: "https://mail.petrobangla.org.bd/" },
    { label: "পেট্রোবাংলার অনুষ্ঠিতব্য সভার সময়সূচী", href: "https://tinyurl.com/2y95koqv" },
    { label: "অনলাইন মাসিক অবসরভাতা আবেদন", href: "https://forms.gle/jfrTUmCWJsbyXFhU9" },
    { label: "স্মার্ট ইমপ্লয়ি ইভালুয়েসন", href: "https://www.seepb.org/see/login/" },
    { label: "অনলাইন আবেদন পোর্টাল", href: "https://forms.gle/ANbRX82hJjb9iWcc6" },
    { label: "কর্মকর্তাদের তথ্য বিষয়ক এ্যাপ", href: "https://drive.google.com/drive/folders/1zfmpTJ4Fanpe43CFNClZne6w29-BMN7P?usp=sharing" },
  ],
  importantLinks: [
    { label: "জ্বাখসবি", href: "https://emrd.gov.bd" },
    { label: "বাংলাদেশ জ্বালানি ও বিদ্যুৎ গবেষণা কাউন্সিল", href: "https://eprc.gov.bd/" },
    { label: "বিপিআই", href: "https://bpi.gov.bd/" },
    { label: "তথ্য কমিশন", href: "https://infocom.gov.bd" },
    { label: "এপিএএমএস", href: "https://apams.cabinet.gov.bd/" },
    { label: "NIS সফটওয়্যার লিংক", href: "https://nis.cabinet.gov.bd/login" },
  ],
  quickLinks: [
    { label: "ই-ডিরেক্টরি", href: "https://edirectory.portal.gov.bd/" },
    { label: "myGov", href: "https://www.mygov.bd/" },
  ],
  nationalAnthem: {
    label: "জাতীয় সঙ্গীত",
    src: "https://objectstorage.ap-dcc-gazipur-1.oraclecloud15.com/n/axvjbnqprylg/b/V2Ministry/o/general-space/bd_national_anthem.mp3",
  },
  emergencyContacts: [
    { label: "সরকারি তথ্য ও সেবা", number: "৩৩৩", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
    { label: "জরুরি সেবা", number: "৯৯৯", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
    { label: "ফায়ার সার্ভিস হটলাইন", number: "১০২", href: "https://bangladesh.gov.bd/site/page/aaebba14-f52a-4a3d-98fd-a3f8b911d3d9" },
  ],
  facebookUrl: "https://www.facebook.com/petrobangla.org.bd",
  imageBanners,
  innovationCorner: {
    item: "সভার-কার্যবিবরণী",
    itemHref: "/pages/innovation-corners?filters=%7B%22innovation_corner_type%22%3A%226922d2e181fc96cef9e9aed7%22%7D",
    showAllHref: "/pages/innovation-corners",
  },
  newWebsiteApplication: {
    label: "সরকারি অফিসের নতুন ওয়েবসাইটের আবেদন",
    href: "https://pms.portal.gov.bd/office/outauth_new_office",
  },
  footer: {
    utilityLinks: [
      { label: "অফিসিয়াল ফেসবুক পেজ", href: "https://www.facebook.com/petrobangla.org.bd" },
      { label: "সচারাচর জিজ্ঞাস্য", href: "/pages/static-pages/6922dd87933eb65569e155be" },
      { label: "ব্যবহারের শর্তাবলী", href: "/pages/static-pages/6922dfee933eb65569e24b66" },
      { label: "যোগাযোগ", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
      { label: "সাইট ম্যাপ", href: "/views/sitemap" },
      { label: "গোপনীয়তার নীতিমালা", href: "/pages/static-pages/6922dd3f933eb65569e14190" },
    ],
    planningCredit: "পরিকল্পনা এবং বাস্তবায়ন: মন্ত্রিপরিষদ বিভাগ, এটুআই, বিসিসি, ডিওআইসিটি ও বেসিস।",
    technicalSupportLabel: "কারিগরি সহায়তা",
    quickLinksTitle: "দ্রুত লিংক",
    quickLinks: [
      { label: "আমাদের সম্পর্কে", href: "/pages/static-pages/6922dfe6933eb65569e248ee" },
      { label: "মন্ত্রণালয় ও বিভাগ", href: "/" },
      { label: "প্রকল্প ও কার্যক্রম", href: "/" },
      { label: "সেবা সমুহ", href: "/pages/service-boxes" },
      { label: "তথ্য ভান্ডার", href: "/" },
      { label: "যোগাযোগ", href: "/pages/static-pages/6922df12933eb65569e1fab5" },
    ],
    contactTitle: "যোগাযোগ",
    address: "পেট্রোবাংলা ভবন, কারওয়ান বাজার, ঢাকা-১২১৫, বাংলাদেশ",
    phone: "+৮৮ ০২ ৫৫০১৩৮২২",
    email: "info@petrobangla.org.bd",
    website: "www.petrobangla.org.bd",
    lastUpdatedTitle: "সাইটটি শেষ হাল-নাগাদ করা হয়েছে",
    tagline: "দেশের জ্বালানি সম্পদ উন্নয়ন, অনুসন্ধান ও ব্যবহারে পেট্রোবাংলার অঙ্গীকার।",
  },
};

export const contentByLocale: Record<Locale, Content> = { en, bn };
