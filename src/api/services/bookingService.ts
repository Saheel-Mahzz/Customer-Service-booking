import type { ServiceFilterParams } from "@/features/services/hooks/useServices";
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
};
