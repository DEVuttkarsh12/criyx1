import { useEffect, useRef } from 'react';
import './Entropy.css';

export default function Entropy({
  className = '',
  size = 400,
  disableAnimation = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return undefined;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = size * devicePixelRatio;
    canvas.height = size * devicePixelRatio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    const particleColor = '#ffffff';

    class Particle {
      constructor(x, y, order) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = 2;
        this.order = order;
        this.velocity = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        };
        this.influence = 0;
        this.neighbors = [];
        this.driftPhase = Math.random() * Math.PI * 2;
        this.driftSpeed = 0.008 + Math.random() * 0.012;
        this.driftRadiusX = 3 + Math.random() * 8;
        this.driftRadiusY = 3 + Math.random() * 10;
      }

      update(frame) {
        if (this.order) {
          const driftX =
            Math.cos(frame * this.driftSpeed + this.driftPhase) * this.driftRadiusX;
          const driftY =
            Math.sin(frame * (this.driftSpeed * 0.82) + this.driftPhase) *
            this.driftRadiusY;
          const targetX = this.originalX + driftX;
          const targetY = this.originalY + driftY;
          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const chaosInfluence = { x: 0, y: 0 };

          this.neighbors.forEach((neighbor) => {
            if (!neighbor.order) {
              const distance = Math.hypot(this.x - neighbor.x, this.y - neighbor.y);
              const strength = Math.max(0, 1 - distance / 100);
              chaosInfluence.x += neighbor.velocity.x * strength;
              chaosInfluence.y += neighbor.velocity.y * strength;
              this.influence = Math.max(this.influence, strength);
            }
          });

          this.velocity.x +=
            (Math.random() - 0.5) * 0.5 +
            dx * 0.024 +
            chaosInfluence.x * this.influence * 0.055;
          this.velocity.y +=
            (Math.random() - 0.5) * 0.5 +
            dy * 0.024 +
            chaosInfluence.y * this.influence * 0.055;
          this.velocity.x *= 0.93;
          this.velocity.y *= 0.93;
          this.velocity.x = Math.max(-2.1, Math.min(2.1, this.velocity.x));
          this.velocity.y = Math.max(-2.1, Math.min(2.1, this.velocity.y));
          this.x += this.velocity.x;
          this.y += this.velocity.y;

          if (this.x < 0 || this.x > size / 2) {
            this.velocity.x *= -1;
          }

          if (this.y < 0 || this.y > size) {
            this.velocity.y *= -1;
          }

          this.x = Math.max(0, Math.min(size / 2, this.x));
          this.y = Math.max(0, Math.min(size, this.y));
          this.influence *= 0.99;
          return;
        }

        this.velocity.x += (Math.random() - 0.5) * 0.5;
        this.velocity.y += (Math.random() - 0.5) * 0.5;
        this.velocity.x *= 0.93;
        this.velocity.y *= 0.93;
        this.velocity.x = Math.max(-2.1, Math.min(2.1, this.velocity.x));
        this.velocity.y = Math.max(-2.1, Math.min(2.1, this.velocity.y));
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < size / 2 || this.x > size) {
          this.velocity.x *= -1;
        }

        if (this.y < 0 || this.y > size) {
          this.velocity.y *= -1;
        }

        this.x = Math.max(size / 2, Math.min(size, this.x));
        this.y = Math.max(0, Math.min(size, this.y));
      }

      draw(drawContext) {
        const alpha = this.order ? 0.8 - this.influence * 0.5 : 0.8;
        const glowAlpha = this.order ? 0.14 + this.influence * 0.08 : 0.18;
        drawContext.fillStyle = `${particleColor}${Math.round(glowAlpha * 255)
          .toString(16)
          .padStart(2, '0')}`;
        drawContext.beginPath();
        drawContext.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
        drawContext.fill();

        drawContext.shadowBlur = 6;
        drawContext.shadowColor = 'rgba(255, 255, 255, 0.7)';
        drawContext.fillStyle = `${particleColor}${Math.round(alpha * 255)
          .toString(16)
          .padStart(2, '0')}`;
        drawContext.beginPath();
        drawContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        drawContext.fill();
        drawContext.shadowBlur = 0;

        drawContext.strokeStyle = `rgba(255, 255, 255, ${this.order ? 0.22 : 0.28})`;
        drawContext.lineWidth = 0.45;
        drawContext.beginPath();
        drawContext.moveTo(this.x - this.size * 1.35, this.y);
        drawContext.lineTo(this.x + this.size * 1.35, this.y);
        drawContext.moveTo(this.x, this.y - this.size * 1.35);
        drawContext.lineTo(this.x, this.y + this.size * 1.35);
        drawContext.stroke();
      }
    }

    const particles = [];
    const totalParticles = 25 * 25;
    const particlesPerSide = Math.floor(totalParticles / 2);

    for (let index = 0; index < particlesPerSide; index += 1) {
      const x = Math.random() * (size / 2 - 24) + 12;
      const y = Math.random() * (size - 24) + 12;
      particles.push(new Particle(x, y, true));
    }

    for (let index = particlesPerSide; index < totalParticles; index += 1) {
      const x = Math.random() * (size / 2 - 24) + size / 2 + 12;
      const y = Math.random() * (size - 24) + 12;
      particles.push(new Particle(x, y, false));
    }

    const updateNeighbors = () => {
      particles.forEach((particle) => {
        particle.neighbors = particles.filter((other) => {
          if (other === particle) {
            return false;
          }

          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          return distance < 100;
        });
      });
    };

    let time = 0;
    let animationId = 0;

    const renderFrame = () => {
      context.clearRect(0, 0, size, size);

      if (time % 30 === 0) {
        updateNeighbors();
      }

      particles.forEach((particle) => {
        particle.update(time);
        particle.draw(context);

        particle.neighbors.forEach((neighbor) => {
          const distance = Math.hypot(particle.x - neighbor.x, particle.y - neighbor.y);

          if (distance < 50) {
            const alpha = 0.2 * (1 - distance / 50);
            context.strokeStyle = `${particleColor}${Math.round(alpha * 255)
              .toString(16)
              .padStart(2, '0')}`;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(neighbor.x, neighbor.y);
            context.stroke();
          }
        });
      });

      context.font = '12px monospace';
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';

      time += 1;

      if (!disableAnimation) {
        animationId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, [disableAnimation, size]);

  return (
    <div className={`entropy ${className}`.trim()} style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="entropy__canvas" />
    </div>
  );
}
