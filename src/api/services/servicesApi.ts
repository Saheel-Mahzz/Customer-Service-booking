import type { Service } from "@/features/services/types/service.types";
import { servicesMock } from "../mock/servicesMock";

export interface ServiceFilterParams {
  search?: string;
  maxPrice?: number;
}

export const servicesApi = {
  getServices: async (params?: ServiceFilterParams): Promise<Service[]> => {
    const data = await servicesMock.fetchAll();

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
    return servicesMock.fetchById(id);
  },
};