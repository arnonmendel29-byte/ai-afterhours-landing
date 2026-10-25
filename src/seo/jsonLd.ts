import { buildArticleJsonLd, seoArticles } from '../articles/seoArticles';
import {
  buildAboutPageJsonLd,
  buildBaseJsonLd,
  buildHomeJsonLd,
  buildServicePageJsonLdForPath,
  serviceNames,
} from './pages';

/** JSON-LD לכל עמוד — אותו מקור שמשמש את העמודים בזמן ריצה, עבור ה-HTML הסטטי שנוצר ב-build */
export function buildJsonLdForPath(path: string): object {
  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/') return buildHomeJsonLd();
  if (normalized === '/about') return buildAboutPageJsonLd();

  const article = seoArticles.find((item) => item.path === normalized);
  if (article) return buildArticleJsonLd(article);

  if (serviceNames[normalized]) return buildServicePageJsonLdForPath(normalized);

  return buildBaseJsonLd();
}
