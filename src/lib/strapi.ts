const STRAPI_URL = import.meta.env.STRAPI_URL || 'https://cms.cutlipassociates.com';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchStrapi<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url.toString(), { headers });

  if (!res.ok) {
    throw new Error(
      `Strapi fetch failed: ${res.status} ${res.statusText} for ${endpoint}`,
    );
  }

  const json = await res.json();
  return json as T;
}

// ============================================
// Media
// ============================================

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// ============================================
// Collection types
// ============================================

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  pubDate: string;
  updatedDate?: string;
  heroImage?: StrapiMedia;
  metaTitle?: string;
  metaDescription?: string;
  seoKeywords?: string;
}

export async function getArticles(): Promise<StrapiArticle[]> {
  const res = await fetchStrapi<StrapiResponse<StrapiArticle[]>>(
    '/articles',
    { 'populate': '*', 'sort[0]': 'pubDate:desc', 'pagination[pageSize]': '100', 'status': 'published' },
  );
  return res.data;
}

export async function getArticleBySlug(
  slug: string,
): Promise<StrapiArticle | null> {
  const res = await fetchStrapi<StrapiResponse<StrapiArticle[]>>(
    '/articles',
    { 'populate': '*', 'filters[slug][$eq]': slug, 'status': 'published' },
  );
  return res.data[0] ?? null;
}

export interface StrapiFaqItem {
  id: number;
  documentId: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  category: string;
  sortOrder: number;
}

export async function getFaqItems(): Promise<StrapiFaqItem[]> {
  const res = await fetchStrapi<StrapiResponse<StrapiFaqItem[]>>(
    '/faq-items',
    { 'sort[0]': 'sortOrder:asc', 'pagination[pageSize]': '100' },
  );
  return res.data;
}

export interface StrapiTestimonial {
  id: number;
  documentId: string;
  quote: string;
  name: string;
  relationship: string;
  city: string;
  sortOrder: number;
}

export async function getTestimonials(): Promise<StrapiTestimonial[]> {
  const res = await fetchStrapi<StrapiResponse<StrapiTestimonial[]>>(
    '/testimonials',
    { 'sort[0]': 'sortOrder:asc', 'pagination[pageSize]': '100' },
  );
  return res.data;
}

export interface StrapiServiceArea {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  county: string;
  description: string;
  body: string;
  sortOrder: number;
}

export async function getServiceAreas(): Promise<StrapiServiceArea[]> {
  const res = await fetchStrapi<StrapiResponse<StrapiServiceArea[]>>(
    '/service-areas',
    { 'sort[0]': 'sortOrder:asc', 'pagination[pageSize]': '100' },
  );
  return res.data;
}

export async function getServiceAreaBySlug(
  slug: string,
): Promise<StrapiServiceArea | null> {
  const res = await fetchStrapi<StrapiResponse<StrapiServiceArea[]>>(
    '/service-areas',
    { 'populate': '*', 'filters[slug][$eq]': slug },
  );
  return res.data[0] ?? null;
}

export interface StrapiGlossaryTerm {
  id: number;
  documentId: string;
  term: string;
  definition: string;
  sortOrder: number;
}

export async function getGlossaryTerms(): Promise<StrapiGlossaryTerm[]> {
  const res = await fetchStrapi<StrapiResponse<StrapiGlossaryTerm[]>>(
    '/glossary-terms',
    { 'sort[0]': 'sortOrder:asc', 'pagination[pageSize]': '100' },
  );
  return res.data;
}

// ============================================
// Single types
// ============================================

export interface StrapiHomepage {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: StrapiMedia;
  metaTitle?: string;
  metaDescription?: string;
}

export async function getHomepage(): Promise<StrapiHomepage> {
  const res = await fetchStrapi<StrapiResponse<StrapiHomepage>>('/homepage', { 'populate': '*' });
  return res.data;
}

export interface StrapiAboutPage {
  id: number;
  documentId: string;
  bio: string;
  personalSection?: string;
  credentials?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export async function getAboutPage(): Promise<StrapiAboutPage> {
  const res = await fetchStrapi<StrapiResponse<StrapiAboutPage>>('/about-page');
  return res.data;
}

export interface StrapiSiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  phone?: string;
  email?: string;
  address?: string;
  license?: string;
  navLinks?: { label: string; href: string }[];
  footerLinks?: {
    resources: { label: string; href: string }[];
    company: { label: string; href: string }[];
    legal: { label: string; href: string }[];
  };
}

export async function getSiteSettings(): Promise<StrapiSiteSettings> {
  const res = await fetchStrapi<StrapiResponse<StrapiSiteSettings>>('/site-setting');
  return res.data;
}

export interface StrapiSeo {
  id: number;
  documentId: string;
  organizationName?: string;
  organizationUrl?: string;
  defaultOgImage?: StrapiMedia;
}

export async function getSeo(): Promise<StrapiSeo> {
  const res = await fetchStrapi<StrapiResponse<StrapiSeo>>('/seo', { 'populate': '*' });
  return res.data;
}
