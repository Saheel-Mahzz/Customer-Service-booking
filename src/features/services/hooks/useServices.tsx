import { bookingService } from '@/api/services/bookingService';
import { useState, useEffect } from 'react';
import type { Service } from '../types/service.types';

export interface ServiceFilterParams {
  search?: string;
  maxPrice?: number;
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
        const data = await bookingService.getServices(params);

        if (isMounted) {
          setState({
            services: data,
            loading: false,
            error: null,
          });
        }
      } catch (err: any) {
        if (isMounted) {
          setState({
            services: [],
            loading: false,
            error: err.message || "Failed to fetch services",
          });
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, [params?.search, params?.maxPrice]);

  return state; 
};