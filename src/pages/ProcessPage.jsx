import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { processJourney } from '../data/siteContent';

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0);
  const stageRefs = useRef([]);

  useEffect(() => {
    const stages = stageRefs.current.filter(Boolean);
    if (!stages.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const nextStep = Number(entry.target.getAttribute('data-step-index'));
          if (!Number.isNaN(nextStep)) {
            setActiveStep(nextStep);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0,
      },
    );

    stages.forEach((stage) => observer.observe(stage));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="page processPage" aria-labelledby="process-title">
      <section className="pageIntro reveal">
        <p className="pageIntro__eyebrow">Process</p>
        <h1 className="pageIntro__title" id="process-title">
          Our process is designed as a connected delivery story, so every stage
          builds logically into the next one.
        </h1>
        <p className="pageIntro__body">
          Criyx does not jump from idea to automation. We move through a
          deliberate workflow that starts with operating clarity, turns that
          clarity into a system design, and then carries the solution all the
          way through release and refinement. Scroll through the flow to see how
          each stage connects.
        </p>
        <div className="pageIntro__actions">
          <Link className="button button--primary" to="/contact">
            Start with your workflow
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--secondary" to="/why-us">
            Why Criyx
          </Link>
        </div>
      </section>

      <section className="pageSection processExperience">
        <div className="processRail reveal">
          <div className="processRail__panel">
            <p className="processRail__eyebrow">Connected flow</p>
            <h2 className="processRail__title">
              A step-by-step system that keeps the project aligned from first
              audit to long-term improvement.
            </h2>
            <div className="processMap" aria-hidden="true">
              {processJourney.map((item, index) => {
                const isActive = index === activeStep;
                const isComplete = index < activeStep;

                return (
                  <div
                    className={`processNode${isActive ? ' processNode--active' : ''}${
                      isComplete ? ' processNode--complete' : ''
                    }`}
                    key={item.step}
                  >
                    <div className="processNode__track">
                      <span className="processNode__dot" />
                      {index < processJourney.length - 1 ? (
                        <span className="processNode__line" />
                      ) : null}
                    </div>
                    <div className="processNode__copy">
                      <p className="processNode__step">{item.step}</p>
                      <p className="processNode__label">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="processStory">
          {processJourney.map((item, index) => (
            <article
              className={`processStage reveal reveal--delay-${(index % 4) + 1}${
                index === activeStep ? ' processStage--active' : ''
              }`}
              data-step-index={index}
              id={`process-step-${item.step}`}
              key={item.step}
              ref={(element) => {
                stageRefs.current[index] = element;
              }}
            >
              <div className="processStage__header">
                <p className="processStage__step">{item.step}</p>
                <p className="processStage__label">{item.label}</p>
              </div>
              <h3 className="processStage__title">{item.title}</h3>
              <p className="processStage__summary">{item.summary}</p>
              <p className="processStage__body">{item.body}</p>
              <div className="processStage__detailBlock">
                <p className="processStage__metaTitle">What this stage delivers</p>
                <ul className="detailList">
                  {item.deliverables.map((deliverable) => (
                    <li className="detailList__item" key={deliverable}>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="processStage__outcome">
                <p className="processStage__metaTitle">Why it matters</p>
                <p className="processStage__body">{item.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pageSection">
        <div className="ctaPanel reveal">
          <div className="ctaPanel__copy">
            <p className="sectionHeading__eyebrow">Next step</p>
            <h2 className="sectionHeading__title">
              If the process makes sense, the right next move is to map your
              workflow in the same level of detail.
            </h2>
            <p className="sectionHeading__body">
              That is how we decide what to automate, where AI belongs, and what
              the first useful implementation should be.
            </p>
          </div>
          <div className="ctaPanel__actions">
            <Link className="button button--primary" to="/contact">
              Talk to Criyx
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="button button--secondary" to="/features">
              Review the feature stack
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
}
