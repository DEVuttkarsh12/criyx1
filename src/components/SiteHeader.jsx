import { Link, useLocation } from 'react-router-dom';
import brandLogo from '../../file.jpeg';
import { navItems } from '../data/siteContent';

export default function SiteHeader() {
  const location = useLocation();

  return (
    <header className="siteHeader">
      <Link className="brand" to="/" aria-label="Criyx home">
        <img className="brand__image" src={brandLogo} alt="" />
      </Link>
      <nav className="siteNav" aria-label="Primary">
        <ul className="siteNav__list">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                className={`siteNav__link${location.pathname === item.to ? ' siteNav__link--active' : ''}`}
                href={item.to}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className={`button button--accent siteHeader__cta${location.pathname === '/contact' ? ' button--active' : ''}`}
        href="/contact"
        target="_blank"
        rel="noreferrer"
      >
        Contact Us
        <span aria-hidden="true">-&gt;</span>
      </a>
    </header>
  );
}
