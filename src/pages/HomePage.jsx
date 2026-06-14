import { Link } from 'react-router-dom';
import { technologies } from '../data/siteContent';

export default function HomePage() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="hero">
      <div className="hero__content">
        <p className="hero__badge">Trusted by +21 companies like yours</p>
        <h1 className="hero__title" id="hero-title">
          <span className="hero__titleBrand">Criyx</span>
          <span className="hero__titleLine">AI-Driven Solutions</span>
          <span className="hero__titleLine">for Modern</span>
          <span className="hero__titleLine">Businesses</span>
        </h1>
        <div className="hero__actions">
          <Link className="button button--secondary" to="/services">
            Services
            <span aria-hidden="true">-&gt;</span>
          </Link>
          <Link className="button button--primary" to="/contact">
            Contact Us
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <p className="hero__description">
          Our platform simplifies data, uncovers trends, and helps you make
          faster, informed decisions tailored for growth-focused teams.
        </p>
        <section
          className="hero__technologies"
          aria-labelledby="technologies-title"
          id="technologies"
        >
          <h2 className="hero__technologiesTitle" id="technologies-title">
            Our Core Technologies
          </h2>
          <ul className="techGrid">
            {technologies.map((technology) => (
              <li className="techCard" key={technology.label}>
                <span className="techCard__mark" aria-hidden="true">
                  {technology.mark}
                </span>
                <span className="techCard__label">{technology.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
