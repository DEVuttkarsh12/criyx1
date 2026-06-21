import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

const DepthGlobeBackdrop = lazy(() => import('./DepthGlobeBackdrop'));
const TargetCursor = lazy(() => import('./TargetCursor'));

export default function SiteLayout() {
  const location = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference);
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));

    if (revealElements.length === 0) {
      return undefined;
    }

    revealElements.forEach((element) => {
      element.classList.remove('reveal--is-visible');
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach((element) => {
        element.classList.add('reveal--is-visible');
      });

      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('reveal--is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <main className="app">
      <Suspense fallback={null}>
        <DepthGlobeBackdrop prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
      <Suspense fallback={null}>
        <TargetCursor
          targetSelector=".brand, .siteNav__link, .siteDropdown__link, .sm-panel-item, .sm-secondary-link, .siteHeader__mobileToggle, .siteMobileDropdown__summary, .siteMobileNav__link, .button, .techCard, .statCard, .whyCard, .proofCard, .detailCard, .serviceCard, .capabilityCard, .visualSlide, .spotlightPanel, .processNode, .processStage, .faqItem__summary"
          spinDuration={2.4}
          hideDefaultCursor={true}
          hoverDuration={0.18}
          parallaxOn={true}
        />
      </Suspense>
      <div className="app__canvas">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
    </main>
  );
}
