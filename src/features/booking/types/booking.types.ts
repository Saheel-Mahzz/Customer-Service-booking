export interface BookingFormData {
  booking_date: string;
  selected_slot: string;
  customer_name: string;
  address: string;
}


export interface BookingPayload {
  serviceId: string;
  service_name: string;
  customer_name: string;
  address: string;
  booking_date: string;
  time_slot: string;
}

export interface BookingResponse extends BookingPayload {
  id: string;
  booking_number: string;
  status: string;
  createdAt: string;
}
