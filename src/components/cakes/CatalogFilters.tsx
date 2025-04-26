
import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CatalogFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: string[];
}

const CatalogFilters = ({
  activeCategory,
  setActiveCategory,
  filterOpen,
  setFilterOpen,
  sortBy,
  setSortBy,
  categories,
}: CatalogFiltersProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="relative">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-cake-purple focus:border-cake-purple"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="mb-8 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-cake-purple hover:bg-cake-dark-purple text-white"
                    : "border-gray-300 text-gray-700"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogFilters;
