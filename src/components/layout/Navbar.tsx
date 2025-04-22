import { Link } from "react-router-dom";
import { Cart } from "@/components/cart/Cart";

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
            <Cart />
            <Link to="/profile">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
