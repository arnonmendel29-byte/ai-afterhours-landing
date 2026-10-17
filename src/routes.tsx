import { PageLoader } from './PageLoader';
import LandingApp from './LandingApp';
import { lazy, Suspense } from 'react';

const AccessibilityWidget = lazy(() =>
  import('./accessibility/AccessibilityWidget').then((module) => ({
    default: module.AccessibilityWidget,
  })),
);

const AccessibilityPage = lazy(() =>
  import('./pages/AccessibilityPage').then((module) => ({
    default: module.AccessibilityPage,
  })),
);
const AiCallBotsPage = lazy(() =>
  import('./pages/AiCallBotsPage').then((module) => ({
    default: module.AiCallBotsPage,
  })),
);
const CookiePolicyPage = lazy(() =>
  import('./pages/CookiePolicyPage').then((module) => ({
    default: module.CookiePolicyPage,
  })),
);
const LeadWarmingPage = lazy(() =>
  import('./pages/LeadWarmingPage').then((module) => ({
    default: module.LeadWarmingPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);
const OutboundCallBotPage = lazy(() =>
  import('./pages/OutboundCallBotPage').then((module) => ({
    default: module.OutboundCallBotPage,
  })),
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((module) => ({
    default: module.PrivacyPolicyPage,
  })),
);

function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '') || '/';
  return path.toLowerCase();
}

function RouteFallback() {
  return <div className="route-suspense" aria-hidden="true" />;
}

function RouteBody() {
  const path = normalizePath(window.location.pathname);

  if (path === '/instant-lead-response') {
    window.history.replaceState(null, '', '/lead-warming');
    return (
      <Suspense fallback={<RouteFallback />}>
        <LeadWarmingPage />
      </Suspense>
    );
  }
  if (path === '/') {
    return <LandingApp />;
  }
  if (path === '/privacy-policy') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <PrivacyPolicyPage />
      </Suspense>
    );
  }
  if (path === '/accessibility') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AccessibilityPage />
      </Suspense>
    );
  }
  if (path === '/cookie-policy') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <CookiePolicyPage />
      </Suspense>
    );
  }
  if (path === '/lead-warming') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <LeadWarmingPage />
      </Suspense>
    );
  }
  if (path === '/ai-call-bots') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AiCallBotsPage />
      </Suspense>
    );
  }
  if (path === '/outbound-call-bot') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <OutboundCallBotPage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<RouteFallback />}>
      <NotFoundPage />
    </Suspense>
  );
}

export function AppRouter() {
  return (
    <PageLoader>
      <RouteBody />
      <Suspense fallback={null}>
        <AccessibilityWidget />
      </Suspense>
    </PageLoader>
  );
}
