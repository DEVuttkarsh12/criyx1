/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { Suspense, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  Image,
  MeshTransmissionMaterial,
  Preload,
  Scroll,
  ScrollControls,
  Text,
  useFBO,
  useScroll,
} from '@react-three/drei';
import { easing } from 'maath';
import appsVisual from '../assets/service-apps-live.png';
import agentsVisual from '../assets/service-agents-live.png';
import automationVisual from '../assets/service-automation-live.png';
import voiceVisual from '../assets/service-voice-live.png';
import './FluidGlass.css';

const imageCards = [
  { url: automationVisual, position: [-2.55, 0.25, 0], scale: [3, 3.6, 1] },
  { url: voiceVisual, position: [2.4, -0.35, 2.5], scale: [2.6, 2.6, 1] },
  { url: agentsVisual, position: [-1.8, -4.2, 5.4], scale: [1.8, 3.2, 1] },
  { url: appsVisual, position: [0.3, -4.1, 7.5], scale: [2.2, 2.8, 1] },
  { url: automationVisual, position: [2.55, -4.35, 9.4], scale: [1.8, 2.3, 1] },
];

const geometryByMode = {
  lens: {
    args: [1.35, 1.35, 0.24, 96],
    rotation: [Math.PI / 2, 0, 0],
  },
  bar: {
    args: [5.4, 0.68, 1.08],
    rotation: [0, 0, 0],
  },
  cube: {
    args: [1.72, 1.72, 1.72],
    rotation: [0.38, 0.28, 0],
  },
};

export default function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
}) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides =
    mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Workflow', link: '' },
      { label: 'Scope', link: '' },
      { label: 'Launch', link: '' },
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <div className={`fluidGlass fluidGlass--${mode}`}>
      <Canvas
        className="fluidGlass__canvas"
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#100e11']} />
        <Suspense fallback={null}>
          <ScrollControls damping={0.18} pages={2.35} distance={0.45}>
            {mode === 'bar' ? <NavItems items={navItems} /> : null}
            <Wrapper modeProps={modeProps}>
              <Scroll>
                <Backdrop />
                <Typography />
                <Images />
              </Scroll>
              <Scroll html />
              <Preload />
            </Wrapper>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  mode = 'lens',
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
}) {
  const ref = useRef(null);
  const buffer = useFBO();
  const { viewport } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const baseRotation = geometryByMode[mode].rotation;

  useFrame((state, delta) => {
    const { camera, gl, pointer } = state;
    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const destX = followPointer ? (pointer.x * currentViewport.width) / 2 : 0;
    const destY = lockToBottom
      ? -currentViewport.height / 2 + 0.36
      : followPointer
        ? (pointer.y * currentViewport.height) / 2
        : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.18, delta);

    if (mode === 'cube') {
      easing.dampE(
        ref.current.rotation,
        [baseRotation[0] + pointer.y * 0.2, baseRotation[1] - pointer.x * 0.24, 0],
        0.18,
        delta,
      );
    } else if (mode === 'lens') {
      easing.dampE(
        ref.current.rotation,
        [
          baseRotation[0] + pointer.y * 0.08,
          pointer.x * 0.16,
          -pointer.x * 0.12,
        ],
        0.18,
        delta,
      );
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    transmission,
    roughness,
    color,
    attenuationColor,
    attenuationDistance,
    ...extraMat
  } = modeProps;

  const geometryProps = geometryByMode[mode];
  const meshScale =
    scale ?? (mode === 'bar' ? [1.08, 1.08, 1.08] : mode === 'cube' ? 1.2 : 1.36);

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={meshScale}
        rotation={geometryProps.rotation}
        position={[0, 0, 15]}
      >
        {mode === 'lens' ? (
          <cylinderGeometry args={geometryProps.args} />
        ) : (
          <boxGeometry args={geometryProps.args} />
        )}
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? (mode === 'bar' ? 10 : 5)}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.08}
          transmission={transmission ?? 1}
          roughness={roughness ?? 0}
          color={color ?? '#ffffff'}
          attenuationColor={attenuationColor ?? '#ffffff'}
          attenuationDistance={attenuationDistance ?? 0.22}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps }) {
  return <ModeWrapper mode="lens" followPointer modeProps={modeProps} />;
}

function Cube({ modeProps }) {
  return <ModeWrapper mode="cube" followPointer modeProps={modeProps} />;
}

function Bar({ modeProps = {} }) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      mode="bar"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
    />
  );
}

function NavItems({ items }) {
  const group = useRef(null);
  const { viewport, camera } = useThree();
  const deviceConfig = {
    mobile: { max: 639, spacing: 0.22, fontSize: 0.04 },
    tablet: { max: 1023, spacing: 0.27, fontSize: 0.038 },
    desktop: { max: Infinity, spacing: 0.33, fontSize: 0.038 },
  };

  const getDevice = () => {
    const width = window.innerWidth;
    return width <= deviceConfig.mobile.max
      ? 'mobile'
      : width <= deviceConfig.tablet.max
        ? 'tablet'
        : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = deviceConfig[device];

  useFrame(() => {
    if (!group.current) {
      return;
    }

    const currentViewport = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -currentViewport.height / 2 + 0.36, 15.1);

    group.current.children.forEach((child, index) => {
      child.position.x = (index - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link) => {
    if (!link) {
      return;
    }

    if (link.startsWith('#')) {
      window.location.hash = link;
      return;
    }

    window.location.href = link;
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthWrite={false}
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          depthTest={false}
          renderOrder={10}
          onClick={(event) => {
            event.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Backdrop() {
  return (
    <group>
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial color="#120f15" />
      </mesh>
      <mesh position={[-2.5, 1.6, -0.4]}>
        <planeGeometry args={[5.4, 5.4]} />
        <meshBasicMaterial color="#2b1410" transparent opacity={0.55} />
      </mesh>
      <mesh position={[2.2, -1.2, -0.3]}>
        <planeGeometry args={[5.8, 5.8]} />
        <meshBasicMaterial color="#1a1412" transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

function Images() {
  const group = useRef(null);
  const data = useScroll();

  useFrame(() => {
    if (!group.current) {
      return;
    }

    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 4;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 4;
    group.current.children[2].material.zoom = 1 + data.range(1.05 / 3, 1 / 3) / 3;
    group.current.children[3].material.zoom = 1 + data.range(1.05 / 3, 1 / 3) / 3;
    group.current.children[4].material.zoom = 1 + data.range(1.05 / 3, 1 / 3) / 3;
  });

  return (
    <group ref={group}>
      {imageCards.map((card) => (
        <Image
          key={`${card.url}-${card.position.join('-')}`}
          position={card.position}
          scale={card.scale}
          url={card.url}
          radius={0.18}
          transparent
        />
      ))}
    </group>
  );
}

function Typography() {
  const deviceConfig = {
    mobile: { titleSize: 0.24, bodySize: 0.08, titleY: 1.82, bodyY: 1.26 },
    tablet: { titleSize: 0.46, bodySize: 0.1, titleY: 1.88, bodyY: 1.22 },
    desktop: { titleSize: 0.62, bodySize: 0.105, titleY: 1.96, bodyY: 1.26 },
  };

  const getDevice = () => {
    const width = window.innerWidth;
    return width <= 639 ? 'mobile' : width <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { bodySize, titleSize, titleY, bodyY } = deviceConfig[device];

  return (
    <group position={[0, 0, 12]}>
      <Text
        position={[0, titleY, 0]}
        fontSize={titleSize}
        letterSpacing={-0.08}
        maxWidth={7}
        outlineWidth={0}
        outlineBlur="24%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Contact Criyx
      </Text>
      <Text
        position={[0, bodyY, 0]}
        fontSize={bodySize}
        lineHeight={1.5}
        maxWidth={7.6}
        color="#d8d8d8"
        anchorX="center"
        anchorY="middle"
      >
        Clear workflow notes, system friction, and business outcomes all work
        as a strong starting point.
      </Text>
    </group>
  );
}
