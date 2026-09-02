import { useState, useEffect } from 'react';
import type { Service } from '../types/service.types';
import { servicesApi } from '@/api/services/servicesApi';

export interface ServiceFilterParams {
  search?: string;
  maxPrice?: number;
  category?: string;
}
interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

export const useServices = (params?: ServiceFilterParams) => {
  const [state, setState] = useState<ServicesState>({
    services: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      if (isMounted) {
        setState((prev) => ({ ...prev, loading: true, error: null }));
      }

      try {
        const data = await servicesApi.getServices(params);

        if (isMounted) {
          setState({
            services: data,
            loading: false,
            error: null,
          });
        }
      } catch (err: unknown) {
        if (isMounted) {
          setState({
            services: [],
            loading: false,
            error: err instanceof Error ? err.message : "Failed to fetch services",
          });
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, [params?.search, params?.maxPrice, params?.category]);

  return state; 
};