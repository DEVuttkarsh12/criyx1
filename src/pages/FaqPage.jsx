import { Link } from 'react-router-dom';
import { faqCategories } from '../data/siteContent';

export default function FaqPage() {
  return (
    <section className="page" aria-labelledby="faq-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">FAQ</p>
        <h1 className="pageIntro__title" id="faq-title">
          Detailed answers for teams evaluating Criyx as an AI implementation
          partner.
        </h1>
        <p className="pageIntro__body">
          Buyers and operators usually need more than a surface explanation.
          This page covers the questions that matter before time, money, or
          internal attention is committed to a rollout.
        </p>
      </section>

      <section className="pageSection">
        <div className="faqCategoryGrid">
          {faqCategories.map((category, index) => (
            <section
              className={`faqCategory reveal reveal--delay-${(index % 3) + 1}`}
              key={category.title}
            >
              <div className="sectionHeading">
                <p className="sectionHeading__eyebrow">{category.title}</p>
                <h2 className="sectionHeading__title faqCategory__title">
                  {category.title}
                </h2>
                <p className="sectionHeading__body">{category.body}</p>
              </div>
              <div className="faqList">
                {category.items.map((item) => (
                  <details className="faqItem" key={item.question}>
                    <summary className="faqItem__summary">{item.question}</summary>
                    <p className="faqItem__body">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Still evaluating?</p>
            <h2 className="sectionHeading__title">
              The fastest way to answer fit questions is to look at the actual
              workflow you want to improve.
            </h2>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Ask about your use case
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/benefits">
              Review benefits
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
