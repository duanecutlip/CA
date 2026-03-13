export const SITE_TITLE = 'Duane Cutlip';
export const SITE_DESCRIPTION = 'Protect your family from unexpected funeral costs. Duane Cutlip is a Preneed Planning Counselor with nearly 20 years experience serving families across North Carolina. Call (919) 822-2010.';
export const SITE_URL = 'https://duanecutlip.com';
export const PHONE = '(919) 822-2010';
export const PHONE_RAW = '9198222010';
export const EMAIL = 'duane@duanecutlip.com';
export const ADDRESS = '';

export const NAV_LINKS = [
  { label: 'Plan Ahead', href: '/plan-ahead' },
  { label: 'Final Expense', href: '/final-expense' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Learn', href: '/learn' },
  { label: 'About Duane', href: '/about' },
  { label: 'For Professionals', href: '/for-funeral-homes' },
  { label: 'Get Started', href: '/get-started' },
];

export const FOOTER_NAV = {
  planning: [
    { label: 'Plan Ahead', href: '/plan-ahead' },
    { label: 'Final Expense Insurance', href: '/final-expense' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Celebration of Life', href: '/celebration-of-life' },
    { label: 'Military Families', href: '/military-families' },
    { label: 'Help Your Parents Plan', href: '/help-your-parents-plan' },
    { label: 'Pre-Planning Checklist', href: '/resources/pre-planning-checklist' },
    { label: 'What to Expect', href: '/resources/what-to-expect' },
  ],
  learn: [
    { label: 'Preneed Insurance (NC)', href: '/learn/preneed-insurance-nc' },
    { label: 'Medicaid Planning', href: '/learn/medicaid-funeral-planning' },
    { label: 'VA Funeral Benefits', href: '/learn/va-funeral-benefits' },
    { label: 'Preneed vs Final Expense', href: '/learn/preneed-vs-final-expense' },
    { label: 'Final Expense Insurance', href: '/final-expense' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Glossary', href: '/resources/glossary' },
    { label: 'Blog', href: '/blog' },
  ],
  company: [
    { label: 'About Duane', href: '/about' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Contact', href: '/contact' },
  ],
  professionals: [
    { label: 'For Funeral Homes', href: '/for-funeral-homes' },
    { label: 'Consulting', href: '/for-funeral-homes/consulting' },
    { label: 'Training', href: '/for-funeral-homes/training' },
    { label: 'Program Audit', href: '/for-funeral-homes/program-audit' },
    { label: 'Marketing Strategy', href: '/for-funeral-homes/marketing' },
    { label: 'Speaking & Seminars', href: '/for-funeral-homes/speaking' },
    { label: 'Industry Insights', href: '/insights' },
    { label: 'Staffing', href: '/funeral-home-staffing' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
};

export interface Testimonial {
  quote: string;
  name: string;
  relationship: string;
  city: string;
}

// ⚠️  TODO — LEGAL COMPLIANCE REQUIRED BEFORE LAUNCH ⚠️
// The testimonials below are PLACEHOLDER/FABRICATED content.
// Using fabricated testimonials violates NC deceptive advertising statutes
// (N.C.G.S. 75-1.1) and insurance marketing regulations.
// REPLACE with real, documented testimonials from actual clients before publishing,
// OR REMOVE this section entirely until real testimonials are collected.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Duane made what I thought would be the hardest conversation of my life feel natural and even comforting. My family knows exactly what I want, and that gives me peace.",
    name: 'Margaret T.',
    relationship: 'Pre-need client',
    city: 'Raleigh, NC',
  },
  {
    quote: "After my husband passed unexpectedly, I knew I never wanted my children to go through that chaos. Duane helped me plan everything — now my kids don't have to worry.",
    name: 'Sandra W.',
    relationship: 'Pre-need client',
    city: 'Garner, NC',
  },
  {
    quote: "I called four different agents before I found Duane. He was the only one who didn't try to sell me something on the first call. He just listened.",
    name: 'Robert & Jean M.',
    relationship: 'Pre-need clients (couple)',
    city: 'Cary, NC',
  },
  {
    quote: "My daughter found Duane's website and sent it to me. I'm so glad she did. The whole process took less than two weeks and now we both sleep better.",
    name: 'Dorothy H.',
    relationship: 'Pre-need client',
    city: 'Wake Forest, NC',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  // Basics
  {
    question: 'How much does pre-need insurance cost?',
    answer: 'Most families invest between $4,000 and $20,000, depending on the type of service and level of coverage. The NFDA reports a median funeral cost of $8,300 — but that figure excludes the burial vault, cemetery plot, opening and closing fees, and grave marker, which virtually every family needs. When all expenses are included, North Carolina families typically spend $12,000 to $20,000 on a traditional burial, with many spending closer to $15,000. With an Inflation Proof Guarantee, the funeral home accepts your plan as payment in full for covered services — so your family never pays the difference on guaranteed items. Duane will walk you through options that fit your budget — there\'s no pressure and no obligation.',
    category: 'Costs',
  },
  {
    question: 'What is pre-need insurance?',
    answer: 'Pre-need insurance is a policy specifically designed to cover your funeral and burial expenses. Unlike regular life insurance, pre-need funds are earmarked for funeral costs and go directly to the funeral home — not through probate. This means your family never has to come out of pocket for your final arrangements.',
    category: 'Basics',
  },
  {
    question: 'What\'s the difference between pre-need insurance and final expense insurance?',
    answer: 'Pre-need insurance is tied to a specific funeral plan with a specific funeral home, guaranteeing your arrangements at today\'s prices. Final expense insurance is a general life insurance policy that pays a death benefit your family can use for anything. Pre-need offers price protection and takes all decision-making burden off your family. Final expense offers more flexibility but no price guarantee.',
    category: 'Basics',
  },
  {
    question: 'Is pre-need insurance worth it?',
    answer: 'For most families, absolutely. Funeral costs have risen 40% in the last decade and continue to climb. A pre-need plan with an Inflation Proof Guarantee means the funeral home accepts your plan as payment in full for covered services — whatever those services cost when the time comes. It ensures your wishes are honored exactly as you want, and spares your family from making expensive decisions during the worst week of their lives. It\'s one of the most practical gifts you can give your loved ones.',
    category: 'Basics',
  },
  {
    question: 'Why do advertised funeral prices seem so much lower than what families actually spend?',
    answer: 'Advertised prices are usually one line item, not a complete arrangement. The NFDA\'s widely-cited $8,300 median covers the funeral home\'s basic service fees and casket — it does not include the burial vault (required by nearly all cemeteries), the cemetery plot, opening and closing fees, or the grave marker. Each of those is a separate line item that can add $5,000–$10,000 or more. Similarly, deeply discounted "direct cremation" services advertised online cover only transportation, the cremation itself, and return of ashes — no service, no gathering, no support. These are offered by discount providers as a stripped-down option, not by the established independent funeral homes Duane works with. Those homes provide complete, dignified arrangements with the professional care families deserve. Duane believes in giving you all the numbers before you make any decision — because good information makes good decisions.',
    category: 'Costs',
  },
  {
    question: 'Can I pay for pre-need insurance in installments?',
    answer: 'Yes. Most pre-need policies offer flexible payment options including monthly, quarterly, or annual payments over 1, 5, or 10 years. Single-pay (lump sum) options are also available and often provide the best value. Duane will help you find a payment schedule that fits comfortably within your budget.',
    category: 'Costs',
  },
  {
    question: 'What happens to my pre-need plan if I move?',
    answer: 'Your pre-need insurance policy is portable. If you move out of the Raleigh area or even out of North Carolina, your coverage travels with you. You can transfer your plan to a funeral home in your new location. The funds and your wishes remain protected.',
    category: 'Process',
  },
  {
    question: 'What does a pre-need plan typically include?',
    answer: 'A comprehensive pre-need plan covers everything your family would otherwise have to arrange: casket or urn selection, funeral service type (traditional, graveside, cremation, celebration of life), transportation, preparation, flowers, music, obituary, death certificates, and all funeral home fees. Every detail is documented so nothing is left to guesswork.',
    category: 'Basics',
  },
  {
    question: 'How is pre-need insurance different from a burial savings account?',
    answer: 'A burial savings account is just money in a bank — it can be accessed by creditors, affected by Medicaid spend-down requirements, and doesn\'t keep pace with rising funeral costs. Pre-need insurance is protected from creditors in most states, is typically Medicaid-exempt, and guarantees coverage at today\'s prices regardless of future cost increases.',
    category: 'Comparisons',
  },
  {
    question: 'Does pre-need insurance affect Medicaid eligibility?',
    answer: 'In North Carolina, irrevocable pre-need funeral contracts are generally exempt from Medicaid asset calculations. This means you can set aside funds for your funeral without jeopardizing your Medicaid eligibility. Duane can explain how this works for your specific situation.',
    category: 'Costs',
  },
  {
    question: 'What happens when I call Duane?',
    answer: 'Duane answers personally — no call center, no receptionist. He\'ll introduce himself, ask a little about your family, and listen to what prompted your call. Most initial calls last about 15 minutes. There\'s no sales pitch and no pressure. If you\'d like to move forward, he\'ll schedule a time to meet in person or by phone to go over your options in detail.',
    category: 'Process',
  },
  {
    question: 'How long does the pre-need planning process take?',
    answer: 'Most families complete their plan in 1-2 meetings over about a week. The first conversation covers your wishes and preferences. The second meeting reviews your personalized plan and finalizes the paperwork. From start to finish, most families have everything in place within two weeks.',
    category: 'Process',
  },
  {
    question: 'Can I plan for my spouse and me at the same time?',
    answer: 'Absolutely — and many couples do. Planning together ensures your wishes complement each other. Duane frequently works with couples who want to "get their affairs in order" together. It\'s one of the most thoughtful things you can do for each other and for your children.',
    category: 'Process',
  },
  {
    question: 'What funeral homes does Duane work with?',
    answer: 'Duane has long-standing relationships with respected independent funeral homes throughout North Carolina. As a Licensed Preneed Funeral Director, he can work with the funeral home of your choice — or help you find one that fits your family\'s preferences and values. He\'ll discuss your specific situation when you call.',
    category: 'Agent',
  },
  {
    question: 'Can I change my pre-need plan after it\'s set up?',
    answer: 'Yes. Life changes, and your plan can change with it. You can update your service preferences, change your designated funeral home, or adjust your coverage. Duane stays in touch with his clients and is always available to make modifications as your needs evolve.',
    category: 'Process',
  },
  {
    question: 'What are Duane\'s qualifications?',
    answer: 'Duane Cutlip is a Licensed Preneed Funeral Director in North Carolina with nearly 20 years of experience. He holds all required state licenses and continuing education certifications. He\'s an active member of the National Funeral Directors Association (NFDA) and has helped hundreds of families in the Raleigh-Wake County area plan ahead with confidence.',
    category: 'Agent',
  },
  {
    question: 'Is there a medical exam required for pre-need insurance?',
    answer: 'Most pre-need insurance policies require no medical exam. Some may ask basic health questions on the application, but guaranteed-issue policies are available with no health questions at all. Coverage options exist for nearly every health situation. Duane can help you find the right policy regardless of your health status.',
    category: 'Basics',
  },
  {
    question: 'What if I already have life insurance?',
    answer: 'Life insurance and pre-need insurance serve different purposes. Life insurance pays a general death benefit that may be used for anything — mortgage, bills, living expenses for your family. Pre-need insurance is specifically earmarked for funeral expenses and goes directly to the funeral home, bypassing probate. Many families have both to ensure comprehensive coverage.',
    category: 'Comparisons',
  },
  {
    question: 'Do I need to choose a funeral home before getting pre-need insurance?',
    answer: 'No, but having a preferred funeral home in mind helps personalize your plan. Duane can help you evaluate funeral homes in the Wake County area and connect you with one that matches your preferences. If you don\'t have a preference yet, that\'s perfectly fine — the policy itself is portable.',
    category: 'Process',
  },
];

export interface ServiceArea {
  name: string;
  slug: string;
  county: string;
  state: string;
  region?: string;
  description?: string;
  highlights?: string[];
  faq?: { question: string; answer: string }[];
}

export const SERVICE_AREAS: ServiceArea[] = [
  // ── North Carolina — Wake County ──
  {
    name: 'Raleigh',
    slug: 'raleigh',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Raleigh is North Carolina\'s capital and one of the South\'s fastest-growing cities — home to NC State University, a thriving tech and life science sector, and a vibrant downtown anchored by the historic State Capitol. With a mix of state government employees, university families, young professionals, and multigenerational residents, Raleigh families come from every walk of life. Pre-need insurance gives Raleigh families a practical way to document their wishes and protect their loved ones from unexpected funeral costs in one of the state\'s most dynamic markets.',
    highlights: [
      'Serving families throughout Raleigh — from North Hills and Crabtree Valley to Five Points and Brier Creek',
      'Experienced with pre-need planning for state government employees and NC State community members',
      'Familiar with Raleigh\'s diverse cultural traditions and wide range of memorial preferences',
    ],
  },
  {
    name: 'Cary',
    slug: 'cary',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Cary is one of the most educated and affluent communities in North Carolina — home to thousands of Research Triangle Park professionals, SAS Institute employees, and families drawn by top-rated schools and well-planned neighborhoods. Known for exceptional quality of life, Cary residents tend to be forward-thinking planners who take financial preparation seriously. Pre-need insurance fits naturally into that mindset: a smart, practical step that protects your family from rising funeral costs and removes difficult decisions from their shoulders.',
    highlights: [
      'Serving families throughout Cary — from Preston and MacGregor Downs to Kildaire Farm and Green Level',
      'Experienced with pre-need planning for RTP professionals, SAS employees, and their families',
      'Straightforward, no-pressure process that fits Cary\'s detail-oriented, planning-minded community',
    ],
  },
  {
    name: 'Apex',
    slug: 'apex',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Apex has earned its motto — "The Peak of Good Living" — by becoming one of the most desirable addresses in the Triangle. A thriving downtown, top-rated schools, and a strong community identity have made it a magnet for families settling into western Wake County. As Apex continues to grow, many residents are thinking about long-term financial planning for the first time. Pre-need insurance is one of the most overlooked parts of that picture — locking in today\'s funeral prices while you\'re young and healthy delivers the greatest long-term savings.',
    highlights: [
      'Serving families throughout Apex, Friendship, and western Wake County',
      'Experienced working with younger families exploring pre-need planning for the first time',
      'Familiar with Apex\'s community character and local funeral home options',
    ],
  },
  {
    name: 'Garner',
    slug: 'garner',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Garner is a close-knit community in southern Wake County where working families and longtime residents have put down deep roots along the I-40 corridor between Raleigh and Johnston County. Garner has a genuine small-town feel that larger Triangle cities have long outgrown, and its residents tend to be practical, family-first people who look out for one another. Pre-need insurance aligns perfectly with those values — a straightforward way to protect the people you love and keep a financial burden off their shoulders.',
    highlights: [
      'Serving families throughout Garner, White Oak, and southern Wake County',
      'Understands Garner\'s working-family values and commitment to practical planning',
      'Available for in-home consultations in Garner at a time that works for you',
    ],
  },
  {
    name: 'Wendell',
    slug: 'wendell',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Wendell is Duane\'s home community — a small eastern Wake County town with historic charm, a genuine small-town character, and the fast-growing Wendell Falls development bringing new neighbors every month. As a Wendell resident himself, Duane knows this community personally and has helped many local families with their pre-need planning. Whether you\'re a lifelong Wendell resident or a newcomer to Wendell Falls, Duane is your neighbor — and he\'ll treat you like one.',
    highlights: [
      'Duane is based in Wendell — he\'s a neighbor, not a salesperson calling from across the state',
      'Serving both lifelong Wendell residents and the growing Wendell Falls community',
      'Available for in-home meetings in Wendell whenever it\'s convenient for you',
    ],
  },
  {
    name: 'Knightdale',
    slug: 'knightdale',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Knightdale has transformed from a quiet eastern crossroads into one of the most sought-after communities in Wake County, attracting young families with affordable housing, quality schools, and easy access to Raleigh. That rapid growth means many Knightdale residents are first-time homeowners and young families beginning to think seriously about long-term financial planning. Pre-need insurance is one of the smartest early steps — locking in today\'s prices while you\'re young and healthy means lower premiums and maximum protection for your family.',
    highlights: [
      'Serving families throughout Knightdale and eastern Wake County',
      'Experienced working with younger families adding pre-need planning to their financial preparation',
      'Based in East Wake County himself, Duane knows this community and its neighbors well',
    ],
  },
  {
    name: 'Wake Forest',
    slug: 'wake-forest',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Wake Forest is one of the fastest-growing towns in northern Wake County, drawing families who want good schools, safe neighborhoods, and room to grow while staying connected to the Triangle. With a revitalized downtown and a strong sense of community pride, Wake Forest has developed an identity all its own. Many residents here are at a life stage where long-term planning is a natural priority, and pre-need insurance sits alongside estate planning, retirement savings, and life insurance as part of a complete financial picture.',
    highlights: [
      'Serving families throughout Wake Forest and northern Wake County',
      'Experienced helping families integrate pre-need planning with broader financial goals',
      'Available for in-person or phone consultations at your convenience',
    ],
  },
  {
    name: 'Holly Springs',
    slug: 'holly-springs',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Holly Springs is consistently ranked among the best places to live in North Carolina for its family-friendly character, excellent schools, and strong sense of community in southwestern Wake County. Most residents are young families and professionals who moved here intentionally — for the neighborhoods, the schools, and the quality of life. That forward-thinking mindset makes pre-need planning a natural fit: protect your family against rising funeral costs with an Inflation Proof Guarantee, document your wishes, and give your family one less thing to worry about when it matters most.',
    highlights: [
      'Serving families throughout Holly Springs and southwestern Wake County',
      'Understands the forward-planning values of Holly Springs\' young professional community',
      'Available for in-home visits or phone consultations at your convenience',
    ],
  },
  {
    name: 'Fuquay-Varina',
    slug: 'fuquay-varina',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Fuquay-Varina is a distinctive southern Wake County community that blends small-town charm with steady suburban growth. With two historic downtowns merged into one, "FV" has a character all its own — a mix of multigenerational farm families, longtime blue-collar workers, and newer residents drawn by more affordable housing south of Raleigh. That combination of deep roots and practical values makes Fuquay-Varina a natural fit for pre-need planning: protecting family, honoring tradition, and keeping funeral costs from becoming a burden.',
    highlights: [
      'Serving families throughout Fuquay-Varina and southern Wake County',
      'Understanding of FV\'s blend of longtime agricultural families and newer suburban residents',
      'Available for in-home visits or phone consultations at your convenience',
    ],
  },
  {
    name: 'Zebulon',
    slug: 'zebulon',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Zebulon is a small but growing eastern Wake County town with deep agricultural roots and a tight-knit community character that larger cities have long since left behind. Known historically for tobacco farming and now attracting families seeking more space and a quieter pace just east of Raleigh, Zebulon offers genuine neighborliness alongside increasing convenience. Pre-need planning fits naturally with those values — a family-first decision that ensures the people you love are protected without financial strain.',
    highlights: [
      'Serving families throughout Zebulon and eastern Wake County',
      'Understands the small-town, community-first values of eastern Wake County residents',
      'Duane answers personally — no call center, no waiting, no pressure',
    ],
  },
  {
    name: 'Rolesville',
    slug: 'rolesville',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Rolesville is a small but rapidly growing northern Wake County town that has become one of the Triangle\'s most appealing bedroom communities. New neighborhoods are rising alongside longtime farmland, drawing families who want a quieter pace of life without sacrificing access to Raleigh and Wake Forest. That mix of deep-rooted families and new arrivals creates a natural moment for pre-need planning — whether you\'re new to the area and thinking about your family\'s future, or a longtime Rolesville resident with decades of local ties.',
    highlights: [
      'Serving families throughout Rolesville and northern Wake County',
      'Available for in-home consultations in Rolesville and the surrounding community',
      'No obligation, no pressure — just an honest conversation about protecting your family',
    ],
    faq: [
      { question: 'Does Duane serve Rolesville, NC?', answer: 'Yes. Rolesville is part of Duane\'s northern Wake County service area. He\'s familiar with the community and is happy to meet with local families by phone or in person.' },
      { question: 'What does pre-need insurance cost for Rolesville families?', answer: 'Most families invest between $4,000 and $20,000 depending on the level of service and their preferences. Duane will walk you through options that fit your budget — no pressure, no obligation.' },
      { question: 'Can Duane meet me in Rolesville?', answer: 'Absolutely. Duane is happy to meet at your home or a convenient location in Rolesville. Phone consultations are also available — whatever works best for you.' },
    ],
  },
  {
    name: 'Morrisville',
    slug: 'morrisville',
    county: 'Wake',
    state: 'NC',
    region: 'Wake County',
    description: 'Morrisville sits at the heart of the Research Triangle — flanked by Raleigh-Durham International Airport, Research Triangle Park, and the Brier Creek corridor — making it one of the most internationally diverse communities in North Carolina. Home to engineers, scientists, and healthcare professionals from around the world, Morrisville has a highly educated, globally connected population that values thorough planning and preparation. Pre-need insurance gives Morrisville families a clear, documented plan that ensures wishes are honored and loved ones are never left to guess.',
    highlights: [
      'Serving Morrisville\'s diverse, internationally connected community near RTP and RDU',
      'Experienced with families of various cultural backgrounds and memorial traditions',
      'Available for in-person or phone consultations at your convenience',
    ],
    faq: [
      { question: 'Does Duane serve Morrisville, NC?', answer: 'Yes. Morrisville is part of Duane\'s Wake County service area. He works with families throughout the community and is available for phone or in-person consultations.' },
      { question: 'Can pre-need insurance accommodate different cultural or religious traditions?', answer: 'Absolutely. Your pre-need plan documents exactly the type of service you want — whether that reflects a specific religious tradition, cultural custom, or personal preference. Duane works respectfully with families of all backgrounds.' },
      { question: 'How long does the pre-need planning process take?', answer: 'Most plans are completed within two weeks. Duane starts with a short conversation to understand your wishes, then prepares a personalized plan for your review. There\'s no pressure and no obligation until you\'re ready to proceed.' },
    ],
  },
  // ── North Carolina — Triangle (Durham, Orange, Chatham) ──
  {
    name: 'Durham',
    slug: 'durham',
    county: 'Durham',
    state: 'NC',
    region: 'Triangle',
    description: 'Known as the Bull City, Durham is the heartbeat of the Research Triangle — home to Duke University, Research Triangle Park, and a thriving food and arts scene. Durham\'s diverse community of researchers, entrepreneurs, and multigenerational families all share a need to plan ahead. Pre-need insurance gives Durham families confidence that their wishes will be honored and their loved ones won\'t face unexpected financial burdens.',
    highlights: [
      'Serving families throughout Durham, from Duke\'s East Campus to South Durham and RTP',
      'Experienced with pre-need planning for Duke Health employees and university-connected families',
      'Familiar with Durham\'s diverse cultural traditions and memorial preferences',
    ],
    faq: [
      { question: 'Does Duane serve families in Durham, NC?', answer: 'Yes. Durham is a core part of Duane\'s Triangle service area. He works with families across the city — from Brightleaf Square to Southpoint to the Eno River neighborhoods.' },
      { question: 'How much does a funeral cost in Durham?', answer: 'When all expenses are counted — funeral home fees, burial vault, cemetery plot, opening and closing fees, and grave marker — the true cost of a funeral in the Durham area typically ranges from $12,000 to $20,000. With a pre-need plan\'s Inflation Proof Guarantee, the funeral home accepts the plan as payment in full for covered services — so your family is never left covering those costs under pressure.' },
      { question: 'Can Duane coordinate with Durham funeral homes?', answer: 'Absolutely. Duane has relationships with respected funeral homes throughout Durham County and can coordinate your plan with the provider of your choice.' },
    ],
  },
  {
    name: 'Chapel Hill',
    slug: 'chapel-hill',
    county: 'Orange',
    state: 'NC',
    region: 'Triangle',
    description: 'Chapel Hill is a classic Southern college town centered around the University of North Carolina, with tree-lined streets, local bookshops, and the world-class UNC Health medical center. Families here — whether longtime Tar Heel residents, UNC faculty, or retirees drawn by the town\'s charm — value thoughtful planning. Pre-need insurance lets Chapel Hill families document their wishes and protect loved ones from financial stress.',
    highlights: [
      'Serving Chapel Hill, Carrboro, Hillsborough, and all of Orange County',
      'Experienced with pre-need planning for UNC Health employees and university families',
      'Understanding of Chapel Hill\'s progressive community values and memorial traditions',
    ],
    faq: [
      { question: 'Does Duane work with families in Chapel Hill?', answer: 'Yes. Duane serves families throughout Chapel Hill, Carrboro, and Orange County. He\'s available for phone consultations or in-person meetings at a location convenient to you.' },
      { question: 'Is pre-need insurance common among Chapel Hill retirees?', answer: 'Very common. Many retirees in Chapel Hill and the surrounding area use pre-need planning to ensure their wishes are documented and their adult children — who may live out of state — aren\'t burdened with arrangements.' },
      { question: 'Can I use pre-need insurance if I want a non-traditional service?', answer: 'Absolutely. Whether you want a celebration of life at the Ackland, a simple cremation, or a green burial, your pre-need plan documents exactly what you want. Duane helps families of all backgrounds plan services that reflect their values.' },
    ],
  },
  {
    name: 'Fayetteville',
    slug: 'fayetteville',
    county: 'Cumberland',
    state: 'NC',
    region: 'Fayetteville & Sandhills',
    description: 'Fayetteville is defined by its deep military roots — home to Fort Liberty (formerly Fort Bragg), one of the largest military installations in the world. The Airborne & Special Operations Museum honors the city\'s legacy, while the Cape Fear River and revitalized downtown anchor civilian life. With a large population of active-duty families, veterans, and retirees, pre-need planning is essential for ensuring VA benefits are properly supplemented and family wishes are clearly documented.',
    highlights: [
      'Specialized in military family pre-need planning near Fort Liberty',
      'Experienced with supplementing VA burial benefits to cover full funeral costs',
      'Serving Fayetteville, Fort Liberty, Spring Lake, Hope Mills, and all of Cumberland County',
    ],
    faq: [
      { question: 'Does Duane serve military families near Fort Liberty?', answer: 'Yes. Duane has extensive experience working with military families in the Fayetteville area. He understands VA burial benefits and helps families bridge the gap between what the VA covers and actual funeral costs.' },
      { question: 'How does pre-need insurance work with VA burial benefits?', answer: 'VA benefits cover only $300–$2,000 of funeral costs, leaving families to cover the rest. Pre-need insurance supplements VA benefits so your family faces zero out-of-pocket costs. Duane can walk you through exactly how the two work together.' },
      { question: 'Are pre-need plans portable if I get reassigned from Fort Liberty?', answer: 'Yes. Pre-need insurance policies are fully portable. If you PCS to another installation, your coverage and documented wishes travel with you. Duane helps many military families who value this flexibility.' },
    ],
  },
  {
    name: 'Clayton',
    slug: 'clayton',
    county: 'Johnston',
    state: 'NC',
    region: 'Johnston County',
    description: 'Clayton is one of the fastest-growing towns in North Carolina, attracting young families with its revitalized downtown, new neighborhoods, and easy commute to Raleigh. As the community expands rapidly, many families are putting down roots and thinking about long-term planning for the first time. Pre-need insurance is a smart move for Clayton families who want to protect against rising costs with an Inflation Proof Guarantee — especially while the area continues to grow.',
    highlights: [
      'Serving Clayton\'s rapidly growing community of young families and new homeowners',
      'Convenient for families who commute to Raleigh but call Clayton home',
      'Familiar with Johnston County funeral homes and local providers',
    ],
    faq: [
      { question: 'Does Duane serve Clayton, NC?', answer: 'Yes. Clayton is part of Duane\'s core Triangle-area service territory. He works with families throughout Clayton and the surrounding Johnston County communities.' },
      { question: 'I\'m young — is it too early for pre-need insurance?', answer: 'Not at all. Younger applicants qualify for the lowest premiums and secure coverage with an Inflation Proof Guarantee on covered services. Many young families in Clayton use pre-need planning as part of their overall financial preparedness — alongside life insurance and a will.' },
      { question: 'What funeral homes serve the Clayton area?', answer: 'Several respected funeral homes serve Clayton and Johnston County. Duane can help you evaluate your options and coordinate a plan with the provider that best fits your family.' },
    ],
  },
  {
    name: 'Smithfield',
    slug: 'smithfield',
    county: 'Johnston',
    state: 'NC',
    region: 'Johnston County',
    description: 'As the county seat of Johnston County, Smithfield blends rural charm with small-town pride. Home to the Ava Gardner Museum and popular outlet shopping along I-95, Smithfield is a community where families have deep generational ties to the land. Pre-need planning fits naturally here — it\'s a practical, no-nonsense way to ensure your family is taken care of and your wishes are respected.',
    highlights: [
      'Serving Smithfield, Selma, Four Oaks, and all of Johnston County',
      'Understanding of rural NC funeral traditions and family-centered services',
      'Experienced with Medicaid-exempt pre-need planning for families on fixed incomes',
    ],
    faq: [
      { question: 'Does Duane serve Smithfield and Selma?', answer: 'Yes. Duane works with families throughout Smithfield, Selma, and the broader Johnston County area. He\'s available by phone or for in-person meetings at your convenience.' },
      { question: 'Does pre-need insurance affect Medicaid eligibility?', answer: 'In North Carolina, irrevocable pre-need funeral contracts are generally exempt from Medicaid asset calculations. This is especially important for families on fixed incomes who want to set aside funeral funds without jeopardizing benefits.' },
      { question: 'Can I plan a traditional service through pre-need insurance?', answer: 'Absolutely. Whether you want a traditional church service, a graveside ceremony, or a family gathering at home, your pre-need plan documents every detail. Duane helps Smithfield families plan services that honor their traditions.' },
    ],
  },
  {
    name: 'Sanford',
    slug: 'sanford',
    county: 'Lee',
    state: 'NC',
    region: 'Fayetteville & Sandhills',
    description: 'Known as the "Brick Capital of the USA," Sanford carries a rich heritage in pottery and brick-making that reflects the hardworking spirit of its residents. Located between Raleigh and Greensboro along US-1, Sanford is a growing community where families value practicality and looking out for one another. Pre-need insurance gives Sanford families a straightforward way to protect their loved ones from unexpected funeral costs and difficult last-minute decisions.',
    highlights: [
      'Serving Sanford, Broadway, and all of Lee County',
      'Convenient location between Raleigh and the Triad for families across central NC',
      'Practical, no-pressure approach that fits Sanford\'s community values',
    ],
    faq: [
      { question: 'Does Duane serve families in Sanford, NC?', answer: 'Yes. Duane works with families in Sanford and throughout Lee County. He\'s happy to meet by phone or in person at a time and place that works for you.' },
      { question: 'How far in advance should I start pre-need planning?', answer: 'There\'s no wrong time to start. Many Sanford families begin planning in their 50s or 60s, but younger families benefit from lower premiums and an Inflation Proof Guarantee that protects against rising costs. The sooner you plan, the more you save.' },
      { question: 'What funeral costs should Sanford families expect?', answer: 'The all-in cost of a traditional burial in the Sanford area — including funeral home fees, burial vault, cemetery plot, opening and closing fees, and a grave marker — typically ranges from $12,000 to $18,000. With a pre-need plan\'s Inflation Proof Guarantee, the funeral home accepts the plan as payment in full for covered services — so your family is never left covering those costs under pressure.' },
    ],
  },
  // ── North Carolina — Triangle additions ──
  { name: 'Hillsborough', slug: 'hillsborough', county: 'Orange', state: 'NC', region: 'Triangle' },
  { name: 'Carrboro', slug: 'carrboro', county: 'Orange', state: 'NC', region: 'Triangle' },
  {
    name: 'Pittsboro',
    slug: 'pittsboro',
    county: 'Chatham',
    state: 'NC',
    region: 'Triangle',
    description: 'Pittsboro is the county seat of Chatham County — a growing but still distinctly community-minded town at the meeting point of the Triangle\'s expansion and the state\'s agricultural heartland. With new residential developments like Chatham Park bringing new neighbors alongside families who have been here for generations, Pittsboro has a character that\'s hard to find anywhere else. Families here can plan ahead with a genuine local connection — their pre-need plan ties directly to a respected, independent, family-owned funeral home right in their community, not a corporate chain two counties over.',
    highlights: [
      'Pittsboro families can pre-plan with a respected independent, family-owned funeral home — not a corporate chain',
      'Serving Pittsboro, Moncure, Bynum, Bennett, and all of central Chatham County',
      'Families in parts of Apex, Cary, and Chapel Hill that are closer to Pittsboro than their nearest funeral home may also benefit — call Duane to discuss',
    ],
    faq: [
      { question: 'Does Duane serve families in Pittsboro and Chatham County?', answer: 'Yes. Duane actively serves Pittsboro and the greater Chatham County area. Families here have access to something increasingly rare — the ability to pre-plan with an independent, family-owned funeral home right in their own community.' },
      { question: 'What makes planning in Pittsboro different from other areas?', answer: 'Chatham County families can pre-plan with a respected independent funeral home rather than a corporate-owned chain. That means a more personal experience, genuine community relationships, and a plan with an Inflation Proof Guarantee at a provider your family already knows and trusts.' },
      { question: 'My address is in Apex or Cary but I\'m actually closer to Pittsboro — can Duane help me?', answer: 'Absolutely. Some families on the western edge of Wake County or in the Chapel Hill area find that Pittsboro is actually more convenient. Duane can help you evaluate your options — including pre-planning with a Chatham County funeral home if that\'s the right fit for your family.' },
    ],
  },
  {
    name: 'Siler City',
    slug: 'siler-city',
    county: 'Chatham',
    state: 'NC',
    region: 'Triangle',
    description: 'Siler City is a proud, tight-knit community in western Chatham County with deep agricultural roots and a strong sense of local identity. Known for its historic main street, its diverse population, and the close community bonds that come with generations of neighbors looking out for one another, Siler City is a place where families take care of each other. Many Siler City families choose to pre-plan with the independent, family-owned funeral home in nearby Pittsboro — just 14 miles east — rather than travel to a corporate chain in a larger city.',
    highlights: [
      'Serving Siler City, Silk Hope, Bonlee, and western Chatham County',
      'Siler City families are just 14 miles from a respected independent, family-owned funeral home in Pittsboro — pre-need planning protects against rising costs with an Inflation Proof Guarantee',
      'No obligation, no pressure — Duane\'s approach respects the values and traditions of Chatham County communities',
    ],
    faq: [
      { question: 'Does Duane serve Siler City?', answer: 'Yes. Duane serves Siler City and western Chatham County. He\'s available by phone or in person at a time and place convenient to you.' },
      { question: 'Where do most Siler City families plan their funeral services?', answer: 'Many Siler City families choose the independent, family-owned funeral home in nearby Pittsboro — just 14 miles away. Pre-need planning through Duane provides an Inflation Proof Guarantee at that provider, so the funeral home accepts the plan as payment in full for covered services and your family faces no surprises.' },
      { question: 'How do I get started with pre-need planning in Siler City?', answer: `Just call Duane at ${PHONE}. He'll have a short conversation to understand your wishes, then walk you through your options with no pressure and no obligation. Most plans are completed within two weeks.` },
    ],
  },
  { name: 'Mebane', slug: 'mebane', county: 'Alamance', state: 'NC', region: 'Triangle' },
  // ── North Carolina — Johnston County additions ──
  { name: 'Selma', slug: 'selma', county: 'Johnston', state: 'NC', region: 'Johnston County' },
  { name: 'Four Oaks', slug: 'four-oaks', county: 'Johnston', state: 'NC', region: 'Johnston County' },
  { name: 'Benson', slug: 'benson', county: 'Johnston', state: 'NC', region: 'Johnston County' },
  // ── North Carolina — Harnett County ──
  { name: 'Lillington', slug: 'lillington', county: 'Harnett', state: 'NC', region: 'Harnett County' },
  { name: 'Dunn', slug: 'dunn', county: 'Harnett', state: 'NC', region: 'Harnett County' },
  { name: 'Erwin', slug: 'erwin', county: 'Harnett', state: 'NC', region: 'Harnett County' },
  { name: 'Angier', slug: 'angier', county: 'Harnett', state: 'NC', region: 'Harnett County' },
  // ── North Carolina — Granville, Vance & Franklin Counties ──
  { name: 'Henderson', slug: 'henderson', county: 'Vance', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Oxford', slug: 'oxford', county: 'Granville', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Louisburg', slug: 'louisburg', county: 'Franklin', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Creedmoor', slug: 'creedmoor', county: 'Granville', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Franklinton', slug: 'franklinton', county: 'Franklin', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Butner', slug: 'butner', county: 'Granville', state: 'NC', region: 'Granville, Vance & Franklin' },
  { name: 'Youngsville', slug: 'youngsville', county: 'Franklin', state: 'NC', region: 'Granville, Vance & Franklin' },
  // ── North Carolina — Nash, Wilson & Wayne Counties ──
  { name: 'Rocky Mount', slug: 'rocky-mount', county: 'Nash', state: 'NC', region: 'Eastern NC' },
  { name: 'Wilson', slug: 'wilson', county: 'Wilson', state: 'NC', region: 'Eastern NC' },
  { name: 'Goldsboro', slug: 'goldsboro', county: 'Wayne', state: 'NC', region: 'Eastern NC' },
  { name: 'Nashville', slug: 'nashville', county: 'Nash', state: 'NC', region: 'Eastern NC' },
  // ── North Carolina — Fayetteville & Sandhills additions ──
  { name: 'Southern Pines', slug: 'southern-pines', county: 'Moore', state: 'NC', region: 'Fayetteville & Sandhills' },
  { name: 'Pinehurst', slug: 'pinehurst', county: 'Moore', state: 'NC', region: 'Fayetteville & Sandhills' },
  { name: 'Aberdeen', slug: 'aberdeen', county: 'Moore', state: 'NC', region: 'Fayetteville & Sandhills' },
  { name: 'Raeford', slug: 'raeford', county: 'Hoke', state: 'NC', region: 'Fayetteville & Sandhills' },
  { name: 'Spring Lake', slug: 'spring-lake', county: 'Cumberland', state: 'NC', region: 'Fayetteville & Sandhills' },
  // ── North Carolina — Alamance & Randolph Counties ──
  { name: 'Burlington', slug: 'burlington', county: 'Alamance', state: 'NC', region: 'Alamance & Randolph' },
  { name: 'Asheboro', slug: 'asheboro', county: 'Randolph', state: 'NC', region: 'Alamance & Randolph' },
  // ── North Carolina — Person & Sampson Counties ──
  { name: 'Roxboro', slug: 'roxboro', county: 'Person', state: 'NC', region: 'Northern NC' },
  { name: 'Lumberton', slug: 'lumberton', county: 'Robeson', state: 'NC', region: 'Eastern NC' },
  { name: 'Clinton', slug: 'clinton', county: 'Sampson', state: 'NC', region: 'Eastern NC' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'We Talk',
    description: 'Call Duane at (919) 822-2010. He\'ll listen to your wishes, answer your questions, and explain your options. No pressure, no obligation. Most calls last about 15 minutes.',
  },
  {
    step: 2,
    title: 'We Plan Together',
    description: 'Duane creates a personalized plan that covers every detail — from service type to music to flowers. You choose exactly what matters to you, and he handles the paperwork.',
  },
  {
    step: 3,
    title: 'Your Family Is Protected',
    description: 'Your wishes are documented, your costs are locked in at today\'s prices, and your family will never have to guess what you wanted. That\'s peace of mind you can\'t put a price on.',
  },
];

export const BENEFITS = [
  {
    title: 'Protect Your Family from Difficult Decisions',
    description: 'When families have to plan a funeral with no guidance, they face dozens of stressful decisions during the worst week of their lives. Pre-planning removes that burden entirely.',
    icon: 'heart',
  },
  {
    title: 'Protection Against Rising Costs',
    description: 'Funeral costs have risen 40% in the last decade. With an Inflation Proof Guarantee, the funeral home accepts your pre-need plan as payment in full for covered services — no matter when the need arises.',
    icon: 'shield',
  },
  {
    title: 'Ensure Your Wishes Are Honored',
    description: 'From the hymns you love to the flowers you want, every detail is documented. Your celebration of life will reflect exactly who you are — because you planned it yourself.',
    icon: 'star',
  },
];
