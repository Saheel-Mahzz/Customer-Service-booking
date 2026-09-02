import { Clock, Calendar, Tag } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ServiceCardProps } from "../types/service.types";
import { Link } from "react-router-dom";

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-shadow group">
      
      <CardHeader className="pb-3 space-y-2">
        <div className="flex justify-between items-center gap-2">
          <Badge variant="secondary" className="font-normal text-xs gap-1">
            <Tag className="w-3 h-3 text-slate-400" />
            {service.category}
          </Badge>
          <span className="text-lg font-bold text-slate-900">
            Rs. {service.price}
          </span>
        </div>

        <CardTitle className="text-base font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
          {service.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 text-xs text-slate-600 flex-1">
        <p className="line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <div className="pt-3 border-t border-slate-100 space-y-2 text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{service.duration} mins</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">
              {service?.available_days?.length ? service.available_days.join(", ") : "-"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50">
        <Link 
          to={`/service-details/${service.id}`}
          className="w-full items-center flex justify-center"
        >
          View Details
        </Link>
      </CardFooter>

    </Card>
  );
};