import { useEffect, useState } from "react";
import {  type BookingResponse } from "@/api/services/booking";
import { bookingApi } from "@/api/services/bookingApi";

export const useBookingDetail = (bookingId: string) => {
  const [bookings, setBooking] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await bookingApi.getBookingById(bookingId);
        setBooking(data);
      } catch (err: any) {
        setError(err.message || "Error fetching booking detail");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [bookingId]);

  return { bookings, isLoading, error };
};