// Timro MockAPI endpoint link
const API_BASE_URL = "https://6a96fb6f0e3240db90619aa3.mockapi.io/bookings";

export interface BookingPayload {
  serviceId: string;
  service_name: string;
  customer_name: string;
  address: string;
  booking_date: string;
  time_slot: string;
  booking_number?: string;
  status?: string;
}

export interface BookingResponse extends BookingPayload {
  id: string;
  createdAt: string;
}

export const booking = {
  // 1. Fetch all bookings (Conflict check & My Bookings page ko lagi)
  getBookings: async (): Promise<BookingResponse[]> => {
    const res = await fetch(`${API_BASE_URL}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return await res.json();
  },

  // 2. Create New Booking (POST request)
  createBooking: async (payload: BookingPayload): Promise<BookingResponse> => {
    const res = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Failed to submit booking');
    return await res.json();
  },
};