/**
 * Utility functions for calculating distances between coordinates
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculate the distance between two points using the Haversine formula
 * @param coord1 First coordinate point
 * @param coord2 Second coordinate point
 * @returns Distance in meters
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371000; // Earth's radius in meters
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Format distance for display
 * @param distanceInMeters Distance in meters
 * @returns Formatted distance string
 */
export function formatDistance(distanceInMeters: number): string {
  if (distanceInMeters === 0) {
    return "0m";
  } else if (distanceInMeters < 1000) {
    return `${Math.round(distanceInMeters)}m`;
  } else {
    return `${(distanceInMeters / 1000).toFixed(1)}km`;
  }
}

/**
 * Sort an array of items by distance from a reference point
 * @param items Array of items with coordinates
 * @param userLocation User's current location
 * @param getCoordinates Function to extract coordinates from an item
 * @returns Sorted array with distance information
 */
export function sortByDistance<T extends Record<string, unknown>>(
  items: T[],
  userLocation: Coordinates,
  getCoordinates: (item: T) => Coordinates | null
): (T & { distance?: number; formattedDistance?: string })[] {
  const itemsWithDistance: (T & { distance?: number; formattedDistance?: string })[] = items
    .map(item => {
      const coords = getCoordinates(item);
      if (!coords) {
        return { ...item };
      }
      
      const distance = calculateDistance(userLocation, coords);
      return {
        ...item,
        distance,
        formattedDistance: formatDistance(distance)
      };
    });

  return itemsWithDistance
    .sort((a, b) => {
      // Items with distance come first, sorted by distance
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      // Items without distance come after
      if (a.distance !== undefined) return -1;
      if (b.distance !== undefined) return 1;
      return 0;
    });
}

/**
 * Extract coordinates from a restaurant/post object
 * @param item Restaurant or post object
 * @returns Coordinates if available, null otherwise
 */
export function extractCoordinates(item: { 
  branches?: Array<{ latitude?: number; longitude?: number }>; 
  location?: { coordinates?: number[] } 
}): Coordinates | null {
  // Check if item has branches with coordinates
  if (item.branches && item.branches.length > 0) {
    const branch = item.branches[0]; // Use first branch
    if (branch.latitude && branch.longitude) {
      return {
        latitude: branch.latitude,
        longitude: branch.longitude
      };
    }
  }
  
  // Check if item has direct location coordinates
  if (item.location && item.location.coordinates && item.location.coordinates.length >= 2) {
    return {
      latitude: item.location.coordinates[1],
      longitude: item.location.coordinates[0]
    };
  }
  
  return null;
}