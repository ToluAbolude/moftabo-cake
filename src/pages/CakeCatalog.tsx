
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import CakeCard from "@/components/cakes/CakeCard";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cakeImages } from "@/assets/images/gallery";

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
        {/* Page header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Cakes</h1>
          <p className="mt-2 text-gray-500">Browse our collection of delicious cakes for every occasion</p>
        </div>
        
        {/* Search and filter section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-xs w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-cake-purple focus:border-cake-purple"
            />
          </div>
          
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
        </div>
        
        {/* Filters */}
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
        
        {/* Cake grid */}
        {sortedCakes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedCakes.map(cake => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No cakes found. Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CakeCatalog;
