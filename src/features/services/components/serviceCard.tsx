import { Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Service {
  id: string;
  name?: string;
  title:string
  description: string;
  duration?: number; // minutes
  price: number;
}

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export const ServiceCard = ({ service, onSelect }: ServiceCardProps) => {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold">{service.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0 font-bold">
            ${service.price}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p className="line-clamp-2">{service.description}</p>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <Clock className="w-3.5 h-3.5" />
          <span>{service.duration} mins</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button 
          className="w-full" 
          onClick={() => onSelect(service)}
        >
          Book Appointment
        </Button>
      </CardFooter>
    </Card>
  );
};