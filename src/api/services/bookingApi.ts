import { httpGet, httpPost } from "../client/httpClient";
import type { BookingPayload, BookingResponse } from "./booking";

const BOOKINGS_URL = "https://6a96fb6f0e3240db90619aa3.mockapi.io/bookings";

export const bookingApi = {
  getBookings: (): Promise<BookingResponse[]> => httpGet(BOOKINGS_URL),

  createBooking: (payload: BookingPayload): Promise<BookingResponse> =>
    httpPost(BOOKINGS_URL, payload),

  getBookingById: (id: string): Promise<BookingResponse> =>
    httpGet(`${BOOKINGS_URL}/${id}`),
};