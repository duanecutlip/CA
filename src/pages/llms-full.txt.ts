import type { APIRoute } from 'astro';
import { PHONE, FAQ_ITEMS, SERVICE_AREAS, TESTIMONIALS, HOW_IT_WORKS_STEPS, SITE_URL } from '../consts';

export const GET: APIRoute = async () => {
  const sections: string[] = [];

  sections.push(`# Cutlip Associates, LLC — Full Content
> Pre-Need Insurance & Advance Funeral Planning — North Carolina
> Phone: ${PHONE} | Website: ${SITE_URL}
`);

  // About
  sections.push(`## About Duane Cutlip

Duane Cutlip is a Licensed Preneed Funeral Director in North Carolina with nearly 20 years of experience. He specializes in helping families make advance funeral arrangements — pre-need insurance that locks in today's prices and ensures wishes are honored exactly as planned.

Duane works closely with Donaldson Funeral Home & Crematory in Pittsboro, NC and other respected funeral homes throughout NC. He is an active member of the National Funeral Directors Association (NFDA). Cutlip Associates, LLC was founded in 2003. His 

He lives in Wendell, NC with his wife Angie and their two daughters. He is active in his Baptist church and volunteers as an ARRL amateur radio volunteer examiner, reflecting his deep commitment to community service. Every call goes directly to Duane — no call center, no pressure, no obligation.

### Technology & Innovation
Before entering the preneed industry, Duane owned a computer shop where he built and sold custom PCs, ran dual T2 lines, and self-hosted mail servers he managed himself. He still maintains an extensive home lab setup. That hands-on tech background, combined with professional bookkeeping and accounting experience, gives him a rare dual perspective in the funeral industry.

Today, Duane runs his business on a modern AI-powered tech stack — CRM, automated workflows, and a website built with cutting-edge tools (Astro 5, headless CMS, structured data, AI discovery endpoints). He helps funeral homes modernize their operations: transitioning from paper systems to CRM platforms, implementing digital marketing strategies, streamlining bookkeeping, and adopting AI-powered tools. In his mid/late 50s, Duane bridges the generational tech gap — he speaks the language of funeral home owners who've been doing things the same way for decades, while understanding the modern tools that can transform their business.
`);

  // Services
  sections.push(`## Services

### Pre-Need Funeral Insurance
Pre-need insurance is a policy specifically designed to cover funeral and burial expenses. Unlike regular life insurance, pre-need funds are earmarked for funeral costs and go directly to the funeral home — not through probate. The average funeral in North Carolina costs $7,848 or more. Most families invest between $3,000 and $15,000.

### Celebration of Life Planning
Personalized celebrations that reflect the unique life of the person being honored. Pre-need insurance ensures every detail is covered — from venue to music to personal touches.

### Military Family Pre-Need Planning
VA burial benefits cover only $300–$2,000 of funeral costs. Pre-need insurance bridges the gap, supplementing VA benefits to ensure families aren't burdened with unexpected expenses.

### Funeral Home Staffing (B2B)
Licensed funeral director staffing for independently-owned NC funeral homes. Overflow coverage, vacation relief, emergency staffing, and pre-need counseling.

### Pricing
Most families invest between $3,000 and $15,000 in pre-need insurance. The exact amount depends on the type of service, casket or urn selection, and personal preferences. Duane helps each family find a plan that fits their budget.

## Pre-Need Insurance vs Other Options

| Feature | Pre-Need Insurance | Final Expense Insurance | Traditional Life Insurance |
|---|---|---|---|
| Purpose | Specifically for funeral costs | General end-of-life expenses | Income replacement / general |
| Funds go to | Funeral home directly | Beneficiary (may or may not use for funeral) | Beneficiary |
| Price lock | Yes — locks in today's funeral prices | No price lock | No price lock |
| Probate | Bypasses probate | May go through probate | May go through probate |
| Medicaid | Generally exempt (irrevocable trust) | Counted as asset | Counted as asset |
| Customization | Plan every detail in advance | No funeral planning included | No funeral planning included |

## What to Expect When You Call

1. **The Call (~15 minutes)**: Call Duane at ${PHONE}. He answers personally. He'll listen to what matters to you, answer your questions honestly, and explain your options. No pressure, no obligation.
2. **The Planning Session**: Duane creates a personalized plan covering every detail — service type, music, flowers, readings, and any personal touches. You decide exactly what matters to you.
3. **Protection for Your Family**: Your wishes are documented, costs are locked in at today's prices, and your family never has to guess what you wanted. The policy pays the funeral home directly — no probate, no delays.
`);

  // How It Works
  sections.push(`## How It Works
`);
  for (const step of HOW_IT_WORKS_STEPS) {
    sections.push(`### Step ${step.step}: ${step.title}
${step.description}
`);
  }

  // FAQ
  sections.push(`## Frequently Asked Questions
`);
  for (const item of FAQ_ITEMS) {
    sections.push(`### ${item.question}
${item.answer}
`);
  }

  // Service Areas
  const ncAreas = SERVICE_AREAS.filter((a) => !a.state || a.state === 'NC');

  sections.push(`## Service Areas

### North Carolina
Duane is licensed in North Carolina and serves families statewide, with a focus on Wake County and the Triangle area:
`);
  for (const area of ncAreas) {
    sections.push(`- **${area.name}**, ${area.county} County, NC`);
  }
  sections.push('');

  // Testimonials
  sections.push(`## What Families Say
`);
  for (const t of TESTIMONIALS) {
    sections.push(`> "${t.quote}"
> — ${t.name}, ${t.relationship}, ${t.city}
`);
  }

  // Blog (from Strapi)
  try {
    const { getArticles } = await import('../lib/strapi');
    const articles = await getArticles();
    if (articles?.length) {
      sections.push(`## Blog Articles
`);
      for (const a of articles) {
        sections.push(`### ${a.title}
*Published: ${a.pubDate}*

${a.body}

---
`);
      }
    }
  } catch {}

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
