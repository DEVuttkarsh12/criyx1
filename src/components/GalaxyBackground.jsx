import { useEffect, useRef } from 'react';
import './GalaxyBackground.css';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uScale;
uniform float uDistortion;
uniform float uSpeed;
uniform float uIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 c = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 d = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, c.yyy));
  vec3 x0 = v - i + dot(i, c.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + c.xxx;
  vec3 x2 = x0 - i2 + c.yyy;
  vec3 x3 = x0 - d.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n = 0.142857142857;
  vec3 ns = n * d.wyz - d.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m *= m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 x) {
  float value = 0.0;
  float amplitude = 0.5;
  vec3 shift = vec3(100.0);

  for (int i = 0; i < 2; ++i) {
    value += amplitude * snoise(x);
    x = x * 2.0 + shift;
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * uSpeed * 0.18;

  vec3 p1 = vec3(p * uScale, t);
  float n1 = fbm(p1);

  vec3 p2 = vec3(p * uScale + n1 * uDistortion, t * 1.15 + 10.0);
  float n2 = fbm(p2);

  vec3 p3 = vec3(p * uScale + n2 * uDistortion * 1.35, t * 1.35 - 10.0);
  float n3 = fbm(p3);

  float f1 = n1 * 0.5 + 0.5;
  float f2 = n2 * 0.5 + 0.5;

  float r = fbm(p3 + vec3(0.035, 0.0, 0.0));
  float g = n3;
  float b = fbm(p3 - vec3(0.035, 0.0, 0.0));
  vec3 chroma = vec3(r, g, b) * 0.5 + 0.5;

  float ridge = pow(1.0 - abs(n3), 5.5);

  vec3 base = mix(uColor1, uColor3, f1);
  vec3 mid = mix(base, uColor2, smoothstep(0.18, 0.82, f2));
  vec3 finalColor = mid + (chroma * ridge * uIntensity * uColor4);

  finalColor = pow(finalColor, vec3(0.9));
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const shaderConfig = {
  scale: 1.5,
  distortion: 0.34,
  speed: 0.3,
  intensity: 0.2,
  colors: ['#020202', '#0a0a0c', '#26272b', '#f1f1f2'],
};

export default function GalaxyBackground({ prefersReducedMotion = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    if (prefersReducedMotion) {
      return undefined;
    }

    let cancelled = false;
    let cleanup = () => {};

    void import('three').then((THREE) => {
      if (cancelled) {
        return;
      }

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.1));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.className = 'galaxyBackground__canvas';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const geometry = new THREE.PlaneGeometry(2, 2);
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uScale: { value: shaderConfig.scale },
        uDistortion: { value: shaderConfig.distortion },
        uSpeed: { value: shaderConfig.speed },
        uIntensity: { value: shaderConfig.intensity },
        uColor1: { value: new THREE.Color(shaderConfig.colors[0]) },
        uColor2: { value: new THREE.Color(shaderConfig.colors[1]) },
        uColor3: { value: new THREE.Color(shaderConfig.colors[2]) },
        uColor4: { value: new THREE.Color(shaderConfig.colors[3]) },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      let frameId = 0;
      let visible = true;
      let lastTime = performance.now();

      const updateSize = (width, height) => {
        if (width === 0 || height === 0) {
          return;
        }

        renderer.setSize(width, height, false);
        uniforms.uResolution.value.set(width, height);
      };

      updateSize(container.clientWidth, container.clientHeight);

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        updateSize(entry.contentRect.width, entry.contentRect.height);
      });

      resizeObserver.observe(container);

      const intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        visible = entry?.isIntersecting ?? true;

        if (visible) {
          lastTime = performance.now();
        }
      });

      intersectionObserver.observe(container);

      const renderLoop = (time) => {
        frameId = window.requestAnimationFrame(renderLoop);

        if (!visible) {
          return;
        }

        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (delta < 0.1) {
          uniforms.uTime.value += delta;
        }

        renderer.render(scene, camera);
      };

      frameId = window.requestAnimationFrame(renderLoop);

      cleanup = () => {
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        scene.clear();
        geometry.dispose();
        material.dispose();
        renderer.forceContextLoss();
        renderer.dispose();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="galaxyBackground" aria-hidden="true">
      <div className="galaxyBackground__fallback" />
      <div className="galaxyBackground__mount" ref={containerRef} />
      <div className="galaxyBackground__vignette" />
      <div className="galaxyBackground__grain" />
    </div>
  );
}
