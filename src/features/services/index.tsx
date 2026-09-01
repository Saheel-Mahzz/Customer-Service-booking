import { ServiceList } from './components/serviceList';
import { useServices } from './hooks/useServices';
import type { Service } from './types/service.types';
import { ServiceFilters } from './components/serviceFilters';

export default function Services() {
  // 1. URL bata search params read/write garne hook

  // 2. Current search text URL bata extract garne

  // 3. Filter params custom hook ma pass garne
  const { services, loading, error } = useServices({ search });

 

  const handleSelectService = (selectedService: Service) => {
    console.log("Selected Service:", selectedService);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-muted-foreground mt-2">
          Choose a service below to start your booking process.
        </p>
      </header>

      {/* Filter UI / Search Input */}
      {/* <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search services..."
          className="w-full max-w-sm rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div> */}
          <ServiceFilters/>


      {/* Error State */}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {/* Service List Component */}
      <ServiceList
        services={services}
        isLoading={loading}
        onSelectService={handleSelectService}
      />
    </div>
  );
}