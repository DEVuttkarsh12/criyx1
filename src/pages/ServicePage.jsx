import { Link, useParams } from 'react-router-dom';
import { servicePages } from '../data/siteContent';

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const service = servicePages.find((entry) => entry.slug === serviceSlug);

  if (!service) {
    return (
      <section className="page" aria-labelledby="service-not-found-title">
        <section className="pageIntro reveal">
          <p className="pageIntro__eyebrow">Services</p>
          <h1 className="pageIntro__title" id="service-not-found-title">
            That service page could not be found.
          </h1>
          <p className="pageIntro__body">
            The link may be outdated, or the service route may have changed.
          </p>
          <div className="pageIntro__actions">
            <Link className="button button--primary" to="/services">
              Back to services
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/contact">
              Contact Criyx
            </Link>
          </div>
        </section>
      </section>
    );
  }

  const relatedServices = servicePages.filter((entry) => entry.slug !== service.slug);

  return (
    <section className="page" aria-labelledby={`${service.slug}-title`}>
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">{service.eyebrow}</p>
        <h1 className="pageIntro__title" id={`${service.slug}-title`}>
          {service.title}
        </h1>
        <p className="pageIntro__body">{service.intro}</p>
        <div className="pageIntro__actions">
          <Link className="button button--primary" to="/contact">
            Discuss this service
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--secondary" to="/services">
            Back to services
          </Link>
        </div>
      </section>

      <section className="statsGrid" aria-label={`${service.label} key points`}>
        {service.stats.map((stat, index) => (
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
          <p className="sectionHeading__eyebrow">What this service solves</p>
          <h2 className="sectionHeading__title">
            The capabilities that define this service area
          </h2>
        </div>
        <div className="whyGrid">
          {service.pillars.map((pillar, index) => (
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
          <p className="sectionHeading__eyebrow">Delivery flow</p>
          <h2 className="sectionHeading__title">
            How we usually structure this type of engagement
          </h2>
        </div>
        <div className="capabilityRail">
          {service.journey.map((step, index) => (
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
          <p className="sectionHeading__eyebrow">Typical use cases</p>
          <h2 className="sectionHeading__title">
            Where this service usually creates the most value
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {service.useCases.map((useCase, index) => (
            <article
              className={`detailCard reveal reveal--delay-${(index % 3) + 1}`}
              key={useCase.title}
            >
              <h3 className="detailCard__title">{useCase.title}</h3>
              <p className="detailCard__body">{useCase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">System layers</p>
          <h2 className="sectionHeading__title">
            The components that make the service operationally usable
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {service.modules.map((module, index) => (
            <article
              className={`detailCard reveal reveal--delay-${(index % 3) + 1}`}
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
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">{service.ctaTitle}</h2>
            <p className="sectionHeading__body">{service.ctaBody}</p>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Start planning
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/process">
              Review our process
            </Link>
          </div>
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Service questions</p>
          <h2 className="sectionHeading__title">
            Common questions teams ask before moving forward
          </h2>
        </div>
        <div className="faqList">
          {service.faqs.map((item, index) => (
            <details
              className={`faqItem reveal reveal--delay-${(index % 3) + 1}`}
              key={item.question}
            >
              <summary className="faqItem__summary">{item.question}</summary>
              <p className="faqItem__body">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Explore more</p>
          <h2 className="sectionHeading__title">
            Other Criyx service directions
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {relatedServices.map((entry, index) => (
            <article
              className={`detailCard reveal reveal--delay-${(index % 3) + 1}`}
              key={entry.slug}
            >
              <h3 className="detailCard__title">{entry.label}</h3>
              <p className="detailCard__body">{entry.overviewBody}</p>
              <p className="detailCard__meta">
                <Link className="textLink" to={`/services/${entry.slug}`}>
                  Open service page
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
