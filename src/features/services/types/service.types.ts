export interface Service {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  durationMinutes?: number;
  availableDays?: string[];
}

export interface ServiceCardProps {
  service: Service;
}
