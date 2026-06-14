import { Link } from 'react-router-dom';
import {
  engagementModel,
  proofPoints,
  whyUsCta,
  whyUsPrinciples,
  whyUsStats,
} from '../data/siteContent';

export default function WhyUsPage() {
  return (
    <section className="page" aria-labelledby="why-us-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Why Criyx</p>
        <h1 className="pageIntro__title" id="why-us-title">
          Criyx is designed for businesses that want AI to improve execution,
          not just generate attention.
        </h1>
        <p className="pageIntro__body">
          The difference is not the use of AI by itself. The difference is how
          clearly the workflow is defined, how reliably the system behaves in
          production, and how confidently your team can operate it after launch.
        </p>
        <div className="pageIntro__actions">
          <Link className="button button--primary" to="/benefits">
            See the business benefits
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--secondary" to="/contact">
            Start a conversation
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>

      <section className="statsGrid" aria-label="Key operating stats">
        {whyUsStats.map((stat, index) => (
          <article
            className={`statCard reveal reveal--delay-${index + 1}`}
            key={stat.value}
          >
            <p className="statCard__value">{stat.value}</p>
            <p className="statCard__label">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">What sets us apart</p>
          <h2 className="sectionHeading__title">
            A more operational approach to AI delivery
          </h2>
          <p className="sectionHeading__body">
            Criyx should feel valuable to operators, useful to managers, and
            defensible to budget owners. That requires more than a clever demo.
          </p>
        </div>
        <div className="whyGrid">
          {whyUsPrinciples.map((principle, index) => (
            <article
              className={`whyCard reveal reveal--delay-${(index % 4) + 1}`}
              key={principle.title}
            >
              <p className="whyCard__index">0{index + 1}</p>
              <h3 className="whyCard__title">{principle.title}</h3>
              <p className="whyCard__body">{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">How we work</p>
          <h2 className="sectionHeading__title">
            An engagement model built for clarity, speed, and long-term use
          </h2>
          <p className="sectionHeading__body">
            Every project should move through a delivery structure that reduces
            ambiguity and makes progress easy to evaluate.
          </p>
        </div>
        <div className="capabilityRail">
          {engagementModel.map((step, index) => (
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
          <p className="sectionHeading__eyebrow">Who this helps</p>
          <h2 className="sectionHeading__title">
            Criyx is built to make sense across every level of the organization
          </h2>
        </div>
        <div className="proofGrid">
          {proofPoints.map((point, index) => (
            <article
              className={`proofCard reveal reveal--delay-${index + 1}`}
              key={point.title}
            >
              <h3 className="proofCard__title">{point.title}</h3>
              <p className="proofCard__body">{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">{whyUsCta.title}</h2>
            <p className="sectionHeading__body">{whyUsCta.body}</p>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Contact Criyx
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/features">
              Explore features
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
