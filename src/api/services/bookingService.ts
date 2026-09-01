import type { ServiceFilterParams } from "@/features/services/hooks/useServices";
import type { Service } from "@/features/services/types/service.types";
export interface ServiceItem {
  id: string;
  name: string;
  price: number;
}
export const bookingService = {
getServices: async (params?: ServiceFilterParams): Promise<ServiceItem[]> => {
    const res = await fetch('/api/v1/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    
    const data: ServiceItem[] = await res.json();

    return data.filter((item) => {
      const matchSearch = params?.search 
        ? item.name.toLowerCase().includes(params.search.toLowerCase())
        : true;
        
      const matchPrice = params?.maxPrice 
        ? item.price <= params.maxPrice 
        : true;

      return matchSearch && matchPrice;
    });
  },

  getServiceById: async (id: string): Promise<Service> => {
    // Eutai static file fetch garne
    const res = await fetch('/api/v1/services');
    
    if (!res.ok) {
      throw new Error('Failed to fetch services');
    }
    
    const services: Service[] = await res.json();
    
    // Array vitra exact ID filter/find garne
    const service = services.find((s) => String(s.id) === String(id));
    
    if (!service) {
      throw new Error('Service not found');
    }
    
    return service;
  },
};
