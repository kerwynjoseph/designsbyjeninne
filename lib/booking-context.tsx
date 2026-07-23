"use client";

import React, { createContext, useContext, useState } from "react";
import {
  calculateTravelFee,
  calculateSequentialTravelFee,
} from "@/lib/data/location-config";
import { generateBookingReference } from "@/lib/utils/booking-reference";

export interface BookingLocation {
  address: string;
  lat: number | null;
  lng: number | null;
  placeId: string | null;
}

export interface AdditionalLocation extends BookingLocation {
  id: string;
  travelFee: number;
}

export interface BookingSelection {
  serviceId: string;
  serviceName: string;
  packageTier: "bronze" | "silver" | "gold" | null;
  packagePrice: number | null;
  selectedAddOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;

  // Scheduling
  preferredDate: string;
  preferredTime: string;
  isCustomTime: boolean;
  customTimeNote: string;

  // Location
  primaryLocation: BookingLocation | null;
  primaryTravelFee: number;
  hasMultipleLocations: boolean;
  additionalLocations: AdditionalLocation[];

  // Details
  projectDetails: string;
  clientNotes: string;

  bookingReference: string;
  estimatedTotal: number;
}

const emptyBooking = (): BookingSelection => ({
  serviceId: "",
  serviceName: "",
  packageTier: null,
  packagePrice: null,
  selectedAddOns: [],
  preferredDate: "",
  preferredTime: "",
  isCustomTime: false,
  customTimeNote: "",
  primaryLocation: null,
  primaryTravelFee: 0,
  hasMultipleLocations: false,
  additionalLocations: [],
  projectDetails: "",
  clientNotes: "",
  bookingReference: "",
  estimatedTotal: 0,
});

interface BookingContextType {
  booking: BookingSelection;
  setService: (serviceId: string, serviceName: string) => void;
  setPackage: (tier: "bronze" | "silver" | "gold", price: number) => void;
  toggleAddOn: (id: string, name: string, price: number) => void;
  removeAddOn: (id: string) => void;
  setSchedule: (date: string, time: string, isCustomTime: boolean, customTimeNote: string) => void;
  setPrimaryLocation: (location: BookingLocation) => void;
  setHasMultipleLocations: (value: boolean) => void;
  addAdditionalLocation: (location: BookingLocation) => void;
  removeAdditionalLocation: (id: string) => void;
  setProjectDetails: (value: string) => void;
  setClientNotes: (value: string) => void;
  recalculateTotal: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

function computeTotal(b: BookingSelection): number {
  const addOnTotal = b.selectedAddOns.reduce((sum, ao) => sum + ao.price, 0);
  const additionalLocationsTotal = b.additionalLocations.reduce(
    (sum, loc) => sum + loc.travelFee,
    0
  );
  return (
    (b.packagePrice || 0) +
    addOnTotal +
    b.primaryTravelFee +
    additionalLocationsTotal
  );
}

/**
 * Recalculates each additional location's travel fee as the distance from
 * the previous stop in the chain (the primary location for the first
 * additional stop, then each additional stop in turn). Must be re-run
 * whenever the primary location or the additional-location list changes,
 * so a removed or edited stop never leaves a stale fee behind on the ones
 * after it.
 */
function recomputeLocationChain(
  primary: BookingLocation | null,
  locations: AdditionalLocation[]
): AdditionalLocation[] {
  let prevLat = primary?.lat ?? null;
  let prevLng = primary?.lng ?? null;

  return locations.map((loc) => {
    const travelFee = calculateSequentialTravelFee(
      prevLat,
      prevLng,
      loc.lat,
      loc.lng
    );
    prevLat = loc.lat;
    prevLng = loc.lng;
    return { ...loc, travelFee };
  });
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingSelection>(emptyBooking());

  const setService = (serviceId: string, serviceName: string) => {
    setBooking(() => ({
      ...emptyBooking(),
      serviceId,
      serviceName,
      bookingReference: generateBookingReference(),
    }));
  };

  const setPackage = (tier: "bronze" | "silver" | "gold", price: number) => {
    setBooking((prev) => {
      const newBooking = { ...prev, packageTier: tier, packagePrice: price };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const toggleAddOn = (id: string, name: string, price: number) => {
    setBooking((prev) => {
      const exists = prev.selectedAddOns.find((ao) => ao.id === id);
      const newAddOns = exists
        ? prev.selectedAddOns.filter((ao) => ao.id !== id)
        : [...prev.selectedAddOns, { id, name, price }];
      const newBooking = { ...prev, selectedAddOns: newAddOns };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const removeAddOn = (id: string) => {
    setBooking((prev) => {
      const newAddOns = prev.selectedAddOns.filter((ao) => ao.id !== id);
      const newBooking = { ...prev, selectedAddOns: newAddOns };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const setSchedule = (
    date: string,
    time: string,
    isCustomTime: boolean,
    customTimeNote: string
  ) => {
    setBooking((prev) => ({
      ...prev,
      preferredDate: date,
      preferredTime: time,
      isCustomTime,
      customTimeNote,
    }));
  };

  const setPrimaryLocation = (location: BookingLocation) => {
    setBooking((prev) => {
      const travelFee = calculateTravelFee(location.lat, location.lng);
      const newBooking = {
        ...prev,
        primaryLocation: location,
        primaryTravelFee: travelFee,
        additionalLocations: recomputeLocationChain(location, prev.additionalLocations),
      };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const setHasMultipleLocations = (value: boolean) => {
    setBooking((prev) => {
      const newBooking = {
        ...prev,
        hasMultipleLocations: value,
        additionalLocations: value ? prev.additionalLocations : [],
      };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const addAdditionalLocation = (location: BookingLocation) => {
    setBooking((prev) => {
      const newLocation: AdditionalLocation = {
        ...location,
        id: `loc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        travelFee: 0,
      };
      const newBooking = {
        ...prev,
        additionalLocations: recomputeLocationChain(prev.primaryLocation, [
          ...prev.additionalLocations,
          newLocation,
        ]),
      };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const removeAdditionalLocation = (id: string) => {
    setBooking((prev) => {
      const newBooking = {
        ...prev,
        additionalLocations: recomputeLocationChain(
          prev.primaryLocation,
          prev.additionalLocations.filter((l) => l.id !== id)
        ),
      };
      newBooking.estimatedTotal = computeTotal(newBooking);
      return newBooking;
    });
  };

  const setProjectDetails = (value: string) => {
    setBooking((prev) => ({ ...prev, projectDetails: value }));
  };

  const setClientNotes = (value: string) => {
    setBooking((prev) => ({ ...prev, clientNotes: value }));
  };

  const recalculateTotal = () => {
    setBooking((prev) => ({ ...prev, estimatedTotal: computeTotal(prev) }));
  };

  const resetBooking = () => {
    setBooking(emptyBooking());
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService,
        setPackage,
        toggleAddOn,
        removeAddOn,
        setSchedule,
        setPrimaryLocation,
        setHasMultipleLocations,
        addAdditionalLocation,
        removeAdditionalLocation,
        setProjectDetails,
        setClientNotes,
        recalculateTotal,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
