
import { CakeSize, getBasePriceForSize } from "@/utils/pricingUtils";

export interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  sizes?: CakeSize[];
  flavors?: string[];
  ingredients: string[];
}

// Get the base price for the smallest size for each cake
export const allCakes: Cake[] = [
  {
    id: "1",
    name: "Classic Chocolate",
    description: "Rich chocolate layers with smooth ganache frosting. Made with premium cocoa and topped with chocolate shavings. Perfect for chocolate lovers!",
    imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: getBasePriceForSize('6-inch'),
    category: "Chocolate",
    rating: 4.8,
    reviews: 24,
    sizes: ["6-inch", "8-inch", "10-inch"],
    flavors: ["Chocolate", "Dark Chocolate"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Cocoa Powder", "Chocolate Ganache"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream. Decorated with whole strawberries and a light dusting of powdered sugar. A fruity treat!",
    imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: getBasePriceForSize('6-inch'),
    category: "Fruit",
    rating: 4.9,
    reviews: 36,
    sizes: ["6-inch", "8-inch", "10-inch"],
    flavors: ["Vanilla", "Strawberry"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Fresh Strawberries", "Whipped Cream"]
  }
];
