import { Link, useParams } from 'react-router-dom';
import { productPages } from '../data/siteContent';

export default function ProductPage() {
  const { productSlug } = useParams();
  const product = productPages.find((entry) => entry.slug === productSlug);

  if (!product) {
    return (
      <section className="page" aria-labelledby="product-not-found-title">
        <section className="pageIntro reveal">
          <p className="pageIntro__eyebrow">Our Products</p>
          <h1 className="pageIntro__title" id="product-not-found-title">
            That product page could not be found.
          </h1>
          <p className="pageIntro__body">
            The link may be outdated, or the product route may have changed.
            Use the main products overview to pick the right page.
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

  const relatedProducts = productPages.filter((entry) => entry.slug !== product.slug);

  return (
    <section className="page" aria-labelledby={`${product.slug}-title`}>
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">{product.eyebrow}</p>
        <h1 className="pageIntro__title" id={`${product.slug}-title`}>
          {product.title}
        </h1>
        <p className="pageIntro__body">{product.intro}</p>
        <div className="pageIntro__actions">
          <Link className="button button--primary" to="/contact">
            Discuss this product
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--secondary" to="/services">
            Back to services
          </Link>
        </div>
      </section>

      <section className="statsGrid" aria-label={`${product.label} key points`}>
        {product.stats.map((stat, index) => (
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
          <p className="sectionHeading__eyebrow">What it is built to do</p>
          <h2 className="sectionHeading__title">
            The core capabilities that define this product
          </h2>
        </div>
        <div className="whyGrid">
          {product.pillars.map((pillar, index) => (
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
          <p className="sectionHeading__eyebrow">How it works</p>
          <h2 className="sectionHeading__title">
            A practical delivery flow for this product
          </h2>
        </div>
        <div className="capabilityRail">
          {product.journey.map((step, index) => (
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
          <p className="sectionHeading__eyebrow">Where it creates value</p>
          <h2 className="sectionHeading__title">
            Common business situations where this product fits well
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {product.useCases.map((useCase, index) => (
            <article
              className={`detailCard reveal reveal--delay-${index + 1}`}
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
            The parts of the product that make it operationally usable
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {product.modules.map((module, index) => (
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
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">{product.ctaTitle}</h2>
            <p className="sectionHeading__body">{product.ctaBody}</p>
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
          <p className="sectionHeading__eyebrow">Product questions</p>
          <h2 className="sectionHeading__title">
            Common questions teams ask before moving forward
          </h2>
        </div>
        <div className="faqList">
          {product.faqs.map((item, index) => (
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
            Other product directions in the Criyx portfolio
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {relatedProducts.map((entry, index) => (
            <article
              className={`detailCard reveal reveal--delay-${(index % 3) + 1}`}
              key={entry.slug}
            >
              <h3 className="detailCard__title">{entry.label}</h3>
              <p className="detailCard__body">{entry.intro}</p>
              <p className="detailCard__meta">
                <Link className="textLink" to={`/products/${entry.slug}`}>
                  Open product page
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
