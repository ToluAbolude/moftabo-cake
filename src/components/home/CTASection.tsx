
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CakeSlice } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-cake-light-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Dream Cake</h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find exactly what you're looking for? Design your own custom cake with our
              easy-to-use cake builder. Choose your favorite flavors, fillings, decorations, and more!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/custom">
                <Button className="bg-cake-purple hover:bg-cake-dark-purple text-white">
                  Start Designing
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" className="border-cake-purple text-cake-purple hover:bg-cake-light-purple">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-cake-peach opacity-20 rounded-full"></div>
              <CakeSlice className="h-24 w-24 text-cake-purple" strokeWidth={1.5} />
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-cake-pink rounded-full opacity-50"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-cake-cream rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
