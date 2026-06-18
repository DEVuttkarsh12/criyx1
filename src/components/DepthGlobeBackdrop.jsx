import './DepthGlobeBackdrop.css';

const columns = [
  { left: '4%', width: '8%', height: '62%', delay: '0s', duration: '12s', opacity: 0.5 },
  { left: '14%', width: '10%', height: '74%', delay: '-2s', duration: '14s', opacity: 0.62 },
  { left: '27%', width: '8%', height: '66%', delay: '-4s', duration: '11s', opacity: 0.48 },
  { left: '38%', width: '11%', height: '82%', delay: '-1.5s', duration: '15s', opacity: 0.88 },
  { left: '52%', width: '9%', height: '72%', delay: '-5s', duration: '13s', opacity: 0.58 },
  { left: '64%', width: '12%', height: '88%', delay: '-3s', duration: '16s', opacity: 0.96 },
  { left: '79%', width: '9%', height: '70%', delay: '-6s', duration: '12.5s', opacity: 0.56 },
  { left: '89%', width: '7%', height: '92%', delay: '-2.5s', duration: '17s', opacity: 0.92 },
];

const sparks = [
  { left: '11%', top: '57%', delay: '-1s' },
  { left: '23%', top: '50%', delay: '-4s' },
  { left: '34%', top: '61%', delay: '-2.2s' },
  { left: '48%', top: '44%', delay: '-3.2s' },
  { left: '57%', top: '54%', delay: '-5.2s' },
  { left: '71%', top: '48%', delay: '-1.8s' },
  { left: '83%', top: '59%', delay: '-4.6s' },
];

export default function DepthGlobeBackdrop({ prefersReducedMotion = false }) {
  return (
    <div
      className={`depthGlobeBackdrop${
        prefersReducedMotion ? ' depthGlobeBackdrop--reduced' : ''
      }`}
      aria-hidden="true"
    >
      <div className="depthGlobeBackdrop__ambient" />
      <div className="depthGlobeBackdrop__grooves" />
      <div className="depthGlobeBackdrop__grooveGlow" />
      <div className="depthGlobeBackdrop__columns">
        {columns.map((column) => (
          <span
            className="depthGlobeBackdrop__column"
            key={`${column.left}-${column.width}`}
            style={{
              '--column-left': column.left,
              '--column-width': column.width,
              '--column-height': column.height,
              '--column-delay': column.delay,
              '--column-duration': column.duration,
              '--column-opacity': column.opacity,
            }}
          />
        ))}
      </div>
      <div className="depthGlobeBackdrop__flowBand" />
      <div className="depthGlobeBackdrop__heat" />
      <div className="depthGlobeBackdrop__gridGlow" />
      <div className="depthGlobeBackdrop__sparks">
        {sparks.map((spark) => (
          <span
            className="depthGlobeBackdrop__spark"
            key={`${spark.left}-${spark.top}`}
            style={{
              '--spark-left': spark.left,
              '--spark-top': spark.top,
              '--spark-delay': spark.delay,
            }}
          />
        ))}
      </div>
      <div className="depthGlobeBackdrop__grain" />
      <div className="depthGlobeBackdrop__vignette" />
    </div>
  );
}
