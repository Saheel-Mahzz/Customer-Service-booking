import { ServiceList } from './components/serviceList'
import { useServices } from './hooks/useServices';
import type { Service } from './types/service.types';

export default function Sevices() {

    const {services,loading,error} = useServices() 

    console.log('services',services)

const handleSelectService = (selectedService: Service) => {
    console.log("Selected Service:", selectedService);
    // Modal open garne wa navigation logic target garne
  };
return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Our Services</h1>
        <p className="text-muted-foreground mt-2">
          Choose a service below to start your booking process.
        </p>
      </header>

      {/* Passing props down to ServiceList */}
      <ServiceList
        services={services}
        isLoading={loading}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
