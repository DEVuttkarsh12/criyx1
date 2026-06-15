import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import backgroundVideo from '../../asset/untitled_project_remix_scene.mp4';
import SiteHeader from './SiteHeader';
import TargetCursor from './TargetCursor';

export default function SiteLayout() {
  const location = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hasCompletedHomeIntro, setHasCompletedHomeIntro] = useState(false);

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

  const shouldAnimateHomeIntro =
    location.pathname === '/' && !hasCompletedHomeIntro;

  return (
    <main className="app">
      <TargetCursor
        targetSelector=".brand, .siteNav__link, .button, .techCard, .statCard, .whyCard, .proofCard, .detailCard, .serviceCard, .capabilityCard, .visualSlide, .spotlightPanel, .processNode, .processStage, .faqItem__summary"
        spinDuration={2.4}
        hideDefaultCursor={true}
        hoverDuration={0.18}
        parallaxOn={true}
      />
      <video
        className="app__video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="app__canvas">
        <SiteHeader />
        <Outlet
          context={{
            isExperienceReady: true,
            prefersReducedMotion,
            shouldAnimateHomeIntro,
            completeHomeIntro: setHasCompletedHomeIntro,
          }}
        />
      </div>
    </main>
  );
}
