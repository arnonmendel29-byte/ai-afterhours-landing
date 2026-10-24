import { leadFormHref } from '../leadForm';
import { LeadCtaStrip } from '../SiteLeadCtas';
import { BrandLogo } from '../BrandLogo';
import { SiteHeader } from '../SiteHeader';
import { siteConfig } from '../siteConfig';
import { applyDocumentMeta } from '../seo/documentMeta';
import { getSeoPage } from '../seo/pages';
import {
  buildArticleJsonLd,
  type ArticleBlock,
  type ArticleLink,
  type SeoArticle,
} from '../articles/seoArticles';
import { Fragment, useEffect, type ReactNode } from 'react';
import './SeoArticlePage.css';

function linkedText(text: string, links: ArticleLink[] = []): ReactNode {
  if (links.length === 0) return text;
  const nodes: ReactNode[] = [];
  let rest = text;
  links.forEach((link, index) => {
    const at = rest.indexOf(link.phrase);
    if (at < 0) return;
    nodes.push(rest.slice(0, at));
    nodes.push(
      <a href={link.href} key={`${link.href}-${index}`}>
        {link.phrase}
      </a>,
    );
    rest = rest.slice(at + link.phrase.length);
  });
  nodes.push(rest);
  return nodes;
}

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === 'h2') return <h2 key={index}>{block.text}</h2>;
    if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>;
    if (block.type === 'ul') {
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }
    if (block.type === 'figure') {
      return (
        <figure className="seo-article__figure" key={block.src}>
          <img src={block.src} alt={block.alt} width={block.width} height={block.height} loading="lazy" decoding="async" />
        </figure>
      );
    }
    return <p key={index}>{linkedText(block.text, block.links)}</p>;
  });
}

export function SeoArticlePage({ article }: { article: SeoArticle }) {
  useEffect(() => {
    const page = getSeoPage(article.path);
    applyDocumentMeta({
      page: { ...page, ogType: 'article' },
      ogImage: article.hero.src,
      jsonLd: buildArticleJsonLd(article),
    });
  }, [article]);

  const published = new Date(`${article.datePublished}T00:00:00`).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="site-shell seo-article-page">
      <a className="skip-link" href="#article-main">
        דילוג לתוכן
      </a>
      <SiteHeader className="site-header--standalone" currentPath={article.path} />
      <main id="article-main" tabIndex={-1}>
        <article className="seo-article">
          <header className="seo-article__header">
            <h1>{article.h1}</h1>
            <p className="seo-article__byline">
              <span>{article.author}</span>
              <time dateTime={article.datePublished}>{published}</time>
            </p>
            <figure className="seo-article__hero">
              <img
                src={article.hero.src}
                alt={article.hero.alt}
                width={article.hero.width}
                height={article.hero.height}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
          </header>
          <div className="seo-article__body">
            <ArticleBlocks blocks={article.blocks} />
            <section aria-labelledby="article-faq-title">
              <h2 id="article-faq-title">שאלות נפוצות</h2>
              {article.faqs.map((item) => (
                <Fragment key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </Fragment>
              ))}
            </section>
            <nav className="seo-article__related" aria-label="כתבות ומדריכים נוספים">
              {article.related.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <LeadCtaStrip align="start" className="seo-article__cta" formHref={leadFormHref(article.path)} />
          </div>
        </article>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <BrandLogo href="/" compact />
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. <a href="/">חזרה לעמוד הבית</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
