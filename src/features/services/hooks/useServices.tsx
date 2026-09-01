import { bookingService } from '@/api/services/bookingService';
import { useState, useEffect } from 'react';
import type { Service } from '../components/serviceCard';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookingService.getServices();
        if (isMounted) {
          setServices(data);
        }
      } catch (err) {
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
  }, []);

  return { services, loading, error };
};