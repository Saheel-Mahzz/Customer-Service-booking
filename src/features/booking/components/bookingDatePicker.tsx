import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { toDateString } from "@/utils/dateUtils";
import { isDayAvailable, isPastDate } from "../utils/availability";

interface BookingDatePickerProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  availableDays: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  error?: string;
}

export const BookingDatePicker = ({
  selectedDate,
  onSelectDate,
  availableDays,
  open,
  onOpenChange,
  error,
}: BookingDatePickerProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
        <CalendarIcon className="w-4 h-4 text-slate-400" /> Select Date
      </label>

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild className="w-full">
          <Button
            type="button"
            variant="outline"
            aria-invalid={Boolean(error)}
            className={`w-3/4 justify-start text-left font-normal bg-white ${
              error ? "border-red-500" : ""
            }`}
          >
            <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
            {selectedDate ? toDateString(selectedDate) : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white p-0" align="center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            disabled={(date) => isPastDate(date) || !isDayAvailable(date, availableDays)}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};