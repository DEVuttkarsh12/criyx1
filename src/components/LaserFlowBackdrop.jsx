import LaserFlow from './LaserFlow';
import './LaserFlowBackdrop.css';

export default function LaserFlowBackdrop({ prefersReducedMotion = false }) {
  return (
    <div className="laserFlowBackdrop" aria-hidden="true">
      <div className="laserFlowBackdrop__layer">
        <LaserFlow
          horizontalBeamOffset={0.08}
          verticalBeamOffset={-0.02}
          horizontalSizing={0.66}
          verticalSizing={2.55}
          wispDensity={0.85}
          wispSpeed={10.5}
          wispIntensity={3.8}
          flowSpeed={0.28}
          flowStrength={0.2}
          fogIntensity={0.3}
          fogScale={0.22}
          mouseTiltStrength={0.005}
          mouseSmoothTime={0.18}
          decay={1.22}
          falloffStart={1.14}
          fogFallSpeed={0.42}
          color="#d46d38"
          disableAnimation={prefersReducedMotion}
        />
      </div>
      <div className="laserFlowBackdrop__glow" />
      <div className="laserFlowBackdrop__vignette" />
    </div>
  );
}
