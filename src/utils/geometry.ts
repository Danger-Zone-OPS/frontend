import type { Coordinate } from "../types";

/**
 * Determines if a point is inside a polygon using the ray casting algorithm
 * @param point - The point to check [latitude, longitude]
 * @param polygon - Array of coordinates forming the polygon
 * @returns true if the point is inside the polygon, false otherwise
 */
export function isPointInPolygon(
  point: Coordinate,
  polygon: Coordinate[]
): boolean {
  const [lat, lng] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [lat1, lng1] = polygon[i];
    const [lat2, lng2] = polygon[j];

    const intersect =
      lng1 > lng !== lng2 > lng &&
      lat < ((lat2 - lat1) * (lng - lng1)) / (lng2 - lng1) + lat1;

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

/**
 * Calculates the Haversine distance between two points in meters
 * @param point1 - First point [latitude, longitude]
 * @param point2 - Second point [latitude, longitude]
 * @returns Distance in meters
 */
export function haversineDistance(
  point1: Coordinate,
  point2: Coordinate
): number {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;

  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Calculates the minimum distance from a point to a polygon's perimeter
 * @param point - The point to check [latitude, longitude]
 * @param polygon - Array of coordinates forming the polygon
 * @returns Minimum distance in meters
 */
export function distanceToPolygon(
  point: Coordinate,
  polygon: Coordinate[]
): number {
  let minDistance = Infinity;

  for (let i = 0; i < polygon.length; i++) {
    const p1 = polygon[i];
    const p2 = polygon[(i + 1) % polygon.length];

    const distance = distanceToLineSegment(point, p1, p2);
    minDistance = Math.min(minDistance, distance);
  }

  return minDistance;
}

/**
 * Calculates the distance from a point to a line segment
 * @param point - The point to check
 * @param lineStart - Start of the line segment
 * @param lineEnd - End of the line segment
 * @returns Distance in meters
 */
function distanceToLineSegment(
  point: Coordinate,
  lineStart: Coordinate,
  lineEnd: Coordinate
): number {
  const [px, py] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;

  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  return haversineDistance(point, [xx, yy]);
}
