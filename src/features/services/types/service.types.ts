export interface Service {
  id: string;
  name: string;
  category?: string;
  description?: string;
  price: number;
  duration?: number;
  available_days?: string[];
  rating?:number
  provider?:string
  currency?:string
  available_time_slots?: string[];
}

export interface ServiceCardProps {
  service: Service;
}
