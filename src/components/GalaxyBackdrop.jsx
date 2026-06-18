import Galaxy from './Galaxy';
import './GalaxyBackdrop.css';

export default function GalaxyBackdrop({ prefersReducedMotion = false }) {
  return (
    <div className="galaxyBackdrop" aria-hidden="true">
      <div className="galaxyBackdrop__layer">
        <Galaxy
          focal={[0.52, 0.38]}
          rotation={[0.96, 0.12]}
          starSpeed={0.18}
          density={1.16}
          hueShift={24}
          disableAnimation={prefersReducedMotion}
          speed={0.72}
          mouseInteraction={!prefersReducedMotion}
          glowIntensity={0.5}
          saturation={0.36}
          mouseRepulsion={false}
          repulsionStrength={0.65}
          twinkleIntensity={0.24}
          rotationSpeed={0.03}
          autoCenterRepulsion={0}
          transparent={true}
        />
      </div>
      <div className="galaxyBackdrop__bloom" />
      <div className="galaxyBackdrop__grain" />
      <div className="galaxyBackdrop__vignette" />
    </div>
  );
}
