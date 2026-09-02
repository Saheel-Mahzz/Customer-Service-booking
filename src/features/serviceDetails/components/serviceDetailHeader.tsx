import { ArrowLeft, Tag, Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/features/services/types/service.types";

interface ServiceDetailsHeaderProps {
  service: Service | null;
  onBack: () => void;
}

export const ServiceDetailsHeader = ({ service, onBack }: ServiceDetailsHeaderProps) => {
  return (
    <div className="w-full bg-white border-b border-slate-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Button variant="ghost" size="sm" className="gap-2 text-slate-600 mb-2" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-slate-50 border-slate-200">
                <Tag className="w-3 h-3 mr-1 text-slate-400" />
                {service?.category}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{service?.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {service?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>
              Provided by <strong className="text-slate-800 font-semibold">{service?.provider}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};