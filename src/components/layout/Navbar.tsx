
import { Link } from "react-router-dom";
import { Cart } from "@/components/cart/Cart";
import { Package } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-lg">
              Cake Shop
            </Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/custom">Custom Order</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/orders" className="flex items-center">
              <Package className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Orders</span>
            </Link>
            <Cart />
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
