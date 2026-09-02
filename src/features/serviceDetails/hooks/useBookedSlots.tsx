import { booking } from "@/api/services/booking";
import { useState, useEffect } from "react";

export function useBookedSlots(serviceId: string | undefined, bookingDate: string) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId || !bookingDate) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      setLoadingSlots(true);
      setError(null);
      try {
        const allBookings = await booking.getBookings();

        const slots = allBookings
          .filter(
            (b) => b.serviceId === serviceId && b.booking_date === bookingDate
          )
          .map((b) => b.time_slot);

        setBookedSlots(slots);
      } catch (err) {
        console.error("Failed to fetch booked slots:", err);
        setError("Could not load availability");
        setBookedSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [serviceId, bookingDate]);

  return { bookedSlots, loadingSlots, error };
}