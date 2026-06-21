import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import founderPortrait from '../assets/founder-dikshant-portrait.png';
import LogoLoop from '../components/LogoLoop';
import StaggeredMenu from '../components/StaggeredMenu';
import TechnologyIcon from '../components/TechnologyIcon';
import {
  productNavItems,
  serviceNavItems,
  technologies,
} from '../data/siteContent';

const heroTitleLines = [
  {
    className: 'hero__titleLine',
    delayClass: 'homeIntroReveal--delay-2',
    text: 'AI-Driven Solutions',
  },
  {
    className: 'hero__titleLine',
    delayClass: 'homeIntroReveal--delay-3',
    text: 'for Complex Business Operations',
  },
];

const founderSignals = [
  'Entrepreneur',
  'AI Solutions Architect',
  'Founder @criyx.ai',
];

const founderTitle = 'Meet Dikshant Vashisth, the founder behind Criyx.';
const founderQuote =
  'AI should improve the way a business actually operates, not just look impressive in a pitch.';
const panelDescriptions = {
  Services: {
    'Workflow Automation': 'Systemized automations for ops-heavy handoffs.',
    'AI Voice Agent': 'Structured voice intake, support, and routing.',
    'Marketing Agent': 'Campaign operations with review-ready outputs.',
    'Custom Apps': 'Operator-facing tools around your AI workflows.',
  },
  'Our Products': {
    'AI Voice Agent': 'Voice-first qualification, intake, and support.',
    'Marketing Agent': 'An execution layer for campaign teams.',
    'Content Generator': 'Structured content production without chaos.',
    'Exhibition WhatsApp': 'Event lead capture with immediate follow-up.',
    'Workflow Automation': 'Multi-step process control across your stack.',
    'Custom Apps': 'Internal products for review, action, and oversight.',
  },
};

const buildPanelItems = (items, label) =>
  items.map((item) => ({
    ariaLabel: `Open ${item.label}`,
    description: panelDescriptions[label]?.[item.label],
    label: item.label,
    link: item.to,
  }));

const explorePanelConfigs = {
  services: {
    buttonText: 'View services',
    colors: ['#7a2e17', '#2b160f'],
    description:
      'Explore the automation systems, agent workflows, and custom builds Criyx delivers for real operating teams.',
    eyebrow: 'Explore Services',
    items: buildPanelItems(serviceNavItems, 'Services'),
    title: 'Services',
  },
  products: {
    buttonText: 'View products',
    colors: ['#7a2e17', '#2b160f'],
    description:
      'Browse the product layer behind Criyx deployments, from voice systems to internal tools and campaign execution agents.',
    eyebrow: 'Explore Products',
    items: buildPanelItems(productNavItems, 'Our Products'),
    title: 'Our Products',
  },
};

const explorePages = [
  {
    description:
      'Open the same side menu structure used in the navbar and browse every service page directly from here.',
    label: 'Services',
    meta: '01',
    panelKey: 'services',
  },
  {
    description:
      'Open the products panel and move through the voice, content, marketing, automation, and app products individually.',
    label: 'Our Products',
    meta: '02',
    panelKey: 'products',
  },
  {
    description:
      'Understand the implementation style, operating standard, and decision-making approach behind the work.',
    label: 'Why Us',
    meta: '03',
    to: '/why-us',
  },
  {
    description:
      'Review the business outcomes this work is meant to create across execution, clarity, and scale.',
    label: 'Benefits',
    meta: '04',
    to: '/benefits',
  },
  {
    description:
      'Walk through the actual delivery sequence, from audit and design to build, launch, and refinement.',
    label: 'Process',
    meta: '05',
    to: '/process',
  },
  {
    description:
      'Get direct answers on engagement model, reliability, integrations, and where Criyx fits best.',
    label: 'FAQ',
    meta: '06',
    to: '/faq',
  },
  {
    description:
      'Start the conversation if you already know the workflow that needs sharper systems behind it.',
    label: 'Contact',
    meta: '07',
    to: '/contact',
  },
];

export default function HomePage() {
  const founderSectionRef = useRef(null);
  const panelId = useId();
  const [typedFounderTitle, setTypedFounderTitle] = useState('');
  const [founderTitleVisible, setFounderTitleVisible] = useState(false);
  const [activeExplorePanel, setActiveExplorePanel] = useState(null);

  useEffect(() => {
    const section = founderSectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setFounderTitleVisible(true);
        observer.disconnect();
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!founderTitleVisible) {
      return undefined;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedFounderTitle(founderTitle.slice(0, index));

      if (index >= founderTitle.length) {
        window.clearInterval(interval);
      }
    }, 32);

    return () => window.clearInterval(interval);
  }, [founderTitleVisible]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title" id="hero">
        <div className="hero__content">
          <p className="hero__badge">Trusted by 30+ companies like yours</p>
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
            Criyx builds AI automation, custom software, and workflow systems
            designed to solve operational bottlenecks and remove repetitive work
            at scale.
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

      <section
        className="founderFeature"
        aria-labelledby="founder-feature-title"
        ref={founderSectionRef}
      >
        <div className="founderFeature__layout">
          <div className="founderFeature__copy">
            <p className="founderFeature__eyebrow">From the Founder</p>
            <h2 className="founderFeature__title" id="founder-feature-title">
              {typedFounderTitle || '\u00A0'}
              <span
                className={`founderFeature__typeCursor${typedFounderTitle.length >= founderTitle.length ? ' founderFeature__typeCursor--hidden' : ''}`}
                aria-hidden="true"
              />
            </h2>
            <p className="founderFeature__body">
              Entrepreneur. AI Solutions Architect. The face behind Criyx.
              Dikshant is building the company around a simple standard: AI
              should improve the way a business actually operates, not just
              look impressive in a pitch.
            </p>
            <p className="founderFeature__body">
              That is what Criyx is meant to stand for: sharper workflow
              design, cleaner decision paths, and systems that stay useful once
              real operators, exceptions, and scale enter the picture.
            </p>
            <div className="founderFeature__principles" aria-label="Founder signals">
              {founderSignals.map((principle) => (
                <span className="founderFeature__principle" key={principle}>
                  {principle}
                </span>
              ))}
            </div>
          </div>

          <div className="founderFeature__visual">
            <figure className="founderFeature__portraitComposition">
              <div className="founderFeature__portraitPlate" aria-hidden="true" />
              <div className="founderFeature__portraitPlaceholder">
                <span className="founderFeature__portraitKicker">Founder / Criyx</span>
                <img
                  alt="Dikshant Vashisth, founder of Criyx"
                  className="founderFeature__portraitImage"
                  src={founderPortrait}
                />
                <figcaption className="founderFeature__portraitCaption">
                  <span className="founderFeature__portraitName">Dikshant Vashisth</span>
                  <span className="founderFeature__portraitRole">
                    Founder • AI Solutions Architect
                  </span>
                </figcaption>
              </div>

              <blockquote className="founderFeature__quoteCard">
                <p className="founderFeature__quoteText">“{founderQuote}”</p>
                <p className="founderFeature__quoteMeta">Guiding principle behind Criyx</p>
              </blockquote>

              <div className="founderFeature__noteCard" aria-hidden="true">
                <span className="founderFeature__noteLabel">Operator note</span>
                <span className="founderFeature__noteValue">
                  Built for execution, not presentation theater.
                </span>
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="explorePages" aria-labelledby="explore-pages-title">
        <div className="explorePages__content">
          <div className="explorePages__intro">
            <p className="explorePages__eyebrow">Explore Pages</p>
            <h2 className="explorePages__title" id="explore-pages-title">
              Move through the site without losing the thread.
            </h2>
            <p className="explorePages__body">
              Each page is built to answer a specific part of the decision:
              what Criyx does, how the work is delivered, why the approach
              holds, and where to start if the workflow problem is already
              clear.
            </p>
          </div>

          <div className="explorePages__list" role="list">
            {explorePages.map((page) => (
              page.panelKey ? (
                <button
                  aria-controls={panelId}
                  aria-expanded={activeExplorePanel === page.panelKey}
                  aria-haspopup="dialog"
                  className="explorePages__item explorePages__item--button cursor-target"
                  key={page.label}
                  onClick={() =>
                    setActiveExplorePanel((current) =>
                      current === page.panelKey ? null : page.panelKey,
                    )
                  }
                  role="listitem"
                  type="button"
                >
                  <span className="explorePages__itemMeta">{page.meta}</span>
                  <div className="explorePages__itemMain">
                    <h3 className="explorePages__itemTitle">{page.label}</h3>
                    <p className="explorePages__itemBody">{page.description}</p>
                  </div>
                  <span className="explorePages__itemArrow" aria-hidden="true">
                    {explorePanelConfigs[page.panelKey].buttonText}
                  </span>
                </button>
              ) : (
                <Link
                  className="explorePages__item cursor-target"
                  key={page.to}
                  role="listitem"
                  to={page.to}
                >
                  <span className="explorePages__itemMeta">{page.meta}</span>
                  <div className="explorePages__itemMain">
                    <h3 className="explorePages__itemTitle">{page.label}</h3>
                    <p className="explorePages__itemBody">{page.description}</p>
                  </div>
                  <span className="explorePages__itemArrow" aria-hidden="true">
                    Open page
                  </span>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {activeExplorePanel ? (
        <StaggeredMenu
          accentColor="#c65c37"
          className="explorePages__panelMenu"
          colors={explorePanelConfigs[activeExplorePanel].colors}
          description={explorePanelConfigs[activeExplorePanel].description}
          displayItemNumbering
          eyebrow={explorePanelConfigs[activeExplorePanel].eyebrow}
          items={explorePanelConfigs[activeExplorePanel].items}
          onOpenChange={(open) => {
            if (!open) {
              setActiveExplorePanel(null);
            }
          }}
          open
          panelId={panelId}
          showToggle={false}
          title={explorePanelConfigs[activeExplorePanel].title}
        />
      ) : null}
    </>
  );
}
