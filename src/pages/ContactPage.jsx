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

    const bootstrapCal = () => {
      const cal = window.Cal;

      if (!cal) {
        return;
      }

      container.innerHTML = '';

      cal('init', CAL_NAMESPACE, { origin: CAL_ORIGIN });
      cal.config = cal.config || {};
      cal.config.forwardQueryParams = true;

      cal.ns[CAL_NAMESPACE]('inline', {
        elementOrSelector: `#${CAL_CONTAINER_ID}`,
        config: {
          layout: 'month_view',
          useSlotsViewOnSmallScreen: true,
          theme: 'auto',
        },
        calLink: CAL_LINK,
      });

      cal.ns[CAL_NAMESPACE]('ui', {
        cssVarsPerTheme: {
          light: { 'cal-brand': '#ffffff' },
          dark: { 'cal-brand': '#000000' },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    };

    const queueCalBootstrap = () => {
      const queue = function pushToQueue(target, args) {
        target.q.push(args);
      };
      const existingCal = window.Cal;

      window.Cal =
        existingCal ||
        function calLoader() {
          const cal = window.Cal;
          const args = arguments;

          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = document.createElement('script');
            script.src = CAL_SCRIPT_SRC;
            document.head.appendChild(script);
            cal.loaded = true;
          }

          if (args[0] === 'init') {
            const namespace = args[1];
            const api = function namespaceApi() {
              queue(api, arguments);
            };

            api.q = api.q || [];

            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              queue(cal.ns[namespace], args);
              queue(cal, ['initNamespace', namespace]);
            } else {
              queue(cal, args);
            }

            return;
          }

          queue(cal, args);
        };
    };

    queueCalBootstrap();
    bootstrapCal();

    return () => {
      container.innerHTML = '';
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
        <div className="sectionHeading reveal">
          <p className="sectionHeading__eyebrow">Reach out</p>
          <h2 className="sectionHeading__title">
            Book time directly in the calendar.
          </h2>
          <p className="sectionHeading__body">
            The scheduler is placed below in its own full-width section. If you
            want to send context before the call, email hello@criyx.com.
          </p>
        </div>
        <div className="calEmbedPanel reveal reveal--delay-1">
          <div className="calEmbed" id={CAL_CONTAINER_ID}>
            <p className="calEmbed__fallback">Loading calendar...</p>
          </div>
        </div>
      </section>
    </section>
  );
}
