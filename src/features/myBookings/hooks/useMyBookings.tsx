import { booking, type BookingResponse } from "@/api/services/booking";
import { useEffect, useState } from "react";

export const useMyBookings = () => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await booking.getBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    isLoading,
    error,
    refetch: fetchBookings, // Naya booking banepachhi refetch garna milchha
  };
};