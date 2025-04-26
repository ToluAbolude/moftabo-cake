
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

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
  const [isLiked, setIsLiked] = useState(false);
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to detail page when clicking the button
    
    // Add one item to cart
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cake.id,
        name: cake.name,
        price: cake.price,
        quantity: 1,
        imageUrl: cake.imageUrl
      }
    });

    toast({
      title: "Added to cart",
      description: `${cake.name} added to your cart`,
    });
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="relative">
        <img 
          src={cake.imageUrl} 
          alt={cake.name} 
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          onClick={() => navigate(`/cake/${cake.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <button 
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-gray-50 transition-transform duration-300 hover:scale-110"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
          />
        </button>
        <div className="absolute bottom-0 left-0 bg-cake-purple text-white px-3 py-1.5 text-xs font-medium rounded-tr-lg">
          {cake.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 
          className="font-medium text-gray-900 mb-1 truncate cursor-pointer"
          onClick={() => navigate(`/cake/${cake.id}`)}
        >
          {cake.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-3">{cake.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">£{cake.price.toFixed(2)}</span>
          
          <Button 
            onClick={handleAddToCart}
            variant="ghost" 
            size="sm" 
            className="text-cake-purple hover:bg-cake-light-purple hover:text-cake-purple group-hover:bg-cake-light-purple transition-colors duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;
