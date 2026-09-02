import { ArrowLeft, Clock, Calendar as CalendarIcon, Tag, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { BookingModal } from "./components/serviceBookingModel";
import { useParams } from "react-router-dom";
import { useServiceDetails } from "./hooks/useServiceDetails";

export const ServiceDetailsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { serviceId } = useParams<{ serviceId: string }>();
  const { service, loading, error } = useServiceDetails(serviceId);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      {/* Top Full-Width Header */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" className="gap-2 text-slate-600 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-slate-50 border-slate-200">
                  <Tag className="w-3 h-3 mr-1 text-slate-400" />
                  {service?.category}
                </Badge>
                <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{service?.rating}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {service?.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>
                Provided by <strong className="text-slate-800 font-semibold">{service?.provider}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Main Content */}
          <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">Description</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {service?.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800">Service Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Duration</p>
                    <p className="text-sm font-bold text-slate-800">{service?.duration} Minutes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50">
                  <CalendarIcon className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Availability</p>
                    <p className="text-sm font-bold text-slate-800">
                      {service?.available_days.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200 shadow-sm sticky top-6">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Total Price
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {service?.currency} {service?.price}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button size="lg" className="w-full font-semibold" onClick={() => setOpen(true)}>
                    Book Appointment
                  </Button>
                </div>
              </CardContent>

              <BookingModal isOpen={open} onClose={setOpen} service={service} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};