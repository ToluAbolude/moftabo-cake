import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { cakeImages } from "@/assets/images/gallery";
import CatalogHeader from "@/components/cakes/CatalogHeader";
import SearchBar from "@/components/cakes/SearchBar";
import CatalogFilters from "@/components/cakes/CatalogFilters";
import CakeGrid from "@/components/cakes/CakeGrid";

// Sample cake data
const allCakes = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting",
    imageUrl: cakeImages.cake31,
    price: 45.99,
    category: "Chocolate",
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream",
    imageUrl: cakeImages.cake32,
    price: 48.99,
    category: "Fruit",
  },
  {
    id: "3",
    name: "Wedding Elegance",
    description: "Three-tier white cake with floral decorations",
    imageUrl: cakeImages.cake33,
    price: 199.99,
    category: "Wedding",
  },
  {
    id: "4",
    name: "Birthday Bash",
    description: "Colorful funfetti cake with sprinkles galore",
    imageUrl: cakeImages.cake34,
    price: 39.99,
    category: "Birthday",
  },
  {
    id: "5",
    name: "Red Velvet Dream",
    description: "Moist red velvet with cream cheese frosting",
    imageUrl: cakeImages.cake35,
    price: 42.99,
    category: "Specialty",
  },
  {
    id: "6",
    name: "Lemon Blueberry",
    description: "Tangy lemon cake with blueberry compote",
    imageUrl: cakeImages.cake36,
    price: 47.99,
    category: "Fruit",
  },
  {
    id: "7",
    name: "Tiramisu Cake",
    description: "Coffee-soaked layers with mascarpone cream",
    imageUrl: cakeImages.cake37,
    price: 50.99,
    category: "Coffee",
  },
  {
    id: "8",
    name: "Anniversary Special",
    description: "Elegant cake with gold accents and roses",
    imageUrl: cakeImages.cake38,
    price: 149.99,
    category: "Anniversary",
  }
];

const categories = [
  "All", "Birthday", "Wedding", "Anniversary", "Chocolate", "Fruit", "Specialty", "Coffee"
];

const CakeCatalog = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
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
  const sortedCakes = [...filteredCakes].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0; // Default (featured)
  });
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CatalogHeader />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <CatalogFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
          />
        </div>
        
        <CakeGrid cakes={sortedCakes} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CakeCatalog;
