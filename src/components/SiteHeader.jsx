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

function MobileMenuTrigger({ isActive, label, onClick }) {
  return (
    <button
      className={`siteMobileNav__link siteMobileNav__link--trigger${
        isActive ? ' siteMobileNav__link--active' : ''
      }`}
      onClick={onClick}
      type="button"
    >
      <span>{label}</span>
      <span className="siteMobileNav__linkArrow" aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}

function MobileSubmenuPanel({ config, isOpen, onBack, onNavigate }) {
  return (
    <section
      aria-hidden={!isOpen}
      className={`siteMobileNav__subpanel${isOpen ? ' siteMobileNav__subpanel--open' : ''}`}
    >
      <div className="siteMobileNav__subpanelHeader">
        <button
          aria-label="Back to main mobile navigation"
          className="siteMobileNav__backButton"
          onClick={onBack}
          type="button"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <div className="siteMobileNav__subpanelIntro">
          <p className="siteMobileNav__subpanelEyebrow">{config.eyebrow}</p>
          <h2 className="siteMobileNav__subpanelTitle">{config.title}</h2>
          <p className="siteMobileNav__subpanelBody">{config.description}</p>
        </div>
      </div>
      <div className="siteMobileNav__subpanelList">
        {config.items.map((item) => (
          <HeaderLink
            activeClassName="siteMobileNav__link--active"
            className="siteMobileNav__link siteMobileNav__link--child"
            item={item}
            key={item.to}
            onClick={onNavigate}
          />
        ))}
      </div>
    </section>
  );
}

export default function SiteHeader() {
  const location = useLocation();
  const headerRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
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

  const mobilePanelConfigs = {
    services: {
      description: desktopPanelConfigs.services.description,
      eyebrow: 'Services',
      items: serviceNavItems,
      title: 'What Criyx builds',
    },
    products: {
      description: desktopPanelConfigs.products.description,
      eyebrow: 'Our Products',
      items: productNavItems,
      title: 'Product lineup',
    },
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSubmenu(null);
    setDesktopPanelState((current) => ({ ...current, open: false }));
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow');
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (mobileSubmenu) {
        setMobileSubmenu(null);
        return;
      }

      setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, mobileSubmenu]);

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

      <button
        aria-controls="site-mobile-menu"
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className={`siteHeader__mobileToggle${mobileMenuOpen ? ' siteHeader__mobileToggle--open' : ''}`}
        onClick={() => {
          setMobileMenuOpen((open) => {
            const nextOpen = !open;

            if (!nextOpen) {
              setMobileSubmenu(null);
            }

            return nextOpen;
          });
        }}
        type="button"
      >
        <span className="siteHeader__mobileToggleBars" aria-hidden="true">
          <span className="siteHeader__mobileToggleBar" />
          <span className="siteHeader__mobileToggleBar" />
          <span className="siteHeader__mobileToggleBar" />
        </span>
      </button>

      <div
        aria-hidden={!mobileMenuOpen}
        className={`siteMobileNav${mobileMenuOpen ? ' siteMobileNav--open' : ''}${
          mobileSubmenu ? ' siteMobileNav--submenuOpen' : ''
        }`}
        id="site-mobile-menu"
      >
        <button
          className="siteMobileNav__backdrop"
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileSubmenu(null);
          }}
          tabIndex={-1}
          type="button"
        />
        <div className="siteMobileNav__frame">
          <div className="siteMobileNav__panel">
            <div className="siteMobileNav__panelHeader">
              <p className="siteMobileNav__eyebrow">Navigation</p>
              <p className="siteMobileNav__panelTitle">
                Move through services, products, and the rest of the site.
              </p>
            </div>

            <div className="siteMobileNav__primaryList">
              <MobileMenuTrigger
                isActive={location.pathname.startsWith('/services')}
                label="Services"
                onClick={() => setMobileSubmenu('services')}
              />
              <MobileMenuTrigger
                isActive={location.pathname.startsWith('/products')}
                label="Our Products"
                onClick={() => setMobileSubmenu('products')}
              />
            </div>

            <div className="siteMobileNav__primaryList">
              {navItems.map((item) => (
                <HeaderLink
                  activeClassName="siteMobileNav__link--active"
                  className="siteMobileNav__link"
                  item={item}
                  key={item.to}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileSubmenu(null);
                  }}
                />
              ))}
            </div>
          </div>

          {Object.entries(mobilePanelConfigs).map(([key, config]) => (
            <MobileSubmenuPanel
              config={config}
              isOpen={mobileSubmenu === key}
              key={key}
              onBack={() => setMobileSubmenu(null)}
              onNavigate={() => {
                setMobileMenuOpen(false);
                setMobileSubmenu(null);
              }}
            />
          ))}
        </div>
      </div>

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
