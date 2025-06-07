import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/b2097c3d-9103-4081-b628-4f03291bd9db.png" 
                alt="Moftabo Cakes Logo" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-xl font-bold text-cake-dark-purple">Moftabo</span>
            </div>
            <p className="text-gray-600 mb-6">
              Delicious custom cakes made with love for over 11 years. Every celebration deserves a Moftabo cake.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cake-purple transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cake-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cake-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-600 hover:text-cake-purple transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-600 hover:text-cake-purple transition-colors">
                  Custom Order
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-cake-purple transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-cake-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-cake-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-3 text-cake-purple" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-3 text-cake-purple" />
                <span>contact@moftabo.com</span>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-cake-purple" />
                <span>123 Bakery Street, Cake City, CC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Moftabo Cake Creations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
