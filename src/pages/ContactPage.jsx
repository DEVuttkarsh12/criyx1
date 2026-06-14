import { Link } from 'react-router-dom';
import { contactOptions, contactSteps } from '../data/siteContent';

export default function ContactPage() {
  return (
    <section className="page" aria-labelledby="contact-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Contact</p>
        <h1 className="pageIntro__title" id="contact-title">
          Start with the workflow, the friction point, and the outcome your team
          wants to improve.
        </h1>
        <p className="pageIntro__body">
          Criyx works best when the problem is described in operational terms.
          You do not need a polished AI brief. You only need a clear view of
          what is slowing the team down or where the system should perform
          better.
        </p>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">How to start</p>
          <h2 className="sectionHeading__title">
            Choose the conversation that matches what your team needs right now
          </h2>
        </div>
        <div className="detailGrid detailGrid--triple">
          {contactOptions.map((option, index) => (
            <article
              className={`detailCard reveal reveal--delay-${index + 1}`}
              key={option.title}
            >
              <h3 className="detailCard__title">{option.title}</h3>
              <p className="detailCard__body">{option.body}</p>
              <p className="detailCard__meta">{option.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">What happens next</p>
          <h2 className="sectionHeading__title">
            A simple process to move from discussion to direction
          </h2>
        </div>
        <div className="capabilityRail">
          {contactSteps.map((step, index) => (
            <article
              className={`capabilityCard reveal reveal--delay-${(index % 3) + 1}`}
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
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Reach out</p>
            <h2 className="sectionHeading__title">
              Send the workflow summary or business problem to start the
              conversation.
            </h2>
            <p className="sectionHeading__body">
              Email works well when you want to share context before a call.
            </p>
          </div>
          <div className="ctaPanel__actions">
            <a className="button button--primary" href="mailto:hello@criyx.com">
              hello@criyx.com
            </a>
            <Link className="button button--secondary" to="/why-us">
              Read why Criyx
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
