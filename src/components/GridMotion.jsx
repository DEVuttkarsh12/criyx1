import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './GridMotion.css';

const TOTAL_ITEMS = 28;
const ROW_COUNT = 4;
const ITEMS_PER_ROW = 7;

function isImageSource(value) {
  return (
    typeof value === 'string' &&
    (/^(https?:)?\/\//.test(value) ||
      value.startsWith('/') ||
      value.startsWith('data:image') ||
      /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i.test(value))
  );
}

function isVectorImage(value) {
  return typeof value === 'string' && /\.svg(\?.*)?$/i.test(value);
}

function normalizeItems(items) {
  if (!items.length) {
    return Array.from({ length: TOTAL_ITEMS }, (_, index) => `Item ${index + 1}`);
  }

  return Array.from({ length: TOTAL_ITEMS }, (_, index) => items[index % items.length]);
}

export default function GridMotion({
  items = [],
  gradientColor = 'black',
  disableAnimation = false,
}) {
  const rowRefs = useRef([]);
  const mouseXRef = useRef(
    typeof window === 'undefined' ? 0 : window.innerWidth / 2,
  );
  const combinedItems = normalizeItems(items);

  useEffect(() => {
    if (disableAnimation) {
      return undefined;
    }

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (event) => {
      mouseXRef.current = event.clientX;
    };

    const handleResize = () => {
      if (window.innerWidth > 0) {
        mouseXRef.current = window.innerWidth / 2;
      }
    };

    const updateMotion = () => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (!row || window.innerWidth <= 0) {
          return;
        }

        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
            maxMoveAmount / 2) *
          direction;

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(updateMotion);
    };
  }, [disableAnimation]);

  return (
    <div className="gridMotion">
      <section
        className="gridMotion__stage"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
        }}
      >
        <div className="gridMotion__container">
          {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
            <div
              className="gridMotion__row"
              key={rowIndex}
              ref={(element) => {
                rowRefs.current[rowIndex] = element;
              }}
            >
              {Array.from({ length: ITEMS_PER_ROW }).map((__, itemIndex) => {
                const content = combinedItems[rowIndex * ITEMS_PER_ROW + itemIndex];
                const imageStyles = isImageSource(content)
                  ? {
                      backgroundImage: `url(${content})`,
                      backgroundSize: isVectorImage(content) ? '64% auto' : undefined,
                    }
                  : null;

                return (
                  <div className="gridMotion__item" key={itemIndex}>
                    <div className="gridMotion__itemInner">
                      {isImageSource(content) ? (
                        <div className="gridMotion__itemImage" style={imageStyles} />
                      ) : (
                        <div className="gridMotion__itemContent">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="gridMotion__overlay" />
      </section>
    </div>
  );
}
