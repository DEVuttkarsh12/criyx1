import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { technologies } from '../data/siteContent';

const heroTitleParts = [
  { className: 'hero__titleBrand', text: 'Criyx' },
  { className: 'hero__titleLine', text: 'AI-Driven Solutions' },
  { className: 'hero__titleLine', text: 'for Modern' },
  { className: 'hero__titleLine', text: 'Businesses' },
];

const totalTitleCharacters = heroTitleParts.reduce(
  (characterCount, part) => characterCount + part.text.length,
  0,
);

export default function HomePage() {
  const outletContext = useOutletContext() ?? {};
  const {
    isExperienceReady = true,
    prefersReducedMotion = false,
    shouldAnimateHomeIntro = false,
    completeHomeIntro = () => {},
  } = outletContext;
  const [typedCharacters, setTypedCharacters] = useState(
    shouldAnimateHomeIntro ? 0 : totalTitleCharacters,
  );

  useEffect(() => {
    if (!shouldAnimateHomeIntro || prefersReducedMotion) {
      setTypedCharacters(totalTitleCharacters);

      if (shouldAnimateHomeIntro) {
        completeHomeIntro(true);
      }

      return;
    }

    setTypedCharacters(0);

    const typeTimer = window.setInterval(() => {
      setTypedCharacters((currentCharacters) => {
        const nextCharacters = currentCharacters + 1;

        if (nextCharacters >= totalTitleCharacters) {
          window.clearInterval(typeTimer);
          completeHomeIntro(true);
          return totalTitleCharacters;
        }

        return nextCharacters;
      });
    }, 58);

    return () => {
      window.clearInterval(typeTimer);
    };
  }, [completeHomeIntro, prefersReducedMotion, shouldAnimateHomeIntro]);

  let remainingCharacters = typedCharacters;
  const typedTitleParts = heroTitleParts.map((part) => {
    const visibleCharacters = Math.max(
      0,
      Math.min(part.text.length, remainingCharacters),
    );

    remainingCharacters -= visibleCharacters;

    return part.text.slice(0, visibleCharacters);
  });

  const activeLineIndex = typedTitleParts.findIndex(
    (part, index) => part.length < heroTitleParts[index].text.length,
  );

  return (
    <section className="hero" aria-labelledby="hero-title" id="hero">
      <div className="hero__content">
        <p
          className={`hero__badge homeIntroReveal${
            isExperienceReady ? ' homeIntroReveal--visible homeIntroReveal--delay-1' : ''
          }`}
        >
          Trusted by +21 companies like yours
        </p>
        <h1 className="hero__title" id="hero-title">
          {heroTitleParts.map((part, index) => (
            <span className={part.className} key={part.text}>
              {typedTitleParts[index]}
              {activeLineIndex === index ? (
                <span className="hero__typeCursor" aria-hidden="true" />
              ) : null}
            </span>
          ))}
        </h1>
        <div
          className={`hero__actions homeIntroReveal${
            isExperienceReady ? ' homeIntroReveal--visible homeIntroReveal--delay-3' : ''
          }`}
        >
          <Link className="button button--secondary" to="/services">
            Services
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--primary" to="/contact">
            Contact Us
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <p
          className={`hero__description homeIntroReveal${
            isExperienceReady ? ' homeIntroReveal--visible homeIntroReveal--delay-4' : ''
          }`}
        >
          Our platform simplifies data, uncovers trends, and helps you make
          faster, informed decisions tailored for growth-focused teams.
        </p>
        <section
          className={`hero__technologies homeIntroReveal${
            isExperienceReady ? ' homeIntroReveal--visible homeIntroReveal--delay-5' : ''
          }`}
          aria-labelledby="technologies-title"
          id="technologies"
        >
          <h2 className="hero__technologiesTitle" id="technologies-title">
            Our Core Technologies
          </h2>
          <ul className="techGrid">
            {technologies.map((technology) => (
              <li className="techCard" key={technology.label}>
                <span className="techCard__mark" aria-hidden="true">
                  {technology.mark}
                </span>
                <span className="techCard__label">{technology.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
