import { Link } from 'react-router-dom';
import automationVisual from '../assets/service-automation-live.png';
import agentsVisual from '../assets/service-agents-live.png';
import appsVisual from '../assets/service-apps-live.png';
import voiceVisual from '../assets/service-voice-live.png';
import {
  serviceCategories,
  serviceDeliveryModels,
  serviceHighlights,
  serviceVisualSlides,
} from '../data/siteContent';

const serviceImages = {
  automation: automationVisual,
  agents: agentsVisual,
  apps: appsVisual,
  voice: voiceVisual,
};

export default function ServicesPage() {
  return (
    <section className="page" aria-labelledby="services-title">
      <section className="pageIntro reveal pageIntro--split">
        <div className="pageIntro__content">
          <p className="pageIntro__eyebrow">Services</p>
          <h1 className="pageIntro__title" id="services-title">
            We build the AI systems, automations, agents, and custom software
            layers that modern teams actually need.
          </h1>
          <p className="pageIntro__body">
            Criyx is not limited to one service type. We work across AI
            automations, advanced workflow systems, AI agents, voice and media
            agents, custom software, web apps, and operator-facing products
            designed around real business processes.
          </p>
          <div className="pageIntro__actions">
            <Link className="button button--primary" to="/contact">
              Discuss your use case
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/process">
              See our process
            </Link>
          </div>
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Service coverage</p>
          <h2 className="sectionHeading__title">
            The service stack is broad because business workflows are broad
          </h2>
          <p className="sectionHeading__body">
            Some teams need one focused automation. Others need a connected
            system that includes agents, interfaces, approvals, and reporting.
            Criyx can support both ends of that spectrum.
          </p>
        </div>
        <div className="serviceGrid">
          {serviceCategories.map((service, index) => (
            <article
              className={`serviceCard reveal reveal--delay-${(index % 4) + 1}`}
              key={service.title}
            >
              <h3 className="serviceCard__title">{service.title}</h3>
              <p className="serviceCard__body">{service.body}</p>
              <ul className="detailList">
                {service.bullets.map((bullet) => (
                  <li className="detailList__item" key={bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="spotlightPanel reveal">
          <div className="spotlightMedia">
            <img
              className="spotlightMedia__image"
              src={agentsVisual}
              alt="Connected AI agent system with multiple orchestration points linked to a central intelligence core."
            />
          </div>
          <div className="spotlightCopy">
            <p className="sectionHeading__eyebrow">Built as connected systems</p>
            <h2 className="sectionHeading__title">
              The strongest Criyx work happens when automation, agents, and
              software are treated as one operating layer
            </h2>
            <p className="sectionHeading__body">
              That is why the service model stays broad. A business problem
              often starts as one workflow issue, but the best solution can
              involve automation logic, an agent layer, a review interface, and
              a reporting surface all working together.
            </p>
            <Link className="button button--secondary" to="/process">
              See how the process connects
            </Link>
          </div>
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Visual overview</p>
          <h2 className="sectionHeading__title">
            A quick pass through the kinds of systems we build
          </h2>
        </div>
        <div className="visualCarousel" role="region" aria-label="Service showcase">
          {serviceVisualSlides.map((slide, index) => (
            <article
              className={`visualSlide reveal reveal--delay-${(index % 4) + 1}`}
              key={slide.title}
            >
              <img
                className="visualSlide__image"
                src={serviceImages[slide.image]}
                alt={slide.title}
              />
              <div className="visualSlide__body">
                <h3 className="visualSlide__title">{slide.title}</h3>
                <p className="visualSlide__text">{slide.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">What we build most often</p>
          <h2 className="sectionHeading__title">
            Detailed service areas that businesses usually ask Criyx to solve
          </h2>
        </div>
        <div className="capabilityRail">
          {serviceHighlights.map((service, index) => (
            <article
              className={`capabilityCard reveal reveal--delay-${(index % 4) + 1}`}
              key={service.step}
            >
              <p className="capabilityCard__step">{service.step}</p>
              <div className="capabilityCard__content">
                <h3 className="capabilityCard__title">{service.title}</h3>
                <p className="capabilityCard__body">{service.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Engagement styles</p>
          <h2 className="sectionHeading__title">
            We can support a single workflow build, a broader system rollout, or
            an expansion of an existing AI layer
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {serviceDeliveryModels.map((model, index) => (
            <article
              className={`detailCard reveal reveal--delay-${index + 1}`}
              key={model.title}
            >
              <h3 className="detailCard__title">{model.title}</h3>
              <p className="detailCard__body">{model.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">
              If you already know the service type you need, we can scope it. If
              you only know the workflow problem, we can start there too.
            </h2>
            <p className="sectionHeading__body">
              The right entry point depends on how clear the business problem
              already is.
            </p>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Start with Criyx
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/why-us">
              Read why us
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
