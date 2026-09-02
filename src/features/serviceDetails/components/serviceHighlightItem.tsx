import type { LucideIcon } from "lucide-react";

interface ServiceHighlightItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const ServiceHighlightItem = ({ icon: Icon, label, value }: ServiceHighlightItemProps) => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg border border-slate-100 bg-slate-50">
      <Icon className="w-5 h-5 text-slate-500 shrink-0" />
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};