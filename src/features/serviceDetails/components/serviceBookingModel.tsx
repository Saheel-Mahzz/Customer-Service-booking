import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBooking } from "../hooks/useBooking";

interface BookingModalProps {
  isOpen: boolean;
  onClose: (value:boolean) => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const { createBooking, isLoading } = useBooking();
  const handleConfirm = async () => {
    try {
      await createBooking({
        serviceId: "1", // Dynamic badalna sakinchha
        service_name: "Home Cleaning",
        customer_name: "Alex",
        address: "Kathmandu",
        booking_date: "2026-09-02",
        time_slot: "09:00 AM",
      });

      alert("Booking successfully created on MockAPI!");
      onClose(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[425px] bg-slate-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Service</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Date Picker Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-slate-400" /> Select Date
            </label>
            <input
              type="date"
              defaultValue="2026-09-02"
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Time Slot Picker Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> Select Time Slot
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="text-xs">09:00 AM</Button>
              <Button variant="outline" size="sm" className="text-xs">11:00 AM</Button>
              <Button variant="outline" size="sm" className="text-xs">02:00 PM</Button>
              <Button variant="outline" size="sm" className="text-xs">04:00 PM</Button>
            </div>
          </div>

          <Separator />

          {/* Booking Summary UI */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-slate-800">Home Cleaning</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-semibold text-slate-800">2026-09-02 @ 09:00 AM</span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total Amount</span>
              <span className="text-primary">NPR 80</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={()=>onClose(false)}>
            Cancel
          </Button>
         <Button className="gap-2" onClick={handleConfirm} disabled={isLoading}>
  <CheckCircle2 className="w-4 h-4" /> 
  {isLoading ? "Submitting..." : "Confirm Booking"}
</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};