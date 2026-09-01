import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ServiceFilters = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {/* Search Input UI */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-full text-slate-400" />
        <Input
          type="text"
          placeholder="Search services..."
          className="pl-9 h-10 border-slate-200"
        />
      </div>

      {/* Category Filter Pills UI */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button size="sm" className="rounded-full text-xs font-medium">
          All
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">
          Cleaning
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">
          Maintenance
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">
          Plumbing
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs font-medium">
          Electrical
        </Button>
      </div>
    </div>
  );
};