
import { useState } from "react";

interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  sizes?: string[];
  flavors?: string[];
}

interface UseCakeCatalogProps {
  allCakes: Cake[];
  initialCategory?: string;
}

interface UseCakeCatalogReturn {
  filteredAndSortedCakes: Cake[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}

export const useCakeCatalog = ({ allCakes, initialCategory = "All" }: UseCakeCatalogProps): UseCakeCatalogReturn => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter cakes based on search term and category
  const filteredCakes = allCakes.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         cake.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || 
                          cake.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  
  // Sort cakes based on selected option
  const filteredAndSortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // Default (featured)
  });

  return {
    filteredAndSortedCakes,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    filterOpen,
    setFilterOpen
  };
};
