import { Link } from 'react-router-dom';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="siteFooter__inner">
        <div className="siteFooter__brandBlock">
          <p className="siteFooter__eyebrow">Criyx</p>
          <h2 className="siteFooter__title">
            AI systems for businesses that care about execution.
          </h2>
          <p className="siteFooter__body">
            Workflow-first automation, voice systems, agents, and operator-facing
            software built to hold up under real usage.
          </p>
          <div className="siteFooter__actions">
            <Link className="siteFooter__cta cursor-target" to="/contact">
              Start a conversation
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <a
              className="siteFooter__secondary cursor-target"
              href="mailto:founder@criyx.ai"
            >
              founder@criyx.ai
            </a>
          </div>
        </div>

        <div className="siteFooter__infoGrid">
          <div className="siteFooter__infoBlock">
            <p className="siteFooter__infoLabel">Focus</p>
            <p className="siteFooter__infoText">
              AI automation, voice systems, custom apps, and workflow design.
            </p>
          </div>
          <div className="siteFooter__infoBlock">
            <p className="siteFooter__infoLabel">Founder</p>
            <a
              className="siteFooter__infoLink cursor-target"
              href="https://www.instagram.com/diksh0nt/"
              rel="noreferrer"
              target="_blank"
            >
              Dikshant Vashisth
            </a>
          </div>
          <div className="siteFooter__infoBlock">
            <p className="siteFooter__infoLabel">Approach</p>
            <p className="siteFooter__infoText">
              Built for teams that need systems to stay useful after launch.
            </p>
          </div>
        </div>
      </div>

      <div className="siteFooter__bottom">
        <p className="siteFooter__bottomText">© {year} Criyx</p>
        <p className="siteFooter__bottomText">
          Designed around execution, not presentation theater.
        </p>
      </div>
    </footer>
  );
}
