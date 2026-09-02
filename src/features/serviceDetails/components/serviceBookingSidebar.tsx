import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingModal } from "./serviceBookingModel";
import type { Service } from "@/features/services/types/service.types";

interface ServiceBookingSidebarProps {
  service: Service | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceBookingSidebar = ({ service, isOpen, onOpenChange }: ServiceBookingSidebarProps) => {
  return (
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
          <Button size="lg" className="w-full font-semibold" onClick={() => onOpenChange(true)}>
            Book Appointment
          </Button>
        </div>
      </CardContent>

      <BookingModal isOpen={isOpen} onClose={onOpenChange} service={service} />
    </Card>
  );
};