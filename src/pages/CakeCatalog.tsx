
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { cakeImages } from "@/assets/images/gallery";
import CatalogHeader from "@/components/cakes/CatalogHeader";
import SearchBar from "@/components/cakes/SearchBar";
import CatalogFilters from "@/components/cakes/CatalogFilters";
import CakeGrid from "@/components/cakes/CakeGrid";
import { useCakeCatalog } from "@/hooks/useCakeCatalog";
import { getBasePriceForSize } from "@/utils/pricingUtils";

// Sample cake data with updated prices using our pricing system
const allCakes = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting",
    imageUrl: cakeImages.cake31,
    price: getBasePriceForSize('6-inch'),
    category: "Chocolate",
    sizes: ["6-inch", "8-inch", "10-inch"],
    flavors: ["Chocolate", "Dark Chocolate"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream",
    imageUrl: cakeImages.cake32,
    price: getBasePriceForSize('6-inch'),
    category: "Fruit",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Strawberry"]
  },
  {
    id: "3",
    name: "Wedding Elegance",
    description: "Three-tier white cake with floral decorations",
    imageUrl: cakeImages.cake33,
    price: getBasePriceForSize('10-inch'),
    category: "Wedding",
    sizes: ["8-inch", "10-inch", "12-inch"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"]
  },
  {
    id: "4",
    name: "Birthday Bash",
    description: "Colorful funfetti cake with sprinkles galore",
    imageUrl: cakeImages.cake34,
    price: getBasePriceForSize('6-inch'),
    category: "Birthday",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Funfetti"]
  },
  {
    id: "5",
    name: "Red Velvet Dream",
    description: "Moist red velvet with cream cheese frosting",
    imageUrl: cakeImages.cake35,
    price: getBasePriceForSize('8-inch'),
    category: "Specialty",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Red Velvet"]
  },
  {
    id: "6",
    name: "Lemon Blueberry",
    description: "Tangy lemon cake with blueberry compote",
    imageUrl: cakeImages.cake36,
    price: getBasePriceForSize('8-inch'),
    category: "Fruit",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Lemon", "Blueberry"]
  },
  {
    id: "7",
    name: "Tiramisu Cake",
    description: "Coffee-soaked layers with mascarpone cream",
    imageUrl: cakeImages.cake37,
    price: getBasePriceForSize('8-inch'),
    category: "Coffee",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Coffee", "Mascarpone"]
  },
  {
    id: "8",
    name: "Anniversary Special",
    description: "Elegant cake with gold accents and roses",
    imageUrl: cakeImages.cake38,
    price: getBasePriceForSize('10-inch'),
    category: "Anniversary",
    sizes: ["8-inch", "10-inch"],
    flavors: ["Vanilla", "Champagne"]
  }
];

const categories = [
  "All", "Birthday", "Wedding", "Anniversary", "Chocolate", "Fruit", "Specialty", "Coffee"
];

const CakeCatalog = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const {
    filteredAndSortedCakes,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    sortBy,
    setSortBy,
    filterOpen,
    setFilterOpen
  } = useCakeCatalog({
    allCakes,
    initialCategory: categoryParam || "All"
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
        
        <CakeGrid cakes={filteredAndSortedCakes} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CakeCatalog;
