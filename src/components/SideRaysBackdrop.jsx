import SideRays from './SideRays';
import './SideRaysBackdrop.css';

export default function SideRaysBackdrop({ prefersReducedMotion = false }) {
  return (
    <div className="sideRaysBackdrop" aria-hidden="true">
      {!prefersReducedMotion ? (
        <div className="sideRaysBackdrop__layer">
          <SideRays
            speed={1.6}
            rayColor1="#d46d38"
            rayColor2="#f3c96f"
            intensity={1.4}
            spread={1.6}
            origin="top-right"
            tilt={-8}
            saturation={1.3}
            blend={0.36}
            falloff={1.9}
            opacity={0.82}
          />
        </div>
      ) : null}
      <div className="sideRaysBackdrop__bloom" />
      <div className="sideRaysBackdrop__vignette" />
    </div>
  );
}
