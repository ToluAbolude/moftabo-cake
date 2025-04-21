
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import CakeCard from "../cakes/CakeCard";

// Sample cake data
const featuredCakes = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 45.99,
    category: "Chocolate",
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream",
    imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 48.99,
    category: "Fruit",
  },
  {
    id: "3",
    name: "Wedding Elegance",
    description: "Three-tier white cake with floral decorations",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHdlZGRpbmclMjBjYWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    price: 199.99,
    category: "Wedding",
  },
  {
    id: "4",
    name: "Birthday Bash",
    description: "Colorful funfetti cake with sprinkles galore",
    imageUrl: "https://images.unsplash.com/photo-1585157603822-1c7c80b40b45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJpcnRoZGF5JTIwY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    price: 39.99,
    category: "Birthday",
  }
];

const FeaturedCakes = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Cakes</h2>
          <button 
            onClick={() => navigate('/catalog')}
            className="text-cake-purple hover:text-cake-dark-purple flex items-center font-medium"
          >
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
