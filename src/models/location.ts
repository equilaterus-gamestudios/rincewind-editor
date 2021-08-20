import { createContext, useState } from "react";
import { LOCATIONS } from "../common/constants";

// Context shape
export interface LocationContextData {
  location: string,
  setLocation: (newLocation: string) => void
}

// Default
export const defaultLocationContextData: LocationContextData = {
  location: LOCATIONS.START,
  setLocation: () => { throw Error("Not implemented setLocation"); }
}

// Context
export const LocationContext = createContext<LocationContextData>(defaultLocationContextData);

// Hook
export function useLocationState (): LocationContextData {
  const [location, setLocation] = useState(LOCATIONS.START);
  return {
    location,
    setLocation
  }
}
