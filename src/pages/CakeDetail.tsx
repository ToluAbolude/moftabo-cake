
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { allCakes } from "@/data/cakeData";
import CakeImage from "@/components/cakes/detail/CakeImage";
import CakeRating from "@/components/cakes/detail/CakeRating";
import CakeOptions from "@/components/cakes/detail/CakeOptions";
import QuantitySelector from "@/components/cakes/detail/QuantitySelector";
import DeliveryInfo from "@/components/cakes/detail/DeliveryInfo";
import IngredientsList from "@/components/cakes/detail/IngredientsList";
import { calculateCakePrice } from "@/utils/pricingUtils";

const CakeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const cake = allCakes.find(cake => cake.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(cake?.sizes[1] || "");
  const [selectedFlavor, setSelectedFlavor] = useState(cake?.flavors[0] || "");
  const [currentPrice, setCurrentPrice] = useState(
    calculateCakePrice({ size: selectedSize as '6-inch' | '8-inch' | '10-inch' })
  );
  
  if (!cake) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cake not found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the cake you're looking for.</p>
          <Button 
            onClick={() => navigate('/catalog')}
            className="bg-cake-purple hover:bg-cake-dark-purple text-white"
          >
            Browse All Cakes
          </Button>
        </div>
      </div>
    );
  }
  
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(prev => prev - 1);
  
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cake.id,
        name: `${cake.name} (${selectedSize}, ${selectedFlavor})`,
        price: currentPrice,
        quantity: quantity,
        imageUrl: cake.imageUrl
      }
    });

    toast({
      title: "Added to cart",
      description: `${quantity} ${cake.name} added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex mb-6 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-700">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/catalog')} className="hover:text-gray-700">Cakes</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{cake.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <CakeImage imageUrl={cake.imageUrl} altText={cake.name} />
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{cake.name}</h1>
            <CakeRating rating={cake.rating} reviews={cake.reviews} />
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              £{currentPrice.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6">{cake.description}</p>
            
            <CakeOptions
              sizes={cake.sizes}
              flavors={cake.flavors}
              selectedSize={selectedSize}
              selectedFlavor={selectedFlavor}
              onSizeSelect={setSelectedSize}
              onFlavorSelect={setSelectedFlavor}
              onPriceUpdate={setCurrentPrice}
            />
            
            <QuantitySelector
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
            
            <DeliveryInfo />
            
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-cake-purple hover:bg-cake-dark-purple text-white py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Heart className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
        
        <IngredientsList ingredients={cake.ingredients} />
      </main>
    </div>
  );
};

export default CakeDetail;
