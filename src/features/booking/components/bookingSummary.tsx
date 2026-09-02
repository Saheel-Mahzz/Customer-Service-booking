import { Separator } from "@/components/ui/separator";

interface BookingSummaryProps {
  currency?: string;
  price: number;
}

export const BookingSummary = ({ currency, price }: BookingSummaryProps) => {
  return (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2.5">
      <Separator />
      <div className="flex justify-between text-base font-bold">
        <span>Total Amount</span>
        <span className="text-primary">
          {currency || "NPR"} {price}
        </span>
      </div>
    </div>
  );
};