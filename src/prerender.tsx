/**
 * נקודת כניסה ל-build בלבד (Node): מרנדרת כל עמוד ל-HTML סטטי,
 * כדי שהתוכן יהיה זמין לסורקים כבר בתגובת השרת הראשונה.
 * בדפדפן createRoot מחליף את ה-HTML הזה ברינדור רגיל.
 */
import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import LandingApp from './LandingApp';
import { PageLoader } from './PageLoader';
import { AboutPage } from './pages/AboutPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { AiCallBotsPage } from './pages/AiCallBotsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { HowToGetMoreLeadsPage } from './pages/HowToGetMoreLeadsPage';
import { ImproveSalesProcessPage } from './pages/ImproveSalesProcessPage';
import { LeadWarmingPage } from './pages/LeadWarmingPage';
import { OutboundCallBotPage } from './pages/OutboundCallBotPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export { seoArticles } from './articles/seoArticles';
export { buildJsonLdForPath } from './seo/jsonLd';
export { absoluteUrl, defaultOgImagePath } from './seo/pages';

const pageComponents: Record<string, ComponentType> = {
  '/': LandingApp,
  '/about': AboutPage,
  '/lead-warming': LeadWarmingPage,
  '/outbound-call-bot': OutboundCallBotPage,
  '/ai-call-bots': AiCallBotsPage,
  '/how-to-get-more-leads': HowToGetMoreLeadsPage,
  '/improve-sales-process': ImproveSalesProcessPage,
  '/privacy-policy': PrivacyPolicyPage,
  '/accessibility': AccessibilityPage,
  '/cookie-policy': CookiePolicyPage,
};

export function renderPage(path: string): string {
  const Page = pageComponents[path];
  if (!Page) {
    throw new Error(`No prerender component registered for ${path}`);
  }
  return renderToString(
    <PageLoader>
      <Page />
    </PageLoader>,
  );
}
