import { useSearchParams } from 'react-router-dom';
import { ServiceList } from './components/serviceList';
import { useServices } from './hooks/useServices';
import { ServiceFilters } from './components/serviceFilters';

export default function Services() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search') || '';

  const { services, loading, error } = useServices({ search });
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-muted-foreground mt-2">
          Choose a service below to start your booking process.
        </p>
      </header>
          <ServiceFilters/>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <ServiceList
        services={services}
        isLoading={loading}
      />
    </div>
  );
}