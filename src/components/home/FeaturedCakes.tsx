
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import CakeCard from "../cakes/CakeCard";
import ScrollReveal from "@/components/animations/ScrollReveal";
import cakeImages from "@/assets/images/gallery";
import { calculateCakePrice } from "@/utils/pricingUtils";

// Updated cake data with specific descriptions and calculated prices
const featuredCakes = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "8-inch chocolate cake with dark chocolate frosting. Perfect for birthdays or celebrations. £120.00",
    imageUrl: cakeImages.cake3,
    price: calculateCakePrice({ size: "8-inch", isCustomDesign: false, isRushOrder: false }),
    category: "Chocolate",
    sizes: ["6-inch", "8-inch", "10-inch"],
    flavors: ["Chocolate", "Dark Chocolate"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "6-inch vanilla sponge with fresh strawberry cream. Ideal for summer gatherings. £75.00",
    imageUrl: cakeImages.cake4,
    price: calculateCakePrice({ size: "6-inch", isCustomDesign: false, isRushOrder: false }),
    category: "Fruit",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Strawberry"]
  },
  {
    id: "3",
    name: "Wedding Elegance",
    description: "10-inch three-tier vanilla cake with elegant decorations. Perfect for intimate weddings. £180.00",
    imageUrl: cakeImages.cake5,
    price: calculateCakePrice({ size: "10-inch", isCustomDesign: false, isRushOrder: false }),
    category: "Wedding",
    sizes: ["8-inch", "10-inch", "12-inch"],
    flavors: ["Vanilla", "Chocolate", "Red Velvet"]
  },
  {
    id: "4",
    name: "Birthday Bash",
    description: "8-inch funfetti cake with colorful decorations. Perfect for children's parties. Serves 10-12. £120.00",
    imageUrl: cakeImages.cake6,
    price: calculateCakePrice({ size: "8-inch", isCustomDesign: false, isRushOrder: false }),
    category: "Birthday",
    sizes: ["6-inch", "8-inch"],
    flavors: ["Vanilla", "Funfetti"]
  }
];

const FeaturedCakes = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="text-gradient">Popular</span> Cakes
            </h2>
            <button 
              onClick={() => navigate('/catalog')}
              className="group text-cake-purple hover:text-cake-dark-purple flex items-center font-medium"
            >
              View all 
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredCakes.map((cake, index) => (
            <ScrollReveal key={cake.id} delay={200 * (index + 1)}>
              <CakeCard cake={cake} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
