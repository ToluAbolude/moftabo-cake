
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

interface CakeCardProps {
  cake: Cake;
}

const CakeCard = ({ cake }: CakeCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={cake.imageUrl} 
          alt={cake.name} 
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50">
          <Heart className="h-4 w-4 text-gray-400 hover:text-cake-purple" />
        </button>
        <div className="absolute bottom-0 left-0 bg-cake-purple text-white px-3 py-1 text-xs">
          {cake.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{cake.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-2">{cake.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">${cake.price.toFixed(2)}</span>
          
          <Button 
            onClick={() => navigate(`/cake/${cake.id}`)}
            variant="ghost" 
            size="sm" 
            className="text-cake-purple hover:bg-cake-light-purple hover:text-cake-purple"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
