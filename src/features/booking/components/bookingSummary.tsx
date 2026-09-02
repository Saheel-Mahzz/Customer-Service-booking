import { Calendar, Clock, User, type LucideIcon } from "lucide-react";

interface BookingSummaryProps {
  date: string;
  timeSlot: string;
  customerName: string;
}

export const BookingSummary = ({ date, timeSlot, customerName }: BookingSummaryProps) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="mb-2 text-sm font-semibold text-slate-800">Booking Summary</h3>
      <div className="space-y-2 text-sm">
        <SummaryRow icon={Calendar} label="Date" value={date || "Not selected"} />
        <SummaryRow icon={Clock} label="Time" value={timeSlot || "Not selected"} />
        <SummaryRow icon={User} label="Name" value={customerName || "Not provided"} />
      </div>
    </div>
  );
};

interface SummaryRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const SummaryRow = ({ icon: Icon, label, value }: SummaryRowProps) => (
  <div className="flex items-center justify-between gap-3">
    <span className="flex items-center gap-2 text-slate-500">
      <Icon className="h-4 w-4" />
      {label}
    </span>
    <span className="truncate text-right font-medium text-slate-800">{value}</span>
  </div>
);
