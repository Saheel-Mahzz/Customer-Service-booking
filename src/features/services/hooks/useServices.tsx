import { bookingService } from '@/api/services/bookingService';
import { useState, useEffect } from 'react';
import type { Service } from '../types/service.types';

export interface ServiceFilterParams {
  search?: string;
  maxPrice?: number;
}

export const useServices = (params?: ServiceFilterParams) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Params pass garne
        const data = await bookingService.getServices(params);
        
        if (isMounted) {
          setServices(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch services');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, [params?.search, params?.maxPrice]); // Dependencies check!

  return { services, loading, error };
};