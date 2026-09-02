import { useState } from "react";
import { toast } from "sonner";
import { toDateString } from "@/utils/dateUtils";
import { useBooking } from "./useBooking";
import type { BookingFormData } from "../types/booking.types";
import type { Service } from "@/features/services/types/service.types";

const INITIAL_FORM_STATE: BookingFormData = {
  booking_date: "",
  selected_slot: "",
  customer_name: "",
  address: "",
};

interface UseBookingFormParams {
  service: Service | null;
  onSuccess: () => void;
}

export function useBookingForm({ service, onSuccess }: UseBookingFormParams) {
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_STATE);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { createBooking, isLoading } = useBooking();

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      handleChange("booking_date", toDateString(date));
      setCalendarOpen(false);
    } else {
      handleChange("booking_date", "");
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setSelectedDate(undefined);
  };

  const handleConfirm = async () => {
    if (!service) return;

    try {
      await createBooking({
        serviceId: service.id,
        service_name: service.name,
        customer_name: formData.customer_name,
        address: formData.address,
        booking_date: formData.booking_date,
        time_slot: formData.selected_slot,
      });

      toast.success("Booking successfully created!");
      resetForm();
      onSuccess();
    } catch (err) {
      console.error("Failed to create booking:", err);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const isFormValid = Boolean(
    formData.booking_date &&
    formData.selected_slot &&
    formData.customer_name.trim() &&
    formData.address.trim()
  );

  return {
    formData,
    selectedDate,
    calendarOpen,
    setCalendarOpen,
    isLoading,
    isFormValid,
    handleChange,
    handleDateSelect,
    handleConfirm,
  };
}