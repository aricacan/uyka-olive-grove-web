"use client";

import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { Group, PlaneGeometry, PMREMGenerator, SRGBColorSpace, TextureLoader } from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { BOTTLE_PX, bodyFrontZ, createCapGeometry, createGlassGeometry, SCENE_SCALE } from "./bottleGeometry";
import { isMotionReduced } from "@/lib/motion";

/** Materials — tuned to the real bottle: near-black green glass, matte black cap. */
const GLASS = { color: "#040906", roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.1, envMapIntensity: 0.9 };
const CAP = { color: "#0b0b0b", roughness: 0.55 };
const LABEL_LIFT_PX = 1.5;
const LABEL_SEGMENTS = 32;
const LABEL_ANISOTROPY = 8;
const ENVIRONMENT_BLUR = 0.04;

/** Interaction feel. */
const AUTO_ROTATE_SPEED = 0.35; // rad/s while idle
const DRAG_SENSITIVITY = 0.01; // rad per px
const INERTIA_DAMPING = 0.92;
const MIN_VELOCITY = 0.001;
const KEY_STEP = Math.PI / 12;
const INITIAL_ANGLE = -0.35;
const CAMERA = { fov: 28, distance: 8.2 };
const LIGHTS = {
  ambient: 0.25,
  key: { position: [3, 4, 5] as const, intensity: 1.2 },
  rim: { position: [-4, 3, -4] as const, intensity: 2.4 },
};

type RotationState = { angle: number; velocity: number; isDragging: boolean; autoRotate: boolean; lastX: number };

/** Studio-like reflections without downloading an HDR file. */
function applyEnvironment({ gl, scene }: RootState) {
  const generator = new PMREMGenerator(gl);
  scene.environment = generator.fromScene(new RoomEnvironment(), ENVIRONMENT_BLUR).texture;
  generator.dispose();
}

function LabelMesh({ texture }: { texture: string }) {
  const map = useMemo(() => {
    const loaded = new TextureLoader().load(texture);
    loaded.colorSpace = SRGBColorSpace;
    loaded.anisotropy = LABEL_ANISOTROPY;
    return loaded;
  }, [texture]);

  // Wrap the flat label onto the gently curved front face of the square body.
  const geometry = useMemo(() => {
    const { width, height, centerY } = BOTTLE_PX.label;
    const plane = new PlaneGeometry(width * SCENE_SCALE, height * SCENE_SCALE, LABEL_SEGMENTS, 1);
    const positions = plane.attributes.position;
    for (let index = 0; index < positions.count; index++) {
      const xPx = positions.getX(index) / SCENE_SCALE;
      positions.setZ(index, (bodyFrontZ(xPx) + LABEL_LIFT_PX) * SCENE_SCALE);
      positions.setY(index, positions.getY(index) + centerY * SCENE_SCALE);
    }
    plane.computeVertexNormals();
    return plane;
  }, []);

  useEffect(() => () => map.dispose(), [map]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial map={map} roughness={0.7} />
    </mesh>
  );
}

function Bottle({ labelTexture, rotationRef }: { labelTexture: string; rotationRef: RefObject<RotationState> }) {
  const group = useRef<Group>(null);
  const glass = useMemo(() => createGlassGeometry(), []);
  const cap = useMemo(() => createCapGeometry(), []);

  useFrame((_, delta) => {
    const rotation = rotationRef.current;
    if (!group.current) return;
    if (!rotation.isDragging) {
      rotation.velocity *= INERTIA_DAMPING;
      const isIdle = Math.abs(rotation.velocity) < MIN_VELOCITY;
      rotation.angle += rotation.velocity + (rotation.autoRotate && isIdle ? AUTO_ROTATE_SPEED * delta : 0);
    }
    group.current.rotation.y = rotation.angle;
  });

  return (
    <group ref={group} position={[0, -1.5, 0]}>
      <mesh geometry={glass}>
        <meshPhysicalMaterial {...GLASS} />
      </mesh>
      <LabelMesh texture={labelTexture} />
      <mesh geometry={cap}>
        <meshStandardMaterial {...CAP} />
      </mesh>
    </group>
  );
}

type BottleSceneProps = { labelTexture: string; label: string; hint: string };

/**
 * Drag (mouse / touch) or arrow keys to turn the bottle; it spins slowly on
 * its own until touched (not for reduced-motion users). No zoom or pan.
 */
export default function BottleScene({ labelTexture, label, hint }: BottleSceneProps) {
  const rotationRef = useRef<RotationState>({ angle: INITIAL_ANGLE, velocity: 0, isDragging: false, autoRotate: true, lastX: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Stop the render loop while the viewer is scrolled out of view (battery, CPU).
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    rotationRef.current.autoRotate = !isMotionReduced();
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    Object.assign(rotationRef.current, { isDragging: true, autoRotate: false, lastX: event.clientX, velocity: 0 });
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rotation = rotationRef.current;
    if (!rotation.isDragging) return;
    const step = (event.clientX - rotation.lastX) * DRAG_SENSITIVITY;
    rotation.angle += step;
    rotation.velocity = step;
    rotation.lastX = event.clientX;
  };
  const onPointerUp = () => {
    rotationRef.current.isDragging = false;
  };
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    rotationRef.current.autoRotate = false;
    rotationRef.current.angle += event.key === "ArrowRight" ? KEY_STEP : -KEY_STEP;
  };

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={`${label}. ${hint}`}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className="h-full w-full cursor-grab touch-pan-y active:cursor-grabbing"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: CAMERA.fov, position: [0, 0, CAMERA.distance] }}
        gl={{ antialias: true, alpha: true }}
        onCreated={applyEnvironment}
        frameloop={isVisible ? "always" : "never"}
      >
        <ambientLight intensity={LIGHTS.ambient} />
        <directionalLight position={LIGHTS.key.position} intensity={LIGHTS.key.intensity} />
        {/* Rim light from behind separates the dark glass from the background. */}
        <directionalLight position={LIGHTS.rim.position} intensity={LIGHTS.rim.intensity} />
        <Bottle labelTexture={labelTexture} rotationRef={rotationRef} />
      </Canvas>
    </div>
  );
}
