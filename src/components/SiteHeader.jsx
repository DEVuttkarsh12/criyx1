import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import brandLogo from '../../file.jpeg';
import { navItems, productNavItems, serviceNavItems } from '../data/siteContent';

function HeaderLink({
  item,
  className = 'siteNav__link',
  activeClassName = 'siteNav__link--active',
  onClick,
}) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${className}${isActive ? ` ${activeClassName}` : ''}`
      }
      onClick={onClick}
      to={item.to}
    >
      {item.label}
    </NavLink>
  );
}

const dropdownDescriptions = {
  Services: {
    'Workflow Automation': 'Systemized automations for ops-heavy handoffs.',
    'AI Voice Agent': 'Structured voice intake, support, and routing.',
    'Marketing Agent': 'Campaign operations with review-ready outputs.',
    'Custom Apps': 'Operator-facing tools around your AI workflows.',
  },
  'Our Products': {
    'AI Voice Agent': 'Voice-first qualification, intake, and support.',
    'Marketing Agent': 'An execution layer for campaign teams.',
    'Content Generator': 'Structured content production without chaos.',
    'Exhibition WhatsApp': 'Event lead capture with immediate follow-up.',
    'Workflow Automation': 'Multi-step process control across your stack.',
    'Custom Apps': 'Internal products for review, action, and oversight.',
  },
};

function DropdownLink({ item, description, onClick, tabIndex }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `siteDropdown__link${isActive ? ' siteDropdown__link--active' : ''}`
      }
      onClick={onClick}
      tabIndex={tabIndex}
      to={item.to}
    >
      <span className="siteDropdown__linkCopy">
        <span className="siteDropdown__linkLabel">{item.label}</span>
        {description ? (
          <span className="siteDropdown__linkDescription">{description}</span>
        ) : null}
      </span>
      <span className="siteDropdown__linkArrow" aria-hidden="true">
        -&gt;
      </span>
    </NavLink>
  );
}

function DesktopDropdown({ isOpen, items, label, activePrefix, onItemClick, onToggle }) {
  const location = useLocation();
  const menuId = useId();
  const isActive = location.pathname.startsWith(activePrefix);
  const descriptions = dropdownDescriptions[label] ?? {};

  return (
    <div
      className={`siteDropdown siteDropdown__details${isActive ? ' siteDropdown--active' : ''}${isOpen ? ' is-open' : ''}`}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="siteNav__link siteNav__link--toggle"
        onClick={onToggle}
        type="button"
      >
        <span>{label}</span>
        <span className="siteDropdown__icon" aria-hidden="true">
          v
        </span>
      </button>
      <div
        aria-hidden={!isOpen}
        className="siteDropdown__menu"
        id={menuId}
        role="menu"
      >
        <p className="siteDropdown__eyebrow">{label}</p>
        <div className="siteDropdown__list">
          {items.map((item) => (
            <DropdownLink
              description={descriptions[item.label]}
              item={item}
              key={item.to}
              onClick={onItemClick}
              tabIndex={isOpen ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({ label, items, onNavigate }) {
  return (
    <details className="siteMobileDropdown">
      <summary className="siteMobileDropdown__summary">
        <span>{label}</span>
        <span className="siteMobileDropdown__icon" aria-hidden="true">
          v
        </span>
      </summary>
      <div className="siteMobileDropdown__list">
        {items.map((item) => (
          <HeaderLink
            activeClassName="siteMobileNav__link--active"
            className="siteMobileNav__link siteMobileNav__link--child"
            item={item}
            key={item.to}
            onClick={onNavigate}
          />
        ))}
      </div>
    </details>
  );
}

export default function SiteHeader() {
  const location = useLocation();
  const headerRef = useRef(null);
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDesktopDropdown(null);
    document.querySelectorAll('.siteMobileDropdown[open]').forEach((element) => {
      element.removeAttribute('open');
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!activeDesktopDropdown) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (headerRef.current?.contains(event.target)) {
        return;
      }

      setActiveDesktopDropdown(null);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDesktopDropdown(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDesktopDropdown]);

  return (
    <header className="siteHeader siteHeader--classic" ref={headerRef}>
      <Link className="brand" to="/" aria-label="Criyx home">
        <span className="brand__mark" aria-hidden="true">
          <img className="brand__image" src={brandLogo} alt="" />
        </span>
        <span className="brand__name">Criyx</span>
      </Link>

      <div className="siteHeader__navWrap">
        <nav className="siteNav" aria-label="Primary">
          <DesktopDropdown
            activePrefix="/services"
            isOpen={activeDesktopDropdown === 'Services'}
            items={serviceNavItems}
            label="Services"
            onItemClick={() => setActiveDesktopDropdown(null)}
            onToggle={() =>
              setActiveDesktopDropdown((current) =>
                current === 'Services' ? null : 'Services',
              )
            }
          />
          <DesktopDropdown
            activePrefix="/products"
            isOpen={activeDesktopDropdown === 'Our Products'}
            items={productNavItems}
            label="Our Products"
            onItemClick={() => setActiveDesktopDropdown(null)}
            onToggle={() =>
              setActiveDesktopDropdown((current) =>
                current === 'Our Products' ? null : 'Our Products',
              )
            }
          />
          {navItems.map((item) => (
            <HeaderLink item={item} key={item.to} />
          ))}
        </nav>
      </div>

      <button
        aria-controls="site-mobile-menu"
        aria-expanded={mobileMenuOpen}
        className="siteHeader__mobileToggle"
        onClick={() => setMobileMenuOpen((open) => !open)}
        type="button"
      >
        {mobileMenuOpen ? 'Close' : 'Menu'}
      </button>

      {mobileMenuOpen ? (
        <div className="siteMobileNav" id="site-mobile-menu">
          <div className="siteMobileNav__panel">
            <MobileDropdown
              items={serviceNavItems}
              label="Services"
              onNavigate={() => setMobileMenuOpen(false)}
            />
            <MobileDropdown
              items={productNavItems}
              label="Our Products"
              onNavigate={() => setMobileMenuOpen(false)}
            />
            {navItems.map((item) => (
              <HeaderLink
                activeClassName="siteMobileNav__link--active"
                className="siteMobileNav__link"
                item={item}
                key={item.to}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
