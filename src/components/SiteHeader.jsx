import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import brandLogo from '../assets/brand-logo.avif';
import StaggeredMenu from './StaggeredMenu';
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

const panelDescriptions = {
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

function DesktopPanelTrigger({ isActive, isOpen, label, onToggle, panelId }) {
  return (
    <button
      aria-controls={panelId}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={`siteNav__link siteNav__link--toggle${isActive || isOpen ? ' siteNav__link--active' : ''}`}
      onClick={onToggle}
      type="button"
    >
      <span>{label}</span>
      <span className="siteDropdown__icon" aria-hidden="true">
        v
      </span>
    </button>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopPanelState, setDesktopPanelState] = useState({
    key: null,
    open: false,
  });

  const panelId = useId();

  const buildPanelItems = (items, label) =>
    items.map((item) => ({
      ariaLabel: `Open ${item.label}`,
      description: panelDescriptions[label]?.[item.label],
      label: item.label,
      link: item.to,
    }));

  const desktopPanelConfigs = {
    services: {
      activePrefix: '/services',
      buttonLabel: 'Services',
      colors: ['#7a2e17', '#2b160f'],
      description:
        'Explore the automation systems, agent workflows, and custom builds Criyx delivers for real operating teams.',
      eyebrow: 'Explore Services',
      items: buildPanelItems(serviceNavItems, 'Services'),
      title: 'Services',
    },
    products: {
      activePrefix: '/products',
      buttonLabel: 'Our Products',
      colors: ['#7a2e17', '#2b160f'],
      description:
        'Browse the product layer behind Criyx deployments, from voice systems to internal tools and campaign execution agents.',
      eyebrow: 'Explore Products',
      items: buildPanelItems(productNavItems, 'Our Products'),
      title: 'Our Products',
    },
  };

  const activeDesktopPanel = desktopPanelState.key
    ? desktopPanelConfigs[desktopPanelState.key]
    : null;

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopPanelState((current) => ({ ...current, open: false }));
    document.querySelectorAll('.siteMobileDropdown[open]').forEach((element) => {
      element.removeAttribute('open');
    });
  }, [location.pathname]);

  const toggleDesktopPanel = (key) => {
    setDesktopPanelState((current) => {
      if (current.key === key) {
        return { ...current, open: !current.open };
      }

      return { key, open: true };
    });
  };

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
          <DesktopPanelTrigger
            isActive={location.pathname.startsWith(desktopPanelConfigs.services.activePrefix)}
            isOpen={desktopPanelState.key === 'services' && desktopPanelState.open}
            label={desktopPanelConfigs.services.buttonLabel}
            onToggle={() => toggleDesktopPanel('services')}
            panelId={panelId}
          />
          <DesktopPanelTrigger
            isActive={location.pathname.startsWith(desktopPanelConfigs.products.activePrefix)}
            isOpen={desktopPanelState.key === 'products' && desktopPanelState.open}
            label={desktopPanelConfigs.products.buttonLabel}
            onToggle={() => toggleDesktopPanel('products')}
            panelId={panelId}
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

      {activeDesktopPanel ? (
        <StaggeredMenu
          key={desktopPanelState.key}
          accentColor="#c65c37"
          className="siteHeader__panelMenu"
          colors={activeDesktopPanel.colors}
          description={activeDesktopPanel.description}
          displayItemNumbering
          eyebrow={activeDesktopPanel.eyebrow}
          items={activeDesktopPanel.items}
          onOpenChange={(open) =>
            setDesktopPanelState((current) => ({ ...current, open }))
          }
          open={desktopPanelState.open}
          panelId={panelId}
          showToggle={false}
          title={activeDesktopPanel.title}
        />
      ) : null}
    </header>
  );
}
