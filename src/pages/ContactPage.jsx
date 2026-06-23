import { useEffect } from 'react';
import { contactOptions, contactSteps } from '../data/siteContent';

const CAL_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';
const CAL_NAMESPACE = '30min';
const CAL_ORIGIN = 'https://app.cal.com';
const CAL_LINK = 'criyx.ai/30min';
const CAL_CONTAINER_ID = 'my-cal-inline-30min';

export default function ContactPage() {
  useEffect(() => {
    const container = document.getElementById(CAL_CONTAINER_ID);

    if (!container) {
      return undefined;
    }

    let isCancelled = false;
    let scriptNode = null;
    let existingScript = null;

    const initializeCal = () => {
      if (isCancelled || !window.Cal) {
        return;
      }

      container.innerHTML = '';

      window.Cal('init', CAL_NAMESPACE, { origin: CAL_ORIGIN });
      window.Cal.config = window.Cal.config || {};
      window.Cal.config.forwardQueryParams = true;

      window.Cal.ns[CAL_NAMESPACE]('inline', {
        elementOrSelector: `#${CAL_CONTAINER_ID}`,
        config: {
          layout: 'month_view',
          useSlotsViewOnSmallScreen: true,
          theme: 'auto',
        },
        calLink: CAL_LINK,
      });

      window.Cal.ns[CAL_NAMESPACE]('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#ffffff' },
          dark: { 'cal-brand': '#000000' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    };

    if (window.Cal?.loaded) {
      initializeCal();
    } else {
      existingScript = document.querySelector(`script[src="${CAL_SCRIPT_SRC}"]`);

      if (existingScript) {
        existingScript.addEventListener('load', initializeCal);
      } else {
        scriptNode = document.createElement('script');
        scriptNode.src = CAL_SCRIPT_SRC;
        scriptNode.async = true;
        scriptNode.addEventListener('load', initializeCal);
        document.head.appendChild(scriptNode);
      }
    }

    return () => {
      isCancelled = true;

      if (scriptNode) {
        scriptNode.removeEventListener('load', initializeCal);
      }

      if (existingScript) {
        existingScript.removeEventListener('load', initializeCal);
      }
    };
  }, []);

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
        <div className="ctaPanel ctaPanel--calendar reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Reach out</p>
            <h2 className="sectionHeading__title">
              Book time directly in the calendar and bring the workflow summary
              or business problem to the call.
            </h2>
            <p className="sectionHeading__body">
              Pick a slot below. If you prefer to share context before the
              meeting, send it to hello@criyx.com.
            </p>
          </div>
          <div className="calEmbed" id={CAL_CONTAINER_ID}>
            <p className="calEmbed__fallback">
              Loading calendar...
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
