import { useEffect, useRef, useState } from "react";
import type { Coordinate } from "../types";

interface Geolocation {
  location: Coordinate | null;
  error: string;
}

export const useGeolocation = (): Geolocation => {
  const [location, setLocation] = useState<Coordinate | null>(null);
  const [error, setError] = useState("");
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        setError("");
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { location, error };
};
