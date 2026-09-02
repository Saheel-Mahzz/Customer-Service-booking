import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { toDateString } from "@/utils/dateUtils";
import { useBooking } from "./useBooking";
import type { BookingFormData } from "../types/booking.types";
import type { Service } from "@/features/services/types/service.types";

const bookingFormSchema = z.object({
  booking_date: z.string().trim().min(1, "This field cannot be left empty"),
  selected_slot: z.string().trim().min(1, "This field cannot be left empty"),
  customer_name: z.string().trim().min(1, "This field cannot be left empty"),
  address: z.string().trim().min(1, "This field cannot be left empty"),
});

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
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
    setHasSubmitted(false);
  };

  const validation = bookingFormSchema.safeParse(formData);
  const validationErrors =
    hasSubmitted && !validation.success
      ? validation.error.flatten().fieldErrors
      : {};

  const handleConfirm = async () => {
    if (!service) return;

    setHasSubmitted(true);
    if (!validation.success) {
      toast.error("Please complete all booking details.");
      return;
    }

    const validatedFormData = validation.data;

    try {
      await createBooking({
        serviceId: service.id,
        service_name: service.name,
        customer_name: validatedFormData.customer_name,
        address: validatedFormData.address,
        booking_date: validatedFormData.booking_date,
        time_slot: validatedFormData.selected_slot,
      });

      toast.success("Booking successfully created!");
      resetForm();
      onSuccess();
    } catch (err) {
      console.error("Failed to create booking:", err);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const isFormValid = validation.success;

  return {
    formData,
    selectedDate,
    calendarOpen,
    setCalendarOpen,
    isLoading,
    isFormValid,
    validationErrors,
    handleChange,
    handleDateSelect,
    handleConfirm,
  };
}