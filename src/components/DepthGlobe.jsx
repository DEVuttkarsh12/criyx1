import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  HalfFloatType,
  MeshStandardMaterial,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './DepthGlobe.css';

const GLOBE_DATA_BASE = '/depth-globe-data';
const BINARY_URLS = {
  low: `${GLOBE_DATA_BASE}/globe_low.bin`,
  medium: `${GLOBE_DATA_BASE}/globe_medium.bin`,
  high: `${GLOBE_DATA_BASE}/globe_medium.bin`,
};
const MAX_ELEVATION = 6000;
const GLOBE_RADIUS = 1;
const BASE_CAMERA_DISTANCE = 5.2;

const defaultSceneState = {
  animate: true,
  autoRotate: true,
  runAnimation: true,
  scale: 1,
  backgroundColor: 'transparent',
  landColor: '#fff0d1',
  waterColor: '#0d111a',
  blendFactor: 0.96,
  scaleFactor: 0.3,
  opacity: 0.81,
  bloomRadius: 0.48,
  bloomStrength: 0.6,
  bloomThreshold: 0,
  lightColor: '#ffd0b8',
  lightIntensity: 0.9,
  toneMappingExposure: 1,
  particleSize: 1,
  edgeSoftness: 0.5,
  smoothing: 0.6,
  quality: 1,
  autoRotateSpeed: 0.3,
  points: null,
  geometryData: null,
};

const DepthGlobeSceneContext = createContext(defaultSceneState);

function DepthGlobeSceneProvider({ children, value }) {
  return (
    <DepthGlobeSceneContext.Provider value={value}>
      {children}
    </DepthGlobeSceneContext.Provider>
  );
}

function useDepthGlobeScene() {
  return useContext(DepthGlobeSceneContext);
}

function coordinatesToUnitDirection(lat, lon) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lon) * Math.PI) / 180;

  return [
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  ];
}

function scaleElevation(elevation, scalingFactor, gamma) {
  const t = Math.max(0, Math.min(1, elevation / MAX_ELEVATION));
  return Math.pow(t, gamma) * scalingFactor;
}

function pointGeometryShared(samples) {
  const directions = [];
  const elevations = [];
  const landMask = [];

  for (const [lat, lon, elevation, land] of samples) {
    const [dx, dy, dz] = coordinatesToUnitDirection(lat, lon);
    directions.push(dx, dy, dz);
    elevations.push(land ? scaleElevation(elevation, 1, 1) : 0);
    landMask.push(land);
  }

  return pointGeometryFromArrays({
    directions: new Float32Array(directions),
    elevations: new Float32Array(elevations),
    landMask: new Float32Array(landMask),
  });
}

function pointGeometryFromArrays(data) {
  const { directions, elevations, landMask } = data;
  const geometry = new BufferGeometry();
  geometry.setAttribute('direction', new Float32BufferAttribute(directions, 3));
  geometry.setAttribute('elevation', new Float32BufferAttribute(elevations, 1));
  geometry.setAttribute('land', new Float32BufferAttribute(landMask, 1));
  geometry.setAttribute(
    'position',
    new Float32BufferAttribute(new Float32Array(directions.length), 3),
  );
  return geometry;
}

const pointVertexShader = `
  attribute vec3 direction;
  attribute float elevation;
  attribute float land;
  uniform float uRadius;
  uniform float uScale;
  uniform float uTime;
  uniform float uAnimate;
  uniform float uPixelRatio;
  uniform float uParticleSize;
  uniform vec3 uCameraDelta;
  varying float vElevation;
  varying float vLand;
  varying float vPhase;
  varying vec3 vNormal;

  void main() {
    vElevation = elevation;
    vLand = land;
    vNormal = normalize(direction);

    float baseRadius = uRadius + elevation * uScale * 0.84;
    float targetRadius = uRadius + elevation * uScale;
    float distance = targetRadius - baseRadius;
    float hash = fract(sin(dot(direction, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
    float offset = fract(hash + elevation * 0.36);
    float phase = fract(uTime / 3.6 + offset);
    vPhase = phase;

    float easedT = phase * phase * (3.0 - phase * 2.1);
    float wobbleAmount = 0.006;
    float elevationWobbleScale = 1.0 + elevation * 3.0;
    vec3 wobbleAxis = normalize(
      cross(direction, vec3(0.3, 1.0, 0.3)) +
      cross(direction, vec3(1.0, 0.3, 0.3))
    );
    float wobbleSignal = sin(uTime * 3.0 + hash * 6.0);
    float wobbleEnvelope = easedT * (1.0 - easedT);
    vec3 wobble = wobbleAxis * wobbleSignal * wobbleEnvelope * wobbleAmount * elevationWobbleScale * land;

    float wobbledRadius = baseRadius + distance * easedT;
    vec3 wobbledPosition = vec3(wobbledRadius) + wobble;
    vec3 targetRadiusVec = vec3(targetRadius);
    vec3 animatedPosition = targetRadiusVec + (wobbledPosition - targetRadiusVec) * uAnimate;
    vec3 worldPosition = animatedPosition * direction;

    vec3 cameraMotion = -uCameraDelta;
    vec3 viewDir = normalize(worldPosition) + wobble * 150.0;
    vec3 lateralMotion = cameraMotion - viewDir * dot(cameraMotion, viewDir);

    float blurElevation = 0.03;
    float blurFade = 0.3;
    float elevationMask = smoothstep(blurElevation, blurElevation + blurFade, elevation);
    float blurFactor = (elevation * uScale * 9.0 + length(wobble) * uScale) * elevationMask * uAnimate;
    worldPosition += lateralMotion * blurFactor;

    vec4 mvPosition = modelViewMatrix * vec4(worldPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float baseSize = max(0.65 * uPixelRatio, 1.2 * uPixelRatio * (4.0 / -mvPosition.z));
    gl_PointSize = baseSize * uParticleSize;
  }
`;

const pointFragmentShader = `
  uniform vec3 uLandColor;
  uniform vec3 uWaterColor;
  uniform float uBlendFactor;
  uniform float uAnimate;
  uniform float uEdgeSoftness;
  varying float vElevation;
  varying float vLand;
  varying float vPhase;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;

    float fadeThreshold = 0.69;
    float rawFade = clamp((vPhase - fadeThreshold) / (1.0 - fadeThreshold), 0.0, 1.0);
    float smoothFade = rawFade * rawFade * (3.0 - rawFade * 2.0);
    float fadeMask = vElevation >= fadeThreshold ? 1.0 : 0.0;
    float fade = 1.0 - smoothFade * fadeMask * uAnimate;

    vec3 landLow = uLandColor * (1.0 - uBlendFactor) + uWaterColor * uBlendFactor;
    vec3 landElevated = landLow + (uLandColor - landLow) * vElevation;
    vec3 color = (vLand > 0.5 ? landElevated : uWaterColor) * fade;

    float softWidth = mix(0.02, 0.2 * uEdgeSoftness, vElevation);
    float alpha = 1.0 - smoothstep(0.5 - softWidth, 0.5, dist);
    if (alpha <= 0.0) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

function resolveTokenColor(input) {
  return input ?? '#000000';
}

function parseColorToRgb(input) {
  if (!input || input.trim() === '') {
    return { r: 0, g: 0, b: 0 };
  }

  const str = resolveTokenColor(input).trim();
  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i,
  );

  if (rgbaMatch) {
    return {
      r: Math.max(0, Math.min(255, Number.parseFloat(rgbaMatch[1]))) / 255,
      g: Math.max(0, Math.min(255, Number.parseFloat(rgbaMatch[2]))) / 255,
      b: Math.max(0, Math.min(255, Number.parseFloat(rgbaMatch[3]))) / 255,
    };
  }

  const hex = str.replace(/^#/, '');

  if (hex.length === 6) {
    return {
      r: Number.parseInt(hex.slice(0, 2), 16) / 255,
      g: Number.parseInt(hex.slice(2, 4), 16) / 255,
      b: Number.parseInt(hex.slice(4, 6), 16) / 255,
    };
  }

  if (hex.length === 3) {
    return {
      r: Number.parseInt(hex[0] + hex[0], 16) / 255,
      g: Number.parseInt(hex[1] + hex[1], 16) / 255,
      b: Number.parseInt(hex[2] + hex[2], 16) / 255,
    };
  }

  return { r: 0, g: 0, b: 0 };
}

function createPointsMaterial(state, pixelRatio) {
  const landRgb = parseColorToRgb(state.landColor);
  const waterRgb = parseColorToRgb(state.waterColor);

  return new ShaderMaterial({
    transparent: true,
    depthWrite: true,
    vertexShader: pointVertexShader,
    fragmentShader: pointFragmentShader,
    uniforms: {
      uRadius: { value: GLOBE_RADIUS },
      uScale: { value: state.scaleFactor },
      uTime: { value: 0 },
      uAnimate: { value: state.animate ? 1 : 0 },
      uPixelRatio: { value: pixelRatio },
      uParticleSize: { value: state.particleSize },
      uEdgeSoftness: { value: state.edgeSoftness },
      uCameraDelta: { value: new Vector3(0, 0, 0) },
      uLandColor: { value: [landRgb.r, landRgb.g, landRgb.b] },
      uWaterColor: { value: [waterRgb.r, waterRgb.g, waterRgb.b] },
      uBlendFactor: { value: state.blendFactor },
    },
  });
}

function createWaterMaterial(state) {
  return new MeshStandardMaterial({
    color: new Color(state.waterColor),
    opacity: state.opacity,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
  });
}

function createWaterGeometry() {
  return new SphereGeometry(GLOBE_RADIUS * 0.999, 96, 96);
}

function GlobeWebGL() {
  const state = useDepthGlobeScene();
  const { camera, gl } = useThree();
  const pointsMaterialRef = useRef(null);
  const waterMaterialRef = useRef(null);
  const previousCameraPosition = useRef(new Vector3());
  const smoothedCameraDelta = useRef(new Vector3());
  const cameraDelta = useRef(new Vector3());
  const points = state.points;
  const geometryData = state.geometryData;
  const hasData = geometryData || (points && points.length > 0);

  const geometry = useMemo(() => {
    if (geometryData) {
      return pointGeometryFromArrays(geometryData);
    }

    if (points && points.length > 0) {
      return pointGeometryShared(points);
    }

    return null;
  }, [geometryData, points]);

  const pixelRatio = gl.getPixelRatio();
  const pointsMaterial = useMemo(() => {
    const material = createPointsMaterial(
      {
        landColor: state.landColor,
        waterColor: state.waterColor,
        blendFactor: state.blendFactor,
        scaleFactor: state.scaleFactor,
        particleSize: state.particleSize,
        edgeSoftness: state.edgeSoftness,
        animate: state.animate,
      },
      pixelRatio,
    );

    pointsMaterialRef.current = material;
    return material;
  }, []);

  const waterMaterial = useMemo(() => {
    const material = createWaterMaterial({
      waterColor: state.waterColor,
      opacity: state.opacity,
    });

    waterMaterialRef.current = material;
    return material;
  }, []);

  const waterGeometry = useMemo(() => createWaterGeometry(), []);

  useEffect(() => {
    pointsMaterialRef.current = pointsMaterial;
    waterMaterialRef.current = waterMaterial;
  }, [pointsMaterial, waterMaterial]);

  useFrame((_, delta) => {
    const pointsMaterialCurrent = pointsMaterialRef.current;
    const waterMaterialCurrent = waterMaterialRef.current;

    if (!pointsMaterialCurrent || !waterMaterialCurrent) {
      return;
    }

    const time = performance.now() * 0.001;
    pointsMaterialCurrent.uniforms.uTime.value = time;
    pointsMaterialCurrent.uniforms.uScale.value = state.scaleFactor;
    pointsMaterialCurrent.uniforms.uAnimate.value = state.animate ? 1 : 0;
    pointsMaterialCurrent.uniforms.uBlendFactor.value = state.blendFactor;
    pointsMaterialCurrent.uniforms.uParticleSize.value = state.particleSize;
    pointsMaterialCurrent.uniforms.uEdgeSoftness.value = state.edgeSoftness;

    const landRgb = parseColorToRgb(state.landColor);
    const waterRgb = parseColorToRgb(state.waterColor);
    pointsMaterialCurrent.uniforms.uLandColor.value = [
      landRgb.r,
      landRgb.g,
      landRgb.b,
    ];
    pointsMaterialCurrent.uniforms.uWaterColor.value = [
      waterRgb.r,
      waterRgb.g,
      waterRgb.b,
    ];

    if (!state.animate) {
      smoothedCameraDelta.current.set(0, 0, 0);
    } else if (previousCameraPosition.current.lengthSq() > 0) {
      cameraDelta.current.subVectors(camera.position, previousCameraPosition.current);
      const alpha = 1 - Math.exp(-6 * Math.min(delta, 0.24));
      smoothedCameraDelta.current.lerp(cameraDelta.current, alpha);
      smoothedCameraDelta.current.clampLength(0, 0.24);
    }

    pointsMaterialCurrent.uniforms.uCameraDelta.value.copy(
      smoothedCameraDelta.current,
    );
    previousCameraPosition.current.copy(camera.position);

    waterMaterialCurrent.color.set(state.waterColor);
    waterMaterialCurrent.opacity = state.opacity;
  });

  if (!geometry || !hasData) {
    return (
      <mesh geometry={waterGeometry}>
        <primitive attach="material" object={waterMaterial} />
      </mesh>
    );
  }

  return (
    <>
      <points renderOrder={0} rotation={[0, 3.45, 0]}>
        <primitive attach="geometry" object={geometry} />
        <primitive attach="material" object={pointsMaterial} />
      </points>
      <mesh geometry={waterGeometry} renderOrder={1}>
        <primitive attach="material" object={waterMaterial} />
      </mesh>
    </>
  );
}

function PostProcessingWebGL({ children }) {
  const { camera, gl, scene, size } = useThree();
  const state = useDepthGlobeScene();
  const composerRef = useRef(null);
  const bloomPassRef = useRef(null);

  useEffect(() => {
    const renderTarget = new WebGLRenderTarget(size.width, size.height, {
      stencilBuffer: false,
      type: HalfFloatType,
    });
    renderTarget.texture.colorSpace = SRGBColorSpace;

    const composer = new EffectComposer(gl, renderTarget);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new Vector2(size.width, size.height),
      state.bloomStrength,
      state.bloomRadius,
      state.bloomThreshold,
    );
    composer.addPass(bloomPass);
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(gl.getPixelRatio());

    composerRef.current = composer;
    bloomPassRef.current = bloomPass;

    return () => {
      composer.dispose();
      renderTarget.dispose();
      composerRef.current = null;
      bloomPassRef.current = null;
    };
  }, [camera, gl, scene, size.height, size.width, state.bloomRadius, state.bloomStrength, state.bloomThreshold]);

  useFrame(() => {
    const composer = composerRef.current;
    const bloomPass = bloomPassRef.current;

    if (!composer || !bloomPass) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio * state.quality, 3);
    gl.setPixelRatio(pixelRatio);
    composer.setSize(size.width, size.height);
    composer.setPixelRatio(pixelRatio);
    bloomPass.resolution.set(size.width, size.height);
    bloomPass.strength = state.bloomStrength;
    bloomPass.radius = state.bloomRadius;
    bloomPass.threshold = state.bloomThreshold;
    composer.render();
  }, 1);

  return <>{children}</>;
}

function CameraController() {
  const { camera } = useThree();
  const state = useDepthGlobeScene();

  useEffect(() => {
    const distance = BASE_CAMERA_DISTANCE / state.scale;
    const direction = new Vector3(0, 1, 5.1).normalize();
    camera.position.copy(direction).multiplyScalar(distance);
    camera.lookAt(0, 0, 0);
  }, [camera, state.scale]);

  return null;
}

function SceneWebGL() {
  const state = useDepthGlobeScene();
  const { camera, gl, invalidate, scene } = useThree();
  const controlsRef = useRef(null);
  const lightRef = useRef(null);
  const colorRef = useRef(new Color(state.backgroundColor ?? '#0d0d0d'));

  if (!lightRef.current) {
    const light = new DirectionalLight('#ffffff', 0.6);
    light.position.set(0, -6, -3);
    lightRef.current = light;
  }

  useEffect(() => {
    const light = lightRef.current;
    camera.add(light);
    scene.add(camera);

    return () => {
      camera.remove(light);
      scene.remove(camera);
    };
  }, [camera, scene]);

  useEffect(() => {
    if (!state.backgroundColor || state.backgroundColor === 'transparent') {
      scene.background = null;
      return;
    }

    colorRef.current.set(state.backgroundColor);
    scene.background = colorRef.current;
  }, [scene, state.backgroundColor]);

  useEffect(() => {
    gl.toneMappingExposure = state.toneMappingExposure;
  }, [gl, state.toneMappingExposure]);

  useEffect(() => {
    const controls = new OrbitControlsImpl(camera, gl.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controlsRef.current = controls;

    return () => {
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, gl]);

  useEffect(() => {
    if (!controlsRef.current) {
      return;
    }

    controlsRef.current.autoRotate = state.autoRotate;
    controlsRef.current.autoRotateSpeed = state.autoRotateSpeed;
  }, [state.autoRotate, state.autoRotateSpeed]);

  useFrame(() => {
    if (!state.runAnimation) {
      return;
    }

    if (state.autoRotate && controlsRef.current) {
      controlsRef.current.update();
      invalidate();
      return;
    }

    if (state.animate) {
      invalidate();
    }
  });

  return (
    <>
      <CameraController />
      <ambientLight intensity={state.lightIntensity / 2} />
      <directionalLight
        color={state.lightColor}
        intensity={state.lightIntensity}
        position={[1.2, 0, 0.66]}
      />
      <GlobeWebGL />
    </>
  );
}

function useDepthGlobeData(pointsCount) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let worker = null;
    let objectUrl = null;

    setLoading(true);
    setError(null);
    setData(null);

    const workerCode = `
      const MAX_ELEVATION = 6000;

      function coordinatesToUnitDirection(lat, lon) {
        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((90 - lon) * Math.PI) / 180;
        return [
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        ];
      }

      function scaleElevation(elevation, scalingFactor, gamma) {
        const t = Math.max(0, Math.min(1, elevation / MAX_ELEVATION));
        return Math.pow(t, gamma) * scalingFactor;
      }

      self.onmessage = (event) => {
        const view = new Float32Array(event.data);
        const count = view.length / 4;
        const directions = new Float32Array(count * 3);
        const elevations = new Float32Array(count);
        const landMask = new Float32Array(count);

        for (let index = 0; index < count; index += 1) {
          const direction = coordinatesToUnitDirection(view[index * 4], view[index * 4 + 1]);
          directions[index * 3] = direction[0];
          directions[index * 3 + 1] = direction[1];
          directions[index * 3 + 2] = direction[2];
          elevations[index] = view[index * 4 + 3] ? scaleElevation(view[index * 4 + 2], 1, 1) : 0;
          landMask[index] = view[index * 4 + 3];
        }

        self.postMessage(
          { directions, elevations, landMask },
          [directions.buffer, elevations.buffer, landMask.buffer]
        );
      };
    `;

    const runBinary = (buffer) => {
      objectUrl = URL.createObjectURL(
        new Blob([workerCode], { type: 'application/javascript' }),
      );
      worker = new Worker(objectUrl);

      worker.onmessage = (event) => {
        if (cancelled) {
          return;
        }

        setData({
          geometryData: {
            directions: event.data.directions,
            elevations: event.data.elevations,
            landMask: event.data.landMask,
          },
        });
        setLoading(false);
      };

      worker.onerror = () => {
        if (!cancelled) {
          setError('Failed to process globe data.');
          setLoading(false);
        }
      };

      worker.postMessage(buffer, [buffer]);
    };

    const load = async () => {
      const primaryUrl = BINARY_URLS[pointsCount];
      const fallbackUrl = BINARY_URLS.low;

      try {
        const response = await fetch(primaryUrl);

        if (response.ok) {
          const buffer = await response.arrayBuffer();

          if (!cancelled) {
            runBinary(buffer);
          }
          return;
        }
      } catch {
        // Try the low-detail local binary as a recovery path.
      }

      try {
        const fallbackResponse = await fetch(fallbackUrl);

        if (!fallbackResponse.ok) {
          throw new Error(`Failed to load globe data: ${fallbackResponse.statusText}`);
        }

        const fallbackBuffer = await fallbackResponse.arrayBuffer();

        if (!cancelled) {
          runBinary(fallbackBuffer);
        }
      } catch (fallbackError) {
        if (!cancelled) {
          setError(fallbackError.message || 'Failed to load globe data.');
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;

      if (worker) {
        worker.terminate();
      }

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [pointsCount]);

  return { data, error, loading };
}

function mapScaleUiToMultiplier(ui) {
  const clamped = Math.max(0, Math.min(1, ui));
  return clamped * 0.8 + 0.2;
}

export default function DepthGlobe({
  className = '',
  style,
  pointsCount = 'medium',
  globe = {},
  colors = {},
  glow = {},
  light = {},
}) {
  const { data, error, loading } = useDepthGlobeData(pointsCount);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(!document.hidden);
    };

    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const scale = globe.scale ?? 0.9;
  const sceneState = {
    animate: globe.animate ?? true,
    autoRotate: globe.autoRotate ?? true,
    autoRotateSpeed: globe.autoRotateSpeed ?? 0.3,
    runAnimation: isDocumentVisible,
    scale: mapScaleUiToMultiplier(scale),
    backgroundColor: colors.backgroundColor ?? 'transparent',
    landColor: colors.landColor ?? '#fff0d1',
    waterColor: colors.waterColor ?? '#0d111a',
    blendFactor: colors.blendFactor ?? 0.96,
    scaleFactor: globe.scaleFactor ?? 0.3,
    opacity: colors.waterOpacity ?? 0.81,
    bloomRadius: glow.bloomRadius ?? 0.48,
    bloomStrength: glow.bloomStrength ?? 0.6,
    bloomThreshold: glow.bloomThreshold ?? 0,
    lightColor: light.lightColor ?? '#ffd0b8',
    lightIntensity: light.lightIntensity ?? 0.9,
    toneMappingExposure: light.toneMappingExposure ?? 1,
    particleSize: globe.particleSize ?? 1,
    edgeSoftness: globe.edgeSoftness ?? 0.5,
    smoothing: globe.smoothing ?? 0.6,
    quality: globe.quality ?? 1,
    points: data && 'points' in data ? data.points : null,
    geometryData: data && 'geometryData' in data ? data.geometryData : null,
  };

  return (
    <div className={`depthGlobe ${className}`.trim()} style={style}>
      <div className="depthGlobe__fallback" />
      {!error ? (
        <Canvas
          camera={{ fov: 30, position: [0, 1, 5.1] }}
          className="depthGlobe__canvas"
          flat={true}
          frameloop="demand"
          gl={(defaults) => {
            const renderer = new WebGLRenderer({
              ...defaults,
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
            });
            renderer.setClearColor(0x000000, 0);
            renderer.toneMapping = ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1;
            renderer.outputColorSpace = SRGBColorSpace;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio * sceneState.quality, 3));
            return renderer;
          }}
          resize={{ offsetSize: true }}
        >
          <DepthGlobeSceneProvider value={sceneState}>
            <PostProcessingWebGL>
              <SceneWebGL />
            </PostProcessingWebGL>
          </DepthGlobeSceneProvider>
        </Canvas>
      ) : null}
    </div>
  );
}
