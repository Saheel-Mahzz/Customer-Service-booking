import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = ["All", "Cleaning", "Maintenance", "Plumbing", "Electrical"];

export const ServiceFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL bata exact current filters line
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "All";

  // Search input typing handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchParams((prev) => {
      if (val) {
        prev.set("search", val);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  // Category pill click handler
  const handleCategoryClick = (category: string) => {
    setSearchParams((prev) => {
      if (category !== "All") {
        prev.set("category", category);
      } else {
        prev.delete("category");
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      {/* Search Input UI */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          value={currentSearch}
          onChange={handleSearchChange}
          placeholder="Search services..."
          className="pl-9 h-10 border-slate-200"
        />
      </div>

      {/* Category Filter Pills UI */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat;
          return (
            <Button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs font-medium"
            >
              {cat}
            </Button>
          );
        })}
      </div>
    </div>
  );
};