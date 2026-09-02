import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, CheckCircle2 } from "lucide-react";
import type { Service } from "@/features/services/types/service.types";
import { useBookedSlots } from "../hooks/useBookedSlots";
import { useBookingForm } from "../hooks/useBookingForm";
import { BookingDatePicker } from "./bookingDatePicker";
import { TimeSlotPicker } from "./timeSlot";
import { BookingSummary } from "./bookingSummary";
import { BookingFormField } from "./bookingFormField";


interface BookingModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  service: Service | null;
}

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const {
    formData,
    selectedDate,
    calendarOpen,
    setCalendarOpen,
    isLoading,
    validationErrors,
    handleChange,
    handleDateSelect,
    handleConfirm,
  } = useBookingForm({ service, onSuccess: () => onClose(false) });

  const { bookedSlots } = useBookedSlots(service?.id, formData.booking_date);

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-xl bg-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book {service.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <BookingDatePicker
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            availableDays={service.available_days ?? []}
            error={validationErrors.booking_date?.[0]}
            open={calendarOpen}
            onOpenChange={setCalendarOpen}
          />

          <TimeSlotPicker
            slots={service.available_time_slots ?? []}
            bookedSlots={bookedSlots}
            selectedSlot={formData.selected_slot}
            onSelectSlot={(slot) => handleChange("selected_slot", slot)}
            error={validationErrors.selected_slot?.[0]}
          />

          <div className="space-y-3 pt-1">
            <BookingFormField
              icon={User}
              label="Full Name"
              placeholder="e.g. Alex Shrestha"
              value={formData.customer_name}
              onChange={(value) => handleChange("customer_name", value)}
              error={validationErrors.customer_name?.[0]}
            />
            <BookingFormField
              icon={MapPin}
              label="Delivery Address"
              placeholder="e.g. Baneshwor, Kathmandu"
              value={formData.address}
              onChange={(value) => handleChange("address", value)}
              error={validationErrors.address?.[0]}
            />
          </div>

          <Separator />

          <BookingSummary currency={service.currency} price={service.price} />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={handleConfirm} disabled={isLoading }>
            <CheckCircle2 className="w-4 h-4" />
            {isLoading ? "Submitting..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};