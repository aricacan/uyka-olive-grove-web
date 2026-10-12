import { BufferGeometry, Float32BufferAttribute } from "three";

/**
 * Procedural 500 ml "Marasca" bottle: square body with rounded corners that
 * morphs into a round neck, closed by a ribbed screw cap. Proportions were
 * measured on the product photo (assets/source/1.webp, bottle ≈ 1524 px tall)
 * and are expressed in those pixels, then scaled to scene units.
 */
export const BOTTLE_PX = {
  height: 1524,
  bodyHalfWidth: 148,
  bodyTop: 1029,
  shoulderTop: 1192,
  neckHalfWidth: 80,
  neckTop: 1256,
  capHalfWidth: 82,
  capSkirtHalfWidth: 80,
  capRibbedHeight: 102,
  baseBevel: 14,
  label: { centerY: 561, width: 170, height: 846 },
} as const;

/** Scene units per photo pixel (bottle is 3 units tall). */
export const SCENE_SCALE = 3 / BOTTLE_PX.height;

/** Squircle exponent: ~5 reads as "square with soft corners", 2 is a circle. */
const BODY_SQUARENESS = 5;
const NECK_SQUARENESS = 2;
const RADIAL_SEGMENTS = 128;
const SHOULDER_ROWS = 28;
const CAP_RIB_COUNT = 64;
const CAP_RIB_DEPTH = 0.025; // relative radius variation of the grip ribs
const CAP_GROOVE_DEPTH = 0.03; // the thin ring between grip and skirt
const CAP_TOP_CHAMFER = 0.94;

type Ring = { y: number; radiusAt: (angle: number) => [number, number] };

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Point on a squircle |x/a|^n + |z/a|^n = 1 at polar angle `angle`. */
export function squirclePoint(halfWidth: number, squareness: number, angle: number): [number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const exponent = 2 / squareness;
  return [halfWidth * Math.sign(cos) * Math.abs(cos) ** exponent, halfWidth * Math.sign(sin) * Math.abs(sin) ** exponent];
}

/** Front-face depth of the body at horizontal offset `x` (for wrapping the label). */
export function bodyFrontZ(x: number): number {
  const { bodyHalfWidth } = BOTTLE_PX;
  const ratio = Math.min(Math.abs(x) / bodyHalfWidth, 1);
  return bodyHalfWidth * (1 - ratio ** BODY_SQUARENESS) ** (1 / BODY_SQUARENESS);
}

const squircleRing = (y: number, halfWidth: number, squareness: number): Ring => ({
  y,
  radiusAt: (angle) => squirclePoint(halfWidth, squareness, angle),
});

const circleRing = (y: number, radius: (angle: number) => number): Ring => ({
  y,
  radiusAt: (angle) => [radius(angle) * Math.cos(angle), radius(angle) * Math.sin(angle)],
});

/**
 * Builds a closed surface of revolution from rings. Vertices are shared around
 * the circumference (no seam), so smooth normals don't show a crease.
 */
function surfaceFromRings(rings: Ring[], closeBottom: boolean, closeTop: boolean): BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  for (const ring of rings) {
    for (let segment = 0; segment < RADIAL_SEGMENTS; segment++) {
      const [x, z] = ring.radiusAt((segment / RADIAL_SEGMENTS) * Math.PI * 2);
      positions.push(x * SCENE_SCALE, ring.y * SCENE_SCALE, z * SCENE_SCALE);
    }
  }

  for (let row = 0; row < rings.length - 1; row++) {
    for (let segment = 0; segment < RADIAL_SEGMENTS; segment++) {
      const next = (segment + 1) % RADIAL_SEGMENTS;
      const a = row * RADIAL_SEGMENTS + segment;
      const b = (row + 1) * RADIAL_SEGMENTS + segment;
      const aNext = row * RADIAL_SEGMENTS + next;
      const bNext = (row + 1) * RADIAL_SEGMENTS + next;
      indices.push(a, b, aNext, b, bNext, aNext); // counter-clockwise seen from outside
    }
  }

  const addCap = (ringIndex: number, facesUp: boolean) => {
    const centre = positions.length / 3;
    positions.push(0, rings[ringIndex].y * SCENE_SCALE, 0);
    const offset = ringIndex * RADIAL_SEGMENTS;
    for (let segment = 0; segment < RADIAL_SEGMENTS; segment++) {
      const current = offset + segment;
      const next = offset + ((segment + 1) % RADIAL_SEGMENTS);
      indices.push(...(facesUp ? [centre, next, current] : [centre, current, next]));
    }
  };
  if (closeBottom) addCap(0, false);
  if (closeTop) addCap(rings.length - 1, true);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function createGlassGeometry(): BufferGeometry {
  const { bodyHalfWidth, bodyTop, shoulderTop, neckHalfWidth, neckTop, baseBevel } = BOTTLE_PX;
  const rings: Ring[] = [
    squircleRing(0, bodyHalfWidth - baseBevel, BODY_SQUARENESS),
    squircleRing(baseBevel, bodyHalfWidth, BODY_SQUARENESS),
    squircleRing(bodyTop, bodyHalfWidth, BODY_SQUARENESS),
  ];
  for (let row = 1; row <= SHOULDER_ROWS; row++) {
    const t = row / SHOULDER_ROWS;
    // Shoulder bulges outward before narrowing: a quarter-ellipse in width.
    const halfWidth = neckHalfWidth + (bodyHalfWidth - neckHalfWidth) * Math.sqrt(1 - t * t);
    const squareness = BODY_SQUARENESS + (NECK_SQUARENESS - BODY_SQUARENESS) * smoothstep(t);
    rings.push(squircleRing(bodyTop + (shoulderTop - bodyTop) * t, halfWidth, squareness));
  }
  rings.push(squircleRing(neckTop, neckHalfWidth, NECK_SQUARENESS));
  return surfaceFromRings(rings, true, false);
}

/** Screw cap: smooth skirt, a thin groove, then the ribbed grip with a chamfered top. */
export function createCapGeometry(): BufferGeometry {
  const { neckTop, height, capHalfWidth, capSkirtHalfWidth, capRibbedHeight } = BOTTLE_PX;
  const gripStart = height - capRibbedHeight;
  const ribbed = (scale: number) => (angle: number) =>
    capHalfWidth * scale * (1 + CAP_RIB_DEPTH * (0.5 + 0.5 * Math.cos(CAP_RIB_COUNT * angle)));
  const smooth = (radius: number) => () => radius;

  const rings = [
    circleRing(neckTop, smooth(capSkirtHalfWidth)),
    circleRing(gripStart - 6, smooth(capSkirtHalfWidth)),
    circleRing(gripStart - 3, smooth(capSkirtHalfWidth * (1 - CAP_GROOVE_DEPTH))),
    circleRing(gripStart, ribbed(1)),
    circleRing(height - 4, ribbed(1)),
    circleRing(height, ribbed(CAP_TOP_CHAMFER)),
  ];
  return surfaceFromRings(rings, false, true);
}
