import { getAddressFromCoordsOSM } from './reverseGeocodeOSM'

/**
 * Check if a string contains coordinates in the format "lat, lng"
 */
export function isCoordinateString(str: string): boolean {
  const coordinatePattern = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/
  return coordinatePattern.test(str.trim())
}

/**
 * Parse coordinate string to latitude and longitude
 */
export function parseCoordinateString(coordinateStr: string): { latitude: number; longitude: number } | null {
  try {
    const parts = coordinateStr.split(',').map(part => parseFloat(part.trim()))
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return {
        latitude: parts[0],
        longitude: parts[1]
      }
    }
  } catch (error) {
    console.error('Error parsing coordinate string:', error)
  }
  return null
}

/**
 * Convert coordinate string to human-readable address
 */
export async function convertCoordinateStringToAddress(coordinateStr: string): Promise<string> {
  if (!isCoordinateString(coordinateStr)) {
    return coordinateStr // Return as-is if not coordinates
  }

  const coords = parseCoordinateString(coordinateStr)
  if (!coords) {
    return coordinateStr // Return as-is if parsing fails
  }

  try {
    const address = await getAddressFromCoordsOSM(coords.latitude, coords.longitude)
    return address
  } catch (error) {
    console.error('Error converting coordinates to address:', error)
  }

  // Fallback to original string if conversion fails
  return coordinateStr
}

/**
 * Batch convert multiple coordinate strings to addresses
 */
export async function batchConvertCoordinateStrings(
  coordinateStrings: string[]
): Promise<{ [key: string]: string }> {
  const results: { [key: string]: string } = {}
  
  for (const coordStr of coordinateStrings) {
    if (isCoordinateString(coordStr)) {
      results[coordStr] = await convertCoordinateStringToAddress(coordStr)
      // Add a small delay to avoid overwhelming the geocoding API
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return results
}