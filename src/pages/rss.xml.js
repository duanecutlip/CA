import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  let strapiItems = [];
  try {
    const { getArticles } = await import('../lib/strapi');
    const articles = await getArticles();
    if (articles?.length) {
      strapiItems = articles.map((a) => ({
        title: a.title,
        description: a.description,
        pubDate: new Date(a.pubDate),
        link: `/blog/${a.slug}/`,
      }));
    }
  } catch {}

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: strapiItems,
  });
}
