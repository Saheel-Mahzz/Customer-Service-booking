import { bookingService } from '@/api/services/bookingService';
import type { Service } from '@/features/services/types/service.types';
import { useState, useEffect } from 'react';

export const useServiceDetails = (serviceId?: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Service ID nai pachhaidaina bhane fetch process skip garne
    if (!serviceId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await bookingService.getServiceById(serviceId);

        if (isMounted) {
          setService(data);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Failed to fetch service details';
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServiceDetail();

    // Memory leak preventing cleanup
    return () => {
      isMounted = false;
    };
  }, [serviceId]);

  return { service, loading, error };
};