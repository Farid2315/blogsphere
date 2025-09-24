// src/utils/reverseGeocodeOSM.ts
import axios from "axios";

export async function getAddressFromCoordsOSM(latitude: number, longitude: number): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "BlogSphereApp/1.0",
      },
    });

    if (res.data && res.data.display_name) {
      return res.data.display_name;
    } else {
      throw new Error("No address found");
    }
  } catch (error: any) {
    console.error("OSM reverse geocode error:", error.message);
    throw new Error("Failed to fetch address");
  }
}