import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ServiceDetailsHeader } from "./components/serviceDetailHeader";
import { useServiceDetails } from "./hooks/useServiceDetails";
import { ServiceBookingSidebar } from "./components/serviceBookingSidebar";
import { ServiceHighlightItem } from "./components/serviceHighlightItem";
import { Card, CardContent } from "@/components/ui/card";


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
     <Card className="lg:col-span-2  shadow-sm ">
  <CardContent className="p-6 sm:p-8 space-y-6">
    
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-slate-900">
        About this service
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        {service.description}
      </p>
    </section>

    <Separator className="bg-slate-100" />

    <section className="space-y-3">
      <h2 className="text-base font-semibold text-slate-900">
        Service Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ServiceHighlightItem
          icon={Clock}
          label="Duration"
          value={`${service.duration} mins`}
        />
        <ServiceHighlightItem
          icon={CalendarIcon}
          label="Availability"
          value={service.available_days.join(", ")}
        />
      </div>
    </section>

  </CardContent>
</Card>

          <div className="lg:col-span-1">
            <ServiceBookingSidebar service={service} isOpen={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};