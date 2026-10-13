import { AccessibilityWidget } from './accessibility/AccessibilityWidget';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { AiCallBotsPage } from './pages/AiCallBotsPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { LeadWarmingPage } from './pages/LeadWarmingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OutboundCallBotPage } from './pages/OutboundCallBotPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { PageLoader } from './PageLoader';
import LandingApp from './LandingApp';

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path.toLowerCase();
}

function RouteBody() {
  const path = normalizePath(window.location.pathname);

  if (path === '/instant-lead-response') {
    window.history.replaceState(null, '', '/lead-warming');
    return <LeadWarmingPage />;
  }
  if (path === '/') {
    return <LandingApp />;
  }
  if (path === '/privacy-policy') {
    return <PrivacyPolicyPage />;
  }
  if (path === '/accessibility') {
    return <AccessibilityPage />;
  }
  if (path === '/cookie-policy') {
    return <CookiePolicyPage />;
  }
  if (path === '/lead-warming') {
    return <LeadWarmingPage />;
  }
  if (path === '/ai-call-bots') {
    return <AiCallBotsPage />;
  }
  if (path === '/outbound-call-bot') {
    return <OutboundCallBotPage />;
  }

  return <NotFoundPage />;
}

export function AppRouter() {
  return (
    <PageLoader>
      <RouteBody />
      <AccessibilityWidget />
    </PageLoader>
  );
}
