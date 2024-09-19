"use client";

import { apiCaller } from "@/lib/auth";
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

interface LocationContextType {
  location: Location;
  error: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

const LOCATION_KEY = "userLocation";

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem(LOCATION_KEY);

    async function updateLocation(lat: number, long: number) {
      try {
        await apiCaller.patch("/api/companies-app/company/profile/", {
          lat,
          long,
        });
        localStorage.setItem(LOCATION_KEY, JSON.stringify({ latitude: lat, longitude: long }));
      } catch (err) {
        console.error("Error updating location:", err);
      }
    }

    function fetchLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            await updateLocation(latitude, longitude);
          },
          (err) => {
            console.error("Geolocation error:", err);
            setError(err.message);
          },
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }

    if (storedLocation) {
      const parsedLocation = JSON.parse(storedLocation);
      setLocation(parsedLocation);
      // additionally we can call the server to check if the location given by company is still valid. Maybe?
    } else {
      fetchLocation();
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, error }}>{children}</LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
