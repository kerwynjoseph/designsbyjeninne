"use client";

interface TimePickerProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export function TimePicker({ selectedTime, onTimeChange }: TimePickerProps) {
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      if (hour < endHour - 1) {
        slots.push(`${String(hour).padStart(2, "0")}:30`);
      }
    }
    slots.push("18:00");
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatTimeDisplay = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const isAM = hour < 12;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${isAM ? "AM" : "PM"}`;
  };

  return (
    <div className="w-full">
      <label className="block font-sans text-sm font-medium text-ivory mb-3">
        Preferred Time
      </label>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeChange(time)}
            className={`
              py-2 px-3 rounded-lg font-sans text-sm font-medium transition-all
              ${
                selectedTime === time
                  ? "bg-gold-500 text-ink"
                  : "bg-charcoal/40 border border-gold-500/30 text-ivory hover:border-gold-500 cursor-pointer"
              }
            `}
          >
            {formatTimeDisplay(time)}
          </button>
        ))}
      </div>
      {selectedTime && (
        <p className="font-sans text-xs text-warmgray/70 mt-3">
          Selected: <span className="text-gold-300">{formatTimeDisplay(selectedTime)}</span>
        </p>
      )}
    </div>
  );
}
