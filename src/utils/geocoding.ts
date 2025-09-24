// Utility functions for geocoding (converting coordinates to addresses)

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  formattedAddress: string;
}

/**
 * Convert coordinates to a human-readable address using reverse geocoding
 * Uses the browser's built-in geocoding API or falls back to a free service
 */
export async function coordinatesToAddress(
  latitude: number,
  longitude: number
): Promise<Address | null> {
  try {
    // Using OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'BlogSphere-App/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();
    
    if (!data || !data.display_name) {
      return null;
    }

    const address = data.address || {};
    
    return {
      street: address.road || address.house_number ? 
        `${address.house_number || ''} ${address.road || ''}`.trim() : undefined,
      city: address.city || address.town || address.village || address.hamlet,
      state: address.state || address.province,
      country: address.country,
      postalCode: address.postcode,
      formattedAddress: data.display_name
    };
  } catch (error) {
    console.error('Error converting coordinates to address:', error);
    return null;
  }
}

/**
 * Get a short, user-friendly address format
 */
export function getShortAddress(address: Address): string {
  const parts = [];
  
  if (address.city) {
    parts.push(address.city);
  }
  
  if (address.state) {
    parts.push(address.state);
  }
  
  if (address.country && parts.length === 0) {
    parts.push(address.country);
  }
  
  return parts.join(', ') || address.formattedAddress || 'Unknown location';
}

/**
 * Cache for storing geocoded addresses to avoid repeated API calls
 */
const geocodingCache = new Map<string, Address>();

/**
 * Get address with caching to improve performance
 */
export async function getCachedAddress(
  latitude: number,
  longitude: number
): Promise<Address | null> {
  const key = `${latitude.toFixed(6)},${longitude.toFixed(6)}`;
  
  if (geocodingCache.has(key)) {
    return geocodingCache.get(key)!;
  }
  
  const address = await coordinatesToAddress(latitude, longitude);
  
  if (address) {
    geocodingCache.set(key, address);
  }
  
  return address;
}