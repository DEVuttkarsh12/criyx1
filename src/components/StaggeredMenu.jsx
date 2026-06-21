import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

const isExternalLink = (link) =>
  /^(https?:\/\/|mailto:|tel:)/i.test(link ?? '');

const getPanelAxis = (position) => {
  if (position === 'left') {
    return { property: 'xPercent', offscreen: -100 };
  }

  if (position === 'right') {
    return { property: 'xPercent', offscreen: 100 };
  }

  return { property: 'yPercent', offscreen: 100 };
};

export default function StaggeredMenu({
  position = 'right',
  colors = ['#4a2215', '#151515'],
  items = [],
  secondaryItems = [],
  secondaryTitle = 'Our Products',
  eyebrow,
  title,
  description,
  displayItemNumbering = true,
  className,
  panelId = 'staggered-menu-panel',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#a75425',
  changeMenuColorOnOpen = true,
  closeOnClickAway = true,
  open: controlledOpen,
  defaultOpen = false,
  showToggle = true,
  onOpenChange,
  onMenuOpen,
  onMenuClose,
}) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const openRef = useRef(open);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const previousOpenRef = useRef(open);

  const setMenuOpen = useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel) {
        return;
      }

      const preLayers = preContainer
        ? Array.from(preContainer.querySelectorAll('.sm-prelayer'))
        : [];
      const axis = getPanelAxis(position);

      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
      });
      gsap.set([panel, ...preLayers], {
        [axis.property]: axis.offscreen,
        opacity: 1,
      });
      if (plusH) {
        gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      }
      if (plusV) {
        gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      }
      if (icon) {
        gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      }
      if (textInner) {
        gsap.set(textInner, { yPercent: 0 });
      }
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      return null;
    }

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
    );
    const secondaryTitleEl = panel.querySelector('.sm-secondary-title');
    const secondaryLinks = Array.from(panel.querySelectorAll('.sm-secondary-link'));
    const axis = getPanelAxis(position);

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (secondaryTitleEl) {
      gsap.set(secondaryTitleEl, { opacity: 0, y: 14 });
    }
    if (secondaryLinks.length) {
      gsap.set(secondaryLinks, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { [axis.property]: axis.offscreen },
        { [axis.property]: 0, duration: 0.46, ease: 'power4.out' },
        index * 0.07,
      );
    });

    const layerDelay = layers.length ? (layers.length - 1) * 0.07 + 0.06 : 0;

    tl.fromTo(
      panel,
      { [axis.property]: axis.offscreen },
      { [axis.property]: 0, duration: 0.62, ease: 'power4.out' },
      layerDelay,
    );

    tl.to(
      itemEls,
      {
        yPercent: 0,
        rotate: 0,
        duration: 0.95,
        ease: 'power4.out',
        stagger: 0.08,
      },
      layerDelay + 0.12,
    );

    if (numberEls.length) {
      tl.to(
        numberEls,
        {
          duration: 0.52,
          ease: 'power2.out',
          '--sm-num-opacity': 1,
          stagger: 0.07,
        },
        layerDelay + 0.22,
      );
    }

    if (secondaryTitleEl) {
      tl.to(
        secondaryTitleEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        },
        layerDelay + 0.36,
      );
    }

    if (secondaryLinks.length) {
      tl.to(
        secondaryLinks,
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          ease: 'power3.out',
          stagger: 0.05,
        },
        layerDelay + 0.42,
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    const tl = buildOpenTimeline();

    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback('onComplete', () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    if (!panel) {
      return;
    }

    const axis = getPanelAxis(position);
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...layers, panel], {
      [axis.property]: axis.offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
        );
        const secondaryTitleEl = panel.querySelector('.sm-secondary-title');
        const secondaryLinks = Array.from(panel.querySelectorAll('.sm-secondary-link'));

        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        if (secondaryTitleEl) {
          gsap.set(secondaryTitleEl, { opacity: 0, y: 14 });
        }
        if (secondaryLinks.length) {
          gsap.set(secondaryLinks, { opacity: 0, y: 20 });
        }

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;

    if (!icon) {
      return;
    }

    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.78 : 0.34,
      ease: opening ? 'power4.out' : 'power3.inOut',
      overwrite: 'auto',
    });
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const button = toggleBtnRef.current;

      if (!button) {
        return;
      }

      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        colorTweenRef.current = gsap.to(button, {
          color: opening ? openMenuButtonColor : menuButtonColor,
          duration: 0.28,
          ease: 'power2.out',
        });
        return;
      }

      gsap.set(button, { color: menuButtonColor });
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  );

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;

    if (!inner) {
      return;
    }

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const sequence = [currentLabel, targetLabel, targetLabel];

    setTextLines(sequence);
    gsap.set(inner, { yPercent: 0 });

    const finalShift = ((sequence.length - 1) / sequence.length) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.46,
      ease: 'power4.out',
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current) {
      return;
    }

    setMenuOpen(false);
  }, [setMenuOpen]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    setMenuOpen(target);
  }, [setMenuOpen]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    if (open) {
      playOpen();
      onMenuOpen?.();
      if (showToggle) {
        animateIcon(true);
        animateColor(true);
        animateText(true);
      }
    }
  }, []);

  useEffect(() => {
    if (open === previousOpenRef.current) {
      return;
    }

    previousOpenRef.current = open;

    if (open) {
      playOpen();
      onMenuOpen?.();
    } else {
      playClose();
      onMenuClose?.();
    }

    if (showToggle) {
      animateIcon(open);
      animateColor(open);
      animateText(open);
    }
  }, [
    animateColor,
    animateIcon,
    animateText,
    onMenuClose,
    onMenuOpen,
    open,
    playClose,
    playOpen,
    showToggle,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (!panelRef.current || panelRef.current.contains(event.target)) {
        return;
      }

      if (toggleBtnRef.current?.contains(event.target)) {
        return;
      }

      closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu, closeOnClickAway, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeMenu, open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocumentOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocumentOverflow;
    };
  }, [open]);

  const renderNavLink = (item, classNameValue, content) => {
    if (isExternalLink(item.link)) {
      return (
        <a
          aria-label={item.ariaLabel}
          className={`${classNameValue} cursor-target`}
          href={item.link}
          onClick={closeMenu}
          rel="noreferrer"
          target="_blank"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        aria-label={item.ariaLabel}
        className={`${classNameValue} cursor-target`}
        onClick={closeMenu}
        to={item.link}
      >
        {content}
      </Link>
    );
  };

  return (
    <div
      className={`staggered-menu-wrapper${className ? ` ${className}` : ''}`}
      data-open={open || undefined}
      data-position={position}
      style={{ '--sm-accent': accentColor }}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {colors.map((color, index) => (
          <div
            className="sm-prelayer"
            key={`${color}-${index}`}
            style={{ background: color }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="sm-backdrop"
        onClick={closeMenu}
      />

      {showToggle ? (
        <button
          ref={toggleBtnRef}
          aria-controls={panelId}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="sm-toggle"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((line, index) => (
                <span className="sm-toggle-line" key={`${line}-${index}`}>
                  {line}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      ) : null}

      <aside
        id={panelId}
        ref={panelRef}
        aria-hidden={!open}
        className="staggered-menu-panel"
      >
        <div className="sm-panel-inner">
          {eyebrow || title || description ? (
            <div className="sm-panel-header">
              {eyebrow ? <p className="sm-panel-eyebrow">{eyebrow}</p> : null}
              {title ? <h2 className="sm-panel-heading">{title}</h2> : null}
              {description ? <p className="sm-panel-description">{description}</p> : null}
            </div>
          ) : null}
          <ul
            className="sm-panel-list"
            data-numbering={displayItemNumbering || undefined}
            role="list"
          >
            {items.map((item, index) => (
              <li className="sm-panel-itemWrap" key={`${item.label}-${index}`}>
                {renderNavLink(
                  item,
                  'sm-panel-item',
                  <>
                    <span className="sm-panel-itemCopy">
                      <span className="sm-panel-itemLabel">{item.label}</span>
                      {item.description ? (
                        <span className="sm-panel-itemDescription">{item.description}</span>
                      ) : null}
                    </span>
                    <span className="sm-panel-itemArrow" aria-hidden="true">
                      ↗
                    </span>
                  </>,
                )}
              </li>
            ))}
          </ul>

          {secondaryItems.length ? (
            <div className="sm-secondary" aria-label={secondaryTitle}>
              <p className="sm-secondary-title">{secondaryTitle}</p>
              <div className="sm-secondary-grid">
                {secondaryItems.map((item, index) => (
                  <div className="sm-secondary-item" key={`${item.label}-${index}`}>
                    {renderNavLink(
                      item,
                      'sm-secondary-link',
                      <>
                        <span className="sm-secondary-linkMeta">
                          {item.meta ?? `Link ${String(index + 1).padStart(2, '0')}`}
                        </span>
                        <span className="sm-secondary-linkLabel">{item.label}</span>
                        <span className="sm-secondary-linkArrow" aria-hidden="true">
                          ↗
                        </span>
                      </>,
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
