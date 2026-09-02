import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingModal } from "./serviceBookingModel";
import type { Service } from "@/features/services/types/service.types";

interface ServiceBookingSidebarProps {
  service: Service | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceBookingSidebar = ({
  service,
  isOpen,
  onOpenChange,
}: ServiceBookingSidebarProps) => {
  return (
    <Card className="sticky top-6 shadow-md border-slate-200/80 border-0">
      <CardContent className="p-6 space-y-6">
        
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Pricing
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              {service?.currency || "NPR"} {service?.price ?? "0"}
            </span>
            <span className="text-xs font-medium text-slate-500">
              per session
            </span>
          </div>
        </div>

        <Separator />

        {/* Essential Perks */}
        <div className="space-y-2.5 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Instant confirmation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
           <span className="text-slate-600 font-medium text-xs">Safe & seamless payment</span>
          </div>
        </div>
        <Button 
          size="lg" 
          className="w-full font-semibold shadow-sm cursor-pointer" 
          onClick={() => onOpenChange(true)}
        >
          Book Appointment
        </Button>
      </CardContent>
      <CardFooter className="bg-slate-50/50 px-6 py-3 border-t text-center justify-center">
      <span className="text-[11px] text-slate-400 font-medium">Pay safely via credit card or online banking</span>
      </CardFooter>

      <BookingModal isOpen={isOpen} onClose={onOpenChange} service={service} />
    </Card>
  );
};