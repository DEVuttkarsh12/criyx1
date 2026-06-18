import { useEffect, useState } from 'react';
import Entropy from './Entropy';
import './EntropyBackdrop.css';

export default function EntropyBackdrop({ prefersReducedMotion = false }) {
  const [size, setSize] = useState(400);

  useEffect(() => {
    const updateSize = () => {
      const nextSize = Math.max(window.innerWidth, window.innerHeight) * 0.92;
      setSize(Math.max(360, Math.round(nextSize)));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div className="entropyBackdrop" aria-hidden="true">
      <div className="entropyBackdrop__stage">
        <Entropy
          className="entropyBackdrop__entropy"
          size={size}
          disableAnimation={prefersReducedMotion}
        />
      </div>
      <div className="entropyBackdrop__glow" />
      <div className="entropyBackdrop__vignette" />
    </div>
  );
}
