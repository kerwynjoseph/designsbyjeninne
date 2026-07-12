"use client";

import React, { createContext, useContext, useState } from "react";

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
  estimatedTotal: number;
}

interface BookingContextType {
  booking: BookingSelection;
  setService: (serviceId: string, serviceName: string) => void;
  setPackage: (tier: "bronze" | "silver" | "gold", price: number) => void;
  toggleAddOn: (id: string, name: string, price: number) => void;
  removeAddOn: (id: string) => void;
  recalculateTotal: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingSelection>({
    serviceId: "",
    serviceName: "",
    packageTier: null,
    packagePrice: null,
    selectedAddOns: [],
    estimatedTotal: 0,
  });

  const setService = (serviceId: string, serviceName: string) => {
    setBooking((prev) => ({
      ...prev,
      serviceId,
      serviceName,
      packageTier: null,
      packagePrice: null,
      selectedAddOns: [],
      estimatedTotal: 0,
    }));
  };

  const setPackage = (tier: "bronze" | "silver" | "gold", price: number) => {
    setBooking((prev) => {
      const newBooking = {
        ...prev,
        packageTier: tier,
        packagePrice: price,
      };
      recalculateTotalInternal(newBooking);
      return newBooking;
    });
  };

  const toggleAddOn = (id: string, name: string, price: number) => {
    setBooking((prev) => {
      const exists = prev.selectedAddOns.find((ao) => ao.id === id);
      let newAddOns;

      if (exists) {
        newAddOns = prev.selectedAddOns.filter((ao) => ao.id !== id);
      } else {
        newAddOns = [...prev.selectedAddOns, { id, name, price }];
      }

      const newBooking = {
        ...prev,
        selectedAddOns: newAddOns,
      };

      recalculateTotalInternal(newBooking);
      return newBooking;
    });
  };

  const removeAddOn = (id: string) => {
    setBooking((prev) => {
      const newAddOns = prev.selectedAddOns.filter((ao) => ao.id !== id);
      const newBooking = {
        ...prev,
        selectedAddOns: newAddOns,
      };
      recalculateTotalInternal(newBooking);
      return newBooking;
    });
  };

  const recalculateTotalInternal = (currentBooking: BookingSelection) => {
    let total = currentBooking.packagePrice || 0;
    const addOnTotal = currentBooking.selectedAddOns.reduce(
      (sum, ao) => sum + ao.price,
      0
    );
    currentBooking.estimatedTotal = total + addOnTotal;
  };

  const recalculateTotal = () => {
    setBooking((prev) => {
      const newBooking = { ...prev };
      recalculateTotalInternal(newBooking);
      return newBooking;
    });
  };

  const resetBooking = () => {
    setBooking({
      serviceId: "",
      serviceName: "",
      packageTier: null,
      packagePrice: null,
      selectedAddOns: [],
      estimatedTotal: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService,
        setPackage,
        toggleAddOn,
        removeAddOn,
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
