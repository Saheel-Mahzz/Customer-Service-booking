import { Users } from "lucide-react";
import type { Service } from "../types/service.types";
import { ServiceCard } from "./serviceCard";


interface ServiceListProps {
  services: Service[];
  isLoading: boolean;
  onSelectService: (service: Service) => void;
}

export const ServiceList = ({ services, isLoading, onSelectService }: ServiceListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Users  key={n} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No services available right now.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          onSelect={onSelectService} 
        />
      ))}
    </div>
  );
};