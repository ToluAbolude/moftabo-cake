
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
    price: getBasePriceForSize('5-inch'),
    category: "Chocolate",
    rating: 4.8,
    reviews: 24,
    sizes: ["5-inch", "6-inch", "7-inch", "8-inch", "9-inch", "10-inch", "11-inch", "12-inch", "14-inch"],
    flavors: ["Chocolate", "Dark Chocolate"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Cocoa Powder", "Chocolate Ganache"]
  },
  {
    id: "2",
    name: "Strawberry Delight",
    description: "Vanilla sponge with fresh strawberries and cream. Decorated with whole strawberries and a light dusting of powdered sugar. A fruity treat!",
    imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: getBasePriceForSize('5-inch'),
    category: "Strawberry",
    rating: 4.9,
    reviews: 36,
    sizes: ["5-inch", "6-inch", "7-inch", "8-inch", "9-inch", "10-inch", "11-inch", "12-inch"],
    flavors: ["Vanilla", "Strawberry"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Fresh Strawberries", "Whipped Cream"]
  },
  {
    id: "3",
    name: "Fresh Strawberry Cake",
    description: "Pure strawberry sponge with strawberry buttercream and fresh berry compote. Made with real strawberry puree for an intense berry flavor!",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RyYXdiZXJyeSUyMGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: getBasePriceForSize('5-inch'),
    category: "Strawberry",
    rating: 4.9,
    reviews: 42,
    sizes: ["5-inch", "6-inch", "7-inch", "8-inch", "9-inch", "10-inch"],
    flavors: ["Strawberry", "Strawberry Vanilla"],
    ingredients: ["Flour", "Sugar", "Eggs", "Butter", "Strawberry Puree", "Strawberry Buttercream", "Fresh Strawberries"]
  }
];
