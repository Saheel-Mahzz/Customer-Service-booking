import { useState } from 'react';
import { booking, type BookingPayload } from '@/api/services/booking';

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (payload: BookingPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await booking.createBooking({
        ...payload,
        booking_number: `BK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        status: 'confirmed',
      });

      return response;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Booking complete garna sakiyena';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createBooking,
    isLoading,
    error,
  };
};