import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceDetailsHeader } from "./components/serviceDetailHeader";
import { useServiceDetails } from "./hooks/useServiceDetails";
import { ServiceBookingSidebar } from "./components/serviceBookingSidebar";
import { ServiceHighlightItem } from "./components/serviceHighlightItem";


export const ServiceDetailsPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { serviceId } = useParams<{ serviceId: string }>();
  const { service, loading, error } = useServiceDetails(serviceId);
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading service details...</div>;
  }

  if (error || !service) {
    return <div className="p-8 text-center text-red-500">Failed to load service details.</div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      <ServiceDetailsHeader service={service} onBack={() => navigate(-1)} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800">Description</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800">Service Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ServiceHighlightItem
                  icon={Clock}
                  label="Duration"
                  value={`${service.duration} Minutes`}
                />
                <ServiceHighlightItem
                  icon={CalendarIcon}
                  label="Availability"
                  value={service.available_days.join(", ")}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ServiceBookingSidebar service={service} isOpen={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};