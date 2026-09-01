import React from 'react'
import { ServiceList } from './components/serviceList'
import type { Service } from './components/serviceCard';

export default function Sevices() {
    const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    title: "Haircut & Styling",
    price: 500,
    description: "Professional haircut, hair washing, and modern styling.",
  },
  {
    id: "2",
    title: "Beard Grooming",
    price: 300,
    description: "Beard shaping, mustache trimming, and hot towel treatment.",
  },
  {
    id: "3",
    title: "Facial & Skincare",
    price: 1200,
    description: "Deep cleansing facial to refresh and clear your skin.",
  },
];

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
        services={MOCK_SERVICES}
        isLoading={false}
        onSelectService={handleSelectService}
      />
    </div>
  );
}
