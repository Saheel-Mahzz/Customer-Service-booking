import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMyBookings } from "./hooks/useMyBookings";

// Mock Data structure for UI representation
const MOCK_BOOKINGS = [
  {
    id: "BK-101",
    serviceName: "Home Cleaning",
    category: "Cleaning",
    date: "2026-09-05",
    time: "09:00 AM",
    price: 80,
    currency: "NPR",
    status: "Confirmed",
    address: "Kathmandu, Nepal",
  },
  {
    id: "BK-102",
    serviceName: "AC Repair & Servicing",
    category: "Maintenance",
    date: "2026-09-10",
    time: "02:00 PM",
    price: 50,
    currency: "NPR",
    status: "Pending",
    address: "Lalitpur, Nepal",
  },
  {
    id: "BK-103",
    serviceName: "Plumbing Inspection",
    category: "Plumbing",
    date: "2026-08-20",
    time: "11:00 AM",
    price: 40,
    currency: "NPR",
    status: "Completed",
    address: "Kathmandu, Nepal",
  },
];

export const MyBookingsPage = () => {
  const {bookings} = useMyBookings()

  console.log('bookings',bookings)
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      {/* Top Header */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Button>
          <h1 className="text-xl font-bold text-slate-900">My Bookings</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Tabs defaultValue="all" className="w-full space-y-6">
          <TabsList className="bg-slate-200/60 p-1">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400">{booking.id}</span>
                    <CardTitle className="text-lg font-bold text-slate-800">
                      {booking.service_name}
                    </CardTitle>
                  </div>

                  {/* Dynamic Status Badges */}
                  {booking.status === "confirmed" && (
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 hover:bg-emerald-50">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                    </Badge>
                  )}
                  {booking.status === "pending" && (
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1 hover:bg-amber-50">
                      <Clock3 className="w-3.5 h-3.5" /> Pending
                    </Badge>
                  )}
                  {booking.status === "completed" && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 gap-1">
                      Completed
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 text-sm text-slate-600">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{booking.booking_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{booking.time_slot}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{booking.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Amount: <strong className="text-sm font-bold text-slate-800">{booking.currency} {booking.price}</strong>
                    </span>

                    {booking.status !== "Completed" && (
                      <Button variant="outline" size="sm" className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-slate-200">
                        <XCircle className="w-3.5 h-3.5 mr-1" /> Cancel Booking
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming">
            <p className="text-sm text-slate-500 py-4">Showing upcoming appointments only.</p>
          </TabsContent>

          <TabsContent value="completed">
            <p className="text-sm text-slate-500 py-4">Showing completed past bookings only.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};