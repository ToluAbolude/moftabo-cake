import { useSearchParams } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { cakeImages } from "@/assets/images/gallery";
import CatalogHeader from "@/components/cakes/CatalogHeader";
import SearchBar from "@/components/cakes/SearchBar";
import CatalogFilters from "@/components/cakes/CatalogFilters";
import CakeGrid from "@/components/cakes/CakeGrid";
import { useCakeCatalog } from "@/hooks/useCakeCatalog";
import { getBasePriceForSize } from "@/utils/pricingUtils";

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

const allCakes: Cake[] = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting. Perfect for birthdays! Most popular as an 8-inch cake with dark chocolate flavor.",
    imageUrl: cakeImages.cake31,
    price: getBasePriceForSize('8-inch'),
    category: "Chocolate",
    sizes: ["6-inch", "8-inch", "10-inch"],
    flavors: ["Chocolate", "Dark Chocolate"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream. Ideal for summer parties! Bestseller as a 6-inch cake with vanilla-strawberry combination.",
    imageUrl: cakeImages.cake32,
    price: getBasePriceForSize('6-inch'),
    category: "Fruit",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Strawberry"]
  },
  {
    id: "3",
    name: "Wedding Elegance",
    description: "Three-tier white cake with floral decorations. Most elegant in 10-inch size with classic vanilla flavor. Perfect for intimate weddings of 50-75 guests.",
    imageUrl: cakeImages.cake33,
    price: getBasePriceForSize('10-inch'),
    category: "Wedding",
    sizes: ["8-inch", "10-inch", "12-inch"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"]
  },
  {
    id: "4",
    name: "Birthday Bash",
    description: "Colorful funfetti cake with sprinkles galore. Kids' favorite in 8-inch size with funfetti flavor. Serves 10-12 party guests perfectly!",
    imageUrl: cakeImages.cake34,
    price: getBasePriceForSize('8-inch'),
    category: "Birthday",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Funfetti"]
  },
  {
    id: "5",
    name: "Red Velvet Dream",
    description: "Moist red velvet with cream cheese frosting. Most popular as a 6-inch cake - perfect for intimate celebrations or romantic dinners!",
    imageUrl: cakeImages.cake35,
    price: getBasePriceForSize('6-inch'),
    category: "Specialty",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Red Velvet"]
  },
  {
    id: "6",
    name: "Lemon Blueberry",
    description: "Tangy lemon cake with blueberry compote. Bestseller in 8-inch size, serves 8-10 people. Perfect for spring gatherings and afternoon teas!",
    imageUrl: cakeImages.cake36,
    price: getBasePriceForSize('8-inch'),
    category: "Fruit",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Lemon", "Blueberry"]
  },
  {
    id: "7",
    name: "Tiramisu Cake",
    description: "Coffee-soaked layers with mascarpone cream. Most ordered as a 6-inch cake for coffee lovers. Ideal for after-dinner desserts!",
    imageUrl: cakeImages.cake37,
    price: getBasePriceForSize('6-inch'),
    category: "Coffee",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Coffee", "Mascarpone"]
  },
  {
    id: "8",
    name: "Anniversary Special",
    description: "Elegant cake with gold accents and roses. Most romantic in 10-inch size with champagne flavor. Perfect for celebrating milestone anniversaries!",
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
