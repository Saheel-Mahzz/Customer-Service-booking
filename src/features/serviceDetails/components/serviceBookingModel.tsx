import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon, Clock, User, MapPin, CheckCircle2 } from "lucide-react";
import type { Service } from "@/features/services/types/service.types";
import { useBooking } from "../hooks/useBooking";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { useBookedSlots } from "../hooks/useBookedSlots";
import { toDateString } from "@/utils/dateUtils";

interface BookingFormData {
  bookingDate: string;
  selectedSlot: string;
  customerName: string;
  address: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  service: Service | null;
}

const INITIAL_FORM_STATE: BookingFormData = {
  bookingDate: "",
  selectedSlot: "",
  customerName: "",
  address: "",
};

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_STATE);
  const { createBooking, isLoading } = useBooking();
  const {bookedSlots}= useBookedSlots(service?.id,formData?.bookingDate)


  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  if (!service) return null;
  

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };



  const isDayAvailable = (date: Date) => {
    if (!service.available_days) return false;
    if (service.available_days.includes("Everyday")) return true;
    const dayName = DAY_NAMES[date.getDay()];
    return service.available_days.includes(dayName);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      handleChange("bookingDate", toDateString( date));
      setCalendarOpen(false);
    } else {
      handleChange("bookingDate", "");
    }
  };

  const handleConfirm = async () => {
    try {
      await createBooking({
        serviceId: service.id,
        service_name: service.name,
        customer_name: formData.customerName,
        address: formData.address,
        booking_date: formData.bookingDate,
        time_slot: formData.selectedSlot,
      });

      toast.success('Booking succesfully created!')

      setFormData(INITIAL_FORM_STATE);
      setSelectedDate(undefined);
      onClose(false);
    } catch (err) {
      console.error("Failed to create booking:", err);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const isFormValid = Boolean(
    formData.bookingDate &&
    formData.selectedSlot &&
    formData.customerName.trim() &&
    formData.address.trim()
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book {service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-slate-400" /> Select Date
            </label>

            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild className=' w-full'>
                <Button
                  type="button"
                  variant="outline"
                  className="w-3/4 justify-start text-left font-normal bg-white"
                >
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                  {selectedDate ? toDateString(selectedDate) : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-0" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return true;
                    return !isDayAvailable(date);
                  }}
                  className="w-full"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> Select Time Slot
            </label>
          <div className="grid grid-cols-2 gap-2">
  {service.available_time_slots?.map((slot) => {
    const isSelected = formData.selectedSlot === slot;
    const isBooked = bookedSlots.includes(slot);

    return (
      <Button
        key={slot}
        type="button"
        variant={isSelected ? "outline" : "default"}
        size="sm"
        disabled={isBooked}
        onClick={() => handleChange("selectedSlot", slot)}
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

          {/* 3. Customer Info Section */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" /> Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Shrestha"
                value={formData.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" /> Delivery Address
              </label>
              <input
                type="text"
                placeholder="e.g. Baneshwor, Kathmandu"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />
            </div>
          </div>

          <Separator />

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2.5">
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total Amount</span>
              <span className="text-primary">
                {service.currency || "NPR"} {service.price}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button
            className="gap-2"
            onClick={handleConfirm}
            disabled={isLoading || !isFormValid}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isLoading ? "Submitting..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};