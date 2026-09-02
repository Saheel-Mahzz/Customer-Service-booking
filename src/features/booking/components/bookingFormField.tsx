import type { LucideIcon } from "lucide-react";

interface BookingFormFieldProps {
  icon: LucideIcon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const BookingFormField = ({ icon: Icon, label, placeholder, value, onChange }: BookingFormFieldProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
        <Icon className="w-4 h-4 text-slate-400" /> {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
      />
    </div>
  );
};