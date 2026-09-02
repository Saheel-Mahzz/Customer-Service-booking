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
import { CalendarIcon, Clock, User, MapPin, CheckCircle2 } from "lucide-react";
import type { Service } from "@/features/services/types/service.types";
import { useBooking } from "../hooks/useBooking";


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
  bookingDate: "2026-09-02",
  selectedSlot: "",
  customerName: "",
  address: "",
};

export const BookingModal = ({ isOpen, onClose, service }: BookingModalProps) => {
  const { createBooking, isLoading } = useBooking();

  // Single State Object Pattern
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_STATE);

  if (!service) return null;

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

      alert("Booking successfully created!");
      
      setFormData(INITIAL_FORM_STATE);
      onClose(false);
    } catch (err) {
      console.error("Failed to create booking:", err);
    }
  };

  // Form Validation Check
  const isFormValid = Boolean(
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
            <input
              type="date"
              value={formData.bookingDate}
              onChange={(e) => handleChange("bookingDate", e.target.value)}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> Select Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {service.available_time_slots?.map((slot) => {
                const isSelected = formData.selectedSlot === slot;
                return (
                  <Button
                    key={slot}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => handleChange("selectedSlot", slot)}
                  >
                    {slot}
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