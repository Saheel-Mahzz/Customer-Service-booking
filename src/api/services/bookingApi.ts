import type { BookingPayload, BookingResponse } from "@/features/booking/types/booking.types";
import { httpGet, httpPost } from "../client/httpClient";


const BOOKINGS_PATH = "/bookings"; 

export const bookingApi = {
  getBookings: (): Promise<BookingResponse[]> => httpGet(BOOKINGS_PATH),

  createBooking: (payload: BookingPayload): Promise<BookingResponse> =>
    httpPost(BOOKINGS_PATH, payload),

  getBookingById: (id: string): Promise<BookingResponse> =>
    httpGet(`${BOOKINGS_PATH}/${id}`),
};