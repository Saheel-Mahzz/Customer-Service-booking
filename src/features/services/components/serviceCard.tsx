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
    <Card className="flex flex-col justify-between border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex justify-between items-center gap-2">
          <Badge variant="outline" className="bg-slate-50 text-slate-700 font-medium text-xs border-slate-200">
            <Tag className="w-3 h-3 mr-1 text-slate-400" />
            {service.category}
          </Badge>
          <span className="text-xl font-bold text-slate-900">
            ${service.price}
          </span>
        </div>

        <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
          {service.name}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm text-slate-600 flex-1">
        <p className="line-clamp-2 leading-relaxed text-xs">
          {service.description}
        </p>

        <div className="pt-2 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{service.durationMinutes} mins</span>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {service.availableDays.map((day) => (
                <span 
                  key={day} 
                  className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
   
        <Link to={`/service-details/${service.id}`}>
  Details
</Link>
      </CardFooter>
    </Card>
  );
};