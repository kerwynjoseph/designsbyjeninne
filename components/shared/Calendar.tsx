"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (newDate >= today) {
      const dateString = newDate.toISOString().split("T")[0];
      onDateChange(dateString);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const isSelectedMonth =
    selectedDate &&
    new Date(selectedDate).getMonth() === currentMonth.getMonth() &&
    new Date(selectedDate).getFullYear() === currentMonth.getFullYear();

  const selectedDay = selectedDate
    ? parseInt(selectedDate.split("-")[2])
    : null;

  return (
    <div className="w-full bg-charcoal/40 backdrop-blur-sm border border-gold-500/30 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg text-ivory">{monthName}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-gold-500 hover:bg-gold-500/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 text-gold-500 hover:bg-gold-500/10 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-sans text-xs text-warmgray uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const isPastDate =
            day
              ? new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth(),
                  day
                ) < today
              : false;
          const isSelected = isSelectedMonth && day === selectedDay;
          const isDisabled = !day || isPastDate;

          return (
            <button
              key={index}
              onClick={() => day && !isPastDate && handleDateClick(day)}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg font-sans text-sm font-medium transition-all
                ${
                  isDisabled
                    ? "text-warmgray/30 cursor-not-allowed"
                    : isSelected
                      ? "bg-gold-500 text-ink"
                      : "text-ivory hover:bg-gold-500/20 cursor-pointer"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-6 pt-6 border-t border-gold-500/20">
          <p className="font-sans text-xs text-warmgray/70 uppercase tracking-wider mb-2">
            Selected Date
          </p>
          <p className="font-serif text-lg text-gold-500">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
