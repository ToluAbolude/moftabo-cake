
import { Link } from "react-router-dom";
import { Cart } from "@/components/cart/Cart";
import { Package, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const isMobile = useIsMobile();

  const menuItems = [
    { label: "Catalog", path: "/catalog" },
    { label: "Gallery", path: "/gallery" },
    { label: "Custom Order", path: "/custom" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-gray-600 hover:text-gray-900 transition-colors ${
            mobile ? "text-lg py-2" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - Left side */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <div className="flex items-center mb-8">
                  <img 
                    src="/lovable-uploads/b2097c3d-9103-4081-b628-4f03291bd9db.png" 
                    alt="Moftabo Cake Logo" 
                    className="h-8 w-8 mr-2"
                  />
                  <span className="font-bold text-lg text-cake-purple">Moftabo Cake</span>
                </div>
                <div className="flex flex-col space-y-4">
                  <NavLinks mobile={true} />
                  <div className="border-t pt-4 space-y-4">
                    <Link 
                      to="/orders" 
                      className="flex items-center text-gray-600 hover:text-gray-900 text-lg py-2"
                    >
                      <Package className="h-5 w-5 mr-2" />
                      Orders
                    </Link>
                    <Link 
                      to="/profile"
                      className="text-gray-600 hover:text-gray-900 text-lg py-2"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Logo - Center on mobile, left on desktop */}
          <Link 
            to="/" 
            className={`flex items-center ${isMobile ? "absolute left-1/2 transform -translate-x-1/2" : ""}`}
          >
            <img 
              src="/lovable-uploads/b2097c3d-9103-4081-b628-4f03291bd9db.png" 
              alt="Moftabo Cake Logo" 
              className="h-10 w-10"
            />
            {!isMobile && <span className="ml-2 font-bold text-lg text-cake-purple">Moftabo Cake</span>}
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
            </div>
          )}

          {/* Right side icons/actions */}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <Link 
                to="/orders" 
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Package className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            )}
            
            <Cart />
            
            {!isMobile && (
              <Link 
                to="/profile"
                className="text-gray-600 hover:text-gray-900"
              >
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
