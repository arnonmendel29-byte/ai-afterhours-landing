import { PageLoader } from './PageLoader';
import LandingApp from './LandingApp';
import { lazy, Suspense } from 'react';

const AccessibilityWidget = lazy(() =>
  import('./accessibility/AccessibilityWidget').then((module) => ({
    default: module.AccessibilityWidget,
  })),
);

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({
    default: module.AboutPage,
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
const HowToGetMoreLeadsPage = lazy(() =>
  import('./pages/HowToGetMoreLeadsPage').then((module) => ({
    default: module.HowToGetMoreLeadsPage,
  })),
);
const ImproveSalesProcessPage = lazy(() =>
  import('./pages/ImproveSalesProcessPage').then((module) => ({
    default: module.ImproveSalesProcessPage,
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
  if (path === '/about') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AboutPage />
      </Suspense>
    );
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
  if (path === '/how-to-get-more-leads') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <HowToGetMoreLeadsPage />
      </Suspense>
    );
  }
  if (path === '/improve-sales-process') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <ImproveSalesProcessPage />
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
