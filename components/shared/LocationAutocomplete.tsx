"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

export interface SelectedLocation {
  address: string;
  lat: number | null;
  lng: number | null;
  placeId: string | null;
}

interface LocationAutocompleteProps {
  label: string;
  value: SelectedLocation | null;
  onChange: (location: SelectedLocation) => void;
  placeholder?: string;
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

let scriptLoadingPromise: Promise<void> | null = null;

function loadGoogleMapsScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as unknown as { google?: { maps?: { places?: unknown } } };
  if (w.google?.maps?.places) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

export function LocationAutocomplete({
  label,
  value,
  onChange,
  placeholder = "Start typing an address...",
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value?.address || "");
  const [loadError, setLoadError] = useState(false);
  const unavailable = !GOOGLE_MAPS_API_KEY || loadError;

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      return;
    }

    let cancelled = false;

    loadGoogleMapsScript()
      .then(() => {
        if (cancelled || !inputRef.current) return;
        const w = window as unknown as {
          google: {
            maps: {
              places: {
                Autocomplete: new (
                  input: HTMLInputElement,
                  opts: Record<string, unknown>
                ) => {
                  addListener: (event: string, cb: () => void) => void;
                  getPlace: () => {
                    formatted_address?: string;
                    place_id?: string;
                    geometry?: { location?: { lat: () => number; lng: () => number } };
                  };
                };
              };
            };
          };
        };

        const autocomplete = new w.google.maps.places.Autocomplete(inputRef.current, {
          fields: ["formatted_address", "geometry", "place_id"],
          componentRestrictions: { country: "tt" },
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry?.location) return;
          const location: SelectedLocation = {
            address: place.formatted_address || inputRef.current?.value || "",
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            placeId: place.place_id || null,
          };
          setInputValue(location.address);
          onChange(location);
        });
      })
      .catch(() => setLoadError(true));

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <label className="block font-sans text-sm font-medium text-ivory mb-3">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg text-ivory placeholder-warmgray focus:border-gold-500 outline-none transition-colors"
        />
      </div>
      {value?.address && value.lat != null && (
        <p className="text-gold-300 text-xs mt-2">Selected: {value.address}</p>
      )}
      {unavailable && (
        <p className="text-warmgray/70 text-xs mt-2">
          Address search is currently unavailable. Please type your full address manually; our team will confirm the exact location with you.
        </p>
      )}
    </div>
  );
}
