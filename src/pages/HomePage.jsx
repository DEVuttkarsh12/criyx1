import { Link } from 'react-router-dom';
import LogoLoop from '../components/LogoLoop';
import TechnologyIcon from '../components/TechnologyIcon';
import { technologies } from '../data/siteContent';

const heroTitleLines = [
  { className: 'hero__titleBrand', delayClass: 'homeIntroReveal--delay-2', text: 'Criyx' },
  {
    className: 'hero__titleLine',
    delayClass: 'homeIntroReveal--delay-3',
    text: 'AI-Driven Solutions',
  },
  {
    className: 'hero__titleLine',
    delayClass: 'homeIntroReveal--delay-4',
    text: 'for Business Operations',
  },
];

export default function HomePage() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="hero">
      <div className="hero__content">
        <p className="hero__badge">Trusted by +21 companies like yours</p>
        <h1 className="hero__title" id="hero-title">
          {heroTitleLines.map((line) => (
            <span
              className={`${line.className} homeIntroReveal homeIntroReveal--visible ${line.delayClass}`}
              key={line.text}
            >
              {line.text}
            </span>
          ))}
        </h1>
        <div className="hero__actions">
          <Link className="button button--secondary" to="/services">
            Services
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--primary" to="/contact">
            Contact Us
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <p className="hero__description">
          AI automation, custom software, and workflow systems designed to
          solve operational bottlenecks and remove repetitive work at scale.
        </p>
        <section
          className="hero__technologies"
          aria-labelledby="technologies-title"
          id="technologies"
        >
          <h2 className="hero__technologiesTitle" id="technologies-title">
            Our Core Technologies
          </h2>
          <div className="hero__logoLoopWrap">
            <LogoLoop
              logos={technologies}
              speed={72}
              direction="left"
              logoHeight={52}
              gap={18}
              hoverSpeed={16}
              scaleOnHover
              ariaLabel="Core technologies used by Criyx"
              className="hero__logoLoop"
              renderItem={(technology) => (
                <div className="heroLogoChip" title={technology.label}>
                  <span className="heroLogoChip__mark" aria-hidden="true">
                    <TechnologyIcon
                      iconKey={technology.iconKey}
                      label={technology.label}
                      mark={technology.mark}
                    />
                  </span>
                  <span className="heroLogoChip__label">{technology.label}</span>
                </div>
              )}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
