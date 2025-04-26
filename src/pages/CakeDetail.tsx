import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, Minus, Plus, Calendar, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

// Sample cake data
const allCakes = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting. Made with premium cocoa and topped with chocolate shavings. Perfect for chocolate lovers!",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 45.99,
    category: "Chocolate",
    rating: 4.8,
    reviews: 24,
    sizes: ["Small (6\")", "Medium (8\")", "Large (10\")"],
    flavors: ["Chocolate", "Dark Chocolate"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Cocoa Powder", "Chocolate Ganache"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream. Decorated with whole strawberries and a light dusting of powdered sugar. A fruity treat!",
    imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 48.99,
    category: "Fruit",
    rating: 4.9,
    reviews: 36,
    sizes: ["Small (6\")", "Medium (8\")", "Large (10\")"],
    flavors: ["Vanilla", "Strawberry"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Fresh Strawberries", "Whipped Cream"]
  }
];

const CakeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const cake = allCakes.find(cake => cake.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(cake?.sizes[1] || "");
  const [selectedFlavor, setSelectedFlavor] = useState(cake?.flavors[0] || "");
  
  if (!cake) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
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
        <Footer />
      </div>
    );
  }
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    // Add the cake to cart with selected options
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cake.id,
        name: `${cake.name} (${selectedSize}, ${selectedFlavor})`,
        price: cake.price,
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
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-gray-700">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate('/catalog')} className="hover:text-gray-700">Cakes</button>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{cake.name}</span>
        </nav>
        
        {/* Cake details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={cake.imageUrl}
              alt={cake.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{cake.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(cake.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">{cake.rating} ({cake.reviews} reviews)</span>
            </div>
            
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              £{cake.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-6">
              {cake.description}
            </p>
            
            {/* Size selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {cake.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className={selectedSize === size 
                      ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
                      : "border-gray-300 text-gray-700"}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Flavor selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Flavor</label>
              <div className="flex flex-wrap gap-2">
                {cake.flavors.map((flavor) => (
                  <Button
                    key={flavor}
                    variant={selectedFlavor === flavor ? "default" : "outline"}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={selectedFlavor === flavor 
                      ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
                      : "border-gray-300 text-gray-700"}
                  >
                    {flavor}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={handleDecrement}
                  className="p-2 border border-gray-300 rounded-l-md"
                >
                  <Minus className="h-4 w-4 text-gray-500" />
                </button>
                <span className="px-4 py-2 border-y border-gray-300 text-center w-12">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-2 border border-gray-300 rounded-r-md"
                >
                  <Plus className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Delivery info */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Calendar className="h-5 w-5 text-cake-purple flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Delivery & Pickup</p>
                  <p className="text-gray-600">Orders require 48 hours notice. Same-day pickup not available.</p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-3 text-sm">
                <Clock className="h-5 w-5 text-cake-purple flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Freshly Baked</p>
                  <p className="text-gray-600">All cakes are freshly baked to order with premium ingredients.</p>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
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
        
        {/* Cake ingredients */}
        <div className="border-t border-gray-200 pt-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {cake.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-cake-purple mr-2"></div>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CakeDetail;
