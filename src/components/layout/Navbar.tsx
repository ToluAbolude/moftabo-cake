
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, CakeSlice } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CakeSlice className="h-8 w-8 text-cake-purple" strokeWidth={2} />
              <span className="ml-2 text-xl font-bold text-cake-dark-purple">Moftabo</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              Cakes
            </Link>
            <Link to="/custom" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              Custom Order
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              About Us
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              Register
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-cake-purple transition-colors px-3 py-2">
              Profile
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
              </Link>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center border-cake-purple text-cake-purple hover:bg-cake-light-purple">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="p-2 mr-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/catalog"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Cakes
            </Link>
            <Link
              to="/custom"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Order
            </Link>
            <Link
              to="/gallery"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-cake-purple"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
