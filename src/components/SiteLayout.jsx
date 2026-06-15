import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import backgroundVideo from '../../asset/untitled_project_remix_scene.mp4';
import brandLogo from '../../file.jpeg';
import SiteHeader from './SiteHeader';

const LOADER_DURATION_MS = 2200;
const LOADER_EXIT_MS = 320;

export default function SiteLayout() {
  const location = useLocation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [isExperienceReady, setIsExperienceReady] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
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

  useEffect(() => {
    const duration = prefersReducedMotion ? 500 : LOADER_DURATION_MS;
    const stepInterval = prefersReducedMotion ? duration : 90;
    let currentProgress = 0;

    setLoaderProgress(0);
    setIsExperienceReady(false);
    setIsLoaderVisible(true);

    const progressTimer = window.setInterval(() => {
      currentProgress = Math.min(
        currentProgress + (prefersReducedMotion ? 100 : 4 + Math.random() * 7),
        96,
      );
      setLoaderProgress(Math.round(currentProgress));
    }, stepInterval);

    const readyTimer = window.setTimeout(() => {
      window.clearInterval(progressTimer);
      setLoaderProgress(100);
      setIsExperienceReady(true);
    }, duration);

    const hideTimer = window.setTimeout(() => {
      setIsLoaderVisible(false);
    }, duration + LOADER_EXIT_MS);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(readyTimer);
      window.clearTimeout(hideTimer);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isLoaderVisible ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoaderVisible]);

  const shouldAnimateHomeIntro =
    location.pathname === '/' && isExperienceReady && !hasCompletedHomeIntro;

  return (
    <main className="app">
      {isLoaderVisible ? (
        <div
          className={`loaderOverlay${isExperienceReady ? ' loaderOverlay--exit' : ''}`}
          aria-hidden="true"
        >
          <div className="loaderOverlay__glow loaderOverlay__glow--primary" />
          <div className="loaderOverlay__glow loaderOverlay__glow--secondary" />
          <div className="loaderOverlay__panel">
            <div className="loaderOverlay__logoShell">
              <img className="loaderOverlay__logo" src={brandLogo} alt="" />
            </div>
            <p className="loaderOverlay__eyebrow">Launching the Criyx experience</p>
            <p className="loaderOverlay__wordmark">CRIYX</p>
            <div className="loaderOverlay__meter" role="presentation">
              <span
                className="loaderOverlay__meterFill"
                style={{ width: `${loaderProgress}%` }}
              />
            </div>
            <div className="loaderOverlay__status">
              <span>Preparing the interface</span>
              <span>{loaderProgress}%</span>
            </div>
          </div>
        </div>
      ) : null}
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
      <div className={`app__canvas${isExperienceReady ? ' app__canvas--ready' : ''}`}>
        <SiteHeader />
        <Outlet
          context={{
            isExperienceReady,
            prefersReducedMotion,
            shouldAnimateHomeIntro,
            completeHomeIntro: setHasCompletedHomeIntro,
          }}
        />
      </div>
    </main>
  );
}
