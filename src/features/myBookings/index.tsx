
import { useMyBookings } from "./hooks/useMyBookings";
import type { Column } from "../booking/types/columns.type";
import type { BookingPayload } from "@/api/services/booking";
import { List } from "@/components/list";
import { Badge } from "@/components/ui/badge";
export const MyBookingsPage = () => {
  const {bookings} = useMyBookings()
  console.log('booking',bookings)
  const columns: Column<BookingPayload>[] = [
    {
      header: "S.N",
      accessorKey: "",
      cell: (_, index) => {
        return <span>{(index || 0) + 1}</span>;
      },
    },
    {
      header: "Service Name",
      accessorKey: "service_name",
    },
    {
      header: "Customer Name",
      accessorKey: "customer_name",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell:(row) =>{
        const {status} = row
        return <Badge variant='outline'>{status}</Badge>
      }
    },
    {
      header: "Booking Date",
      accessorKey: "booking_date",
    },
    {
      header: "Time Slot",
      accessorKey: "time_slot",
    },
    // {
    //   header: "Actions",
    //   accessorKey: "actions",
    //   cell: (row) => {
    //     return <BusModel row={row} />;
    //   },
    // },
  ];
  console.log('bookings',bookings)
  return (

      <div className="max-w-6xl mx-auto my-8">
        <h1 className="text-2xl font-bold text-center">My Bookings</h1>
     <List
        columns={columns}
        rows={bookings}
      />
      </div>
  );
};