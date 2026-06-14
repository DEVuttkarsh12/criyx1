import { Link } from 'react-router-dom';
import {
  featureDeliveryFlow,
  featureModules,
  featurePillars,
  technologies,
} from '../data/siteContent';

export default function FeaturesPage() {
  return (
    <section className="page" aria-labelledby="features-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Features</p>
        <h1 className="pageIntro__title" id="features-title">
          Criyx combines workflow design, automation, context, and reporting
          into one usable AI operating layer.
        </h1>
        <p className="pageIntro__body">
          Features only matter when they fit the business process they are meant
          to improve. Criyx focuses on systems that teams can adopt without
          changing how every person in the company works.
        </p>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Feature pillars</p>
          <h2 className="sectionHeading__title">
            The core parts of a production-ready AI workflow
          </h2>
        </div>
        <div className="whyGrid">
          {featurePillars.map((pillar, index) => (
            <article
              className={`whyCard reveal reveal--delay-${(index % 4) + 1}`}
              key={pillar.title}
            >
              <p className="whyCard__index">0{index + 1}</p>
              <h3 className="whyCard__title">{pillar.title}</h3>
              <p className="whyCard__body">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">System layers</p>
          <h2 className="sectionHeading__title">
            Features are delivered as working layers, not isolated add-ons
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {featureModules.map((module, index) => (
            <article
              className={`detailCard reveal reveal--delay-${index + 1}`}
              key={module.title}
            >
              <h3 className="detailCard__title">{module.title}</h3>
              <ul className="detailList">
                {module.points.map((point) => (
                  <li className="detailList__item" key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Delivery flow</p>
          <h2 className="sectionHeading__title">
            How features move from concept to a working operating layer
          </h2>
        </div>
        <div className="capabilityRail">
          {featureDeliveryFlow.map((step, index) => (
            <article
              className={`capabilityCard reveal reveal--delay-${(index % 4) + 1}`}
              key={step.step}
            >
              <p className="capabilityCard__step">{step.step}</p>
              <div className="capabilityCard__content">
                <h3 className="capabilityCard__title">{step.title}</h3>
                <p className="capabilityCard__body">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Technology base</p>
          <h2 className="sectionHeading__title">
            The stack is selected to serve the workflow, not the other way
            around
          </h2>
        </div>
        <ul className="techGrid">
          {technologies.map((technology, index) => (
            <li
              className={`techCard reveal reveal--delay-${(index % 4) + 1}`}
              key={technology.label}
            >
              <span className="techCard__mark" aria-hidden="true">
                {technology.mark}
              </span>
              <span className="techCard__label">{technology.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">
              If the feature model looks right, the next job is choosing the
              first workflow to implement.
            </h2>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Start planning
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/why-us">
              Read why Criyx
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
