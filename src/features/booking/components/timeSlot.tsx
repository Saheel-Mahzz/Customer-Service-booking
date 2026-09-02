import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  slots: string[];
  bookedSlots: string[];
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

export const TimeSlotPicker = ({ slots, bookedSlots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-slate-400" /> Select Time Slot
      </label>
      <div className="grid grid-cols-2 gap-2">
        {slots?.map((slot) => {
          const isSelected = selectedSlot === slot;
          const isBooked = bookedSlots.includes(slot);

          return (
            <Button
              key={slot}
              type="button"
              variant={isSelected ? "outline" : "default"}
              size="sm"
              disabled={isBooked}
              onClick={() => onSelectSlot(slot)}
              className={
                isBooked
                  ? "text-xs bg-red-50 border-red-200 text-red-500 line-through hover:bg-red-50 cursor-not-allowed disabled:opacity-100"
                  : "text-xs cursor-pointer bg-gray-200"
              }
            >
              {slot}
              {isBooked && <span className="ml-1 text-[10px]">(Booked)</span>}
            </Button>
          );
        })}
      </div>
    </div>
  );
};