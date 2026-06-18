import { Link } from 'react-router-dom';
import { serviceCatalog, serviceDeliveryModels } from '../data/siteContent';

export default function ServicesPage() {
  return (
    <section className="page" aria-labelledby="services-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Services</p>
        <h1 className="pageIntro__title" id="services-title">
          AI services structured around real workflow problems, not generic
          capability lists.
        </h1>
        <p className="pageIntro__body">
          Criyx builds automation systems, AI agents, voice workflows, and
          custom software for teams that need measurable operational
          improvement. Each service area has its own focus, delivery pattern,
          and implementation path.
        </p>
        <div className="pageIntro__actions">
          <Link className="button button--primary" to="/contact">
            Discuss your workflow
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--secondary" to="/process">
            See our process
          </Link>
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Service areas</p>
          <h2 className="sectionHeading__title">
            Choose the service direction that fits the business problem best
          </h2>
          <p className="sectionHeading__body">
            Use the detailed service pages to understand scope, use cases,
            delivery flow, and where each model creates the most value.
          </p>
        </div>
        <div className="serviceGrid">
          {serviceCatalog.map((service, index) => (
            <article
              className={`serviceCard reveal reveal--delay-${(index % 4) + 1}`}
              key={service.id}
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
              <p className="detailCard__meta">
                <Link className="textLink" to={service.to}>
                  View service details
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Engagement styles</p>
          <h2 className="sectionHeading__title">
            We can support a focused workflow build, a broader system rollout,
            or an expansion of an existing AI layer
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {serviceDeliveryModels.map((model, index) => (
            <article
              className={`detailCard reveal reveal--delay-${(index % 3) + 1}`}
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
              If you already know the workflow problem, we can help choose the
              right service path and scope it properly.
            </h2>
            <p className="sectionHeading__body">
              The best starting point depends on the workflow, the systems
              involved, and how much of the process should stay under human
              review.
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
