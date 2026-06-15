import { Link, NavLink, useLocation } from 'react-router-dom';
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
              <NavLink
                className={({ isActive }) =>
                  `siteNav__link${isActive ? ' siteNav__link--active' : ''}`
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Link
        className={`button button--accent siteHeader__cta${location.pathname === '/contact' ? ' button--active' : ''}`}
        to="/contact"
      >
        Contact Us
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </header>
  );
}
