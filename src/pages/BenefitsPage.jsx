import { Link } from 'react-router-dom';
import {
  benefitHighlights,
  benefitOutcomes,
  benefitUseCases,
} from '../data/siteContent';

export default function BenefitsPage() {
  return (
    <section className="page" aria-labelledby="benefits-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Benefits</p>
        <h1 className="pageIntro__title" id="benefits-title">
          The value of Criyx is measurable in speed, consistency, and better
          operating decisions.
        </h1>
        <p className="pageIntro__body">
          Good AI implementation should reduce friction in the business, not
          add another complicated layer to manage. Criyx focuses on benefits
          that teams can actually feel in daily execution.
        </p>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Core outcomes</p>
          <h2 className="sectionHeading__title">
            The practical gains teams should expect from the right rollout
          </h2>
        </div>
        <div className="whyGrid">
          {benefitHighlights.map((benefit, index) => (
            <article
              className={`whyCard reveal reveal--delay-${(index % 4) + 1}`}
              key={benefit.title}
            >
              <p className="whyCard__index">0{index + 1}</p>
              <h3 className="whyCard__title">{benefit.title}</h3>
              <p className="whyCard__body">{benefit.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Business impact</p>
          <h2 className="sectionHeading__title">
            Benefits that matter to managers, operators, and leadership
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {benefitOutcomes.map((outcome, index) => (
            <article
              className={`detailCard reveal reveal--delay-${index + 1}`}
              key={outcome.title}
            >
              <h3 className="detailCard__title">{outcome.title}</h3>
              <p className="detailCard__body">{outcome.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Where this applies</p>
          <h2 className="sectionHeading__title">
            Common business workflows where Criyx creates leverage
          </h2>
          <p className="sectionHeading__body">
            The strongest value usually appears in workflows that are
            high-volume, repetitive, cross-functional, or dependent on slow
            manual coordination.
          </p>
        </div>
        <div className="capabilityRail">
          {benefitUseCases.map((useCase, index) => (
            <article
              className={`capabilityCard reveal reveal--delay-${(index % 4) + 1}`}
              key={useCase.step}
            >
              <p className="capabilityCard__step">{useCase.step}</p>
              <div className="capabilityCard__content">
                <h3 className="capabilityCard__title">{useCase.title}</h3>
                <p className="capabilityCard__body">{useCase.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Move forward</p>
            <h2 className="sectionHeading__title">
              If these benefits match the problems your team is facing, the next
              step is to map the workflow in detail.
            </h2>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Talk to Criyx
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/features">
              Review features
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
