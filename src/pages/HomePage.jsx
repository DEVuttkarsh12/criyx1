import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import founderDebarshiPortrait from '../assets/founder-debarshi-chaudhuri-portrait.avif';
import founderDikshantPortrait from '../assets/founder-dikshant-portrait.jpeg';
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
  'AI systems for real operations',
  'Full-stack product execution',
  'QA and workflow automation',
];

const founderTitle = 'Meet the founders building Criyx.';
const panelDescriptions = {
  Services: {
    'AI Automation': 'Systemized automations for ops-heavy handoffs.',
    'AI Agents': 'Task agents with guardrails, tools, and workflow context.',
    'Voice and Media Agents': 'Structured voice intake, support, and routing.',
    'Custom Software and Apps': 'Operator-facing tools around your AI workflows.',
    'Full-Stack Marketing': 'Campaign systems, landing pages, and growth execution.',
    'Web Design and Development': 'Stunning websites built for clarity and conversion.',
  },
  'Our Products': {
    'AI Voice Agent': 'Voice-first qualification, intake, and support.',
    'Marketing Agent': 'An execution layer for campaign teams.',
    'Content Generator': 'Structured content production without chaos.',
    'Exhibition Lead Capture': 'Event lead capture with immediate follow-up.',
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
          <p className="hero__badge reveal">Trusted by 30+ companies like yours</p>
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
          <div className="hero__actions reveal reveal--delay-1">
            <Link className="button button--secondary" to="/services">
              Services
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--primary" to="/contact">
              Contact Us
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
          <p className="hero__description reveal reveal--delay-2">
            Criyx builds AI automation, custom software, and workflow systems
            designed to solve operational bottlenecks and remove repetitive work
            at scale.
          </p>
          <section
            className="hero__technologies reveal reveal--delay-3"
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

      <section className="explorePages" aria-labelledby="explore-pages-title">
        <div className="explorePages__content">
          <div className="explorePages__intro">
            <p className="explorePages__eyebrow reveal">Explore Pages</p>
            <h2
              className="explorePages__title reveal reveal--delay-1"
              id="explore-pages-title"
            >
              Move through the site without losing the thread.
            </h2>
            <p className="explorePages__body reveal reveal--delay-2">
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
                  className={`explorePages__item explorePages__item--button cursor-target reveal reveal--delay-${(Number(page.meta) - 1) % 4 + 1}`}
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
                  className={`explorePages__item cursor-target reveal reveal--delay-${(Number(page.meta) - 1) % 4 + 1}`}
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

      <section
        className="founderFeature"
        aria-labelledby="founder-feature-title"
        ref={founderSectionRef}
      >
        <div className="founderFeature__layout">
          <div className="founderFeature__copy">
            <p className="founderFeature__eyebrow reveal">Founding Team</p>
            <h2
              className="founderFeature__title reveal reveal--delay-1"
              id="founder-feature-title"
            >
              {typedFounderTitle || '\u00A0'}
              <span
                className={`founderFeature__typeCursor${typedFounderTitle.length >= founderTitle.length ? ' founderFeature__typeCursor--hidden' : ''}`}
                aria-hidden="true"
              />
            </h2>
            <p className="founderFeature__body reveal reveal--delay-2">
              Criyx is being built by two complementary operators. Dikshant
              leads the AI architecture, workflow thinking, and system design
              standard behind the company. Debarshi brings the build side of
              that equation with a product engineering background shaped by
              full-stack delivery, QA and product analysis, automation testing,
              and workflow execution across startup environments.
            </p>
            <p className="founderFeature__body reveal reveal--delay-3">
              Together they are building Criyx around one operating principle:
              useful AI should reduce friction, improve decisions, and remain
              reliable once real operators, exceptions, and scale enter the
              workflow. That balance matters because strong systems are not only
              imagined well, they are built right, tested thoroughly, and made
              practical for the team using them every day.
            </p>
            <div
              className="founderFeature__principles reveal reveal--delay-4"
              aria-label="Founding team strengths"
            >
              {founderSignals.map((principle) => (
                <span className="founderFeature__principle" key={principle}>
                  {principle}
                </span>
              ))}
            </div>
          </div>

          <div className="founderFeature__visual reveal reveal--delay-2">
            <figure className="founderFeature__portraitStage">
              <div className="founderFeature__portraitSplit">
                <div className="founderFeature__portraitPane">
                  <img
                    alt="Dikshant Vashisth, founder of Criyx"
                    className="founderFeature__portraitImage"
                    src={founderDikshantPortrait}
                    style={{ objectPosition: 'center 12%' }}
                  />
                </div>

                <div className="founderFeature__portraitPane">
                  <img
                    alt="Debarshi Chaudhuri, founder of Criyx"
                    className="founderFeature__portraitImage"
                    src={founderDebarshiPortrait}
                    style={{ objectPosition: 'center 16%' }}
                  />
                </div>
              </div>

              <figcaption className="founderFeature__portraitRail">
                <div className="founderFeature__portraitIdentity">
                  <span className="founderFeature__portraitKicker">
                    Founder / Strategy
                  </span>
                  <span className="founderFeature__portraitName">
                    Dikshant Vashisth
                  </span>
                  <span className="founderFeature__portraitRole">
                    AI Solutions Architect
                  </span>
                </div>

                <div className="founderFeature__portraitIdentity">
                  <span className="founderFeature__portraitKicker">
                    Founder / Execution
                  </span>
                  <span className="founderFeature__portraitName">
                    Debarshi Chaudhuri
                  </span>
                  <span className="founderFeature__portraitRole">
                    Product Engineer • QA & Automation
                  </span>
                </div>
              </figcaption>

              <p className="founderFeature__stageLine">
                Dikshant shapes the AI architecture and workflow direction.
                Debarshi brings the execution discipline behind it: full-stack
                product building, rigorous QA, automation workflows, and the
                ability to turn fast-moving ideas into dependable systems.
              </p>
            </figure>
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
