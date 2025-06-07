
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cake-light-pink via-white to-cake-cream overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-cake-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-cake-pink/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cake-cream/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-cake-purple">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Over 11 years of creating unforgettable cake experiences</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cake-dark-purple leading-tight">
                Custom Cakes
                <span className="block text-cake-purple">Made with Love</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                From birthday celebrations to wedding dreams, we create beautiful, delicious cakes that make every moment special. Each cake is crafted with premium ingredients and artistic passion.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/custom">
                <Button size="lg" className="group">
                  Order Custom Cake
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/catalog">
                <Button variant="outline" size="lg">
                  Browse Catalog
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-cake-purple">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cake-purple">11+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cake-purple">100%</div>
                <div className="text-sm text-gray-600">Fresh Ingredients</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful custom cake by Moftabo"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-lg z-20">
              <div className="text-center">
                <div className="text-xl font-bold text-cake-purple">4.9</div>
                <div className="flex text-yellow-400 text-sm">
                  ★★★★★
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-cake-purple text-white rounded-full p-6 shadow-lg z-20">
              <div className="text-center">
                <div className="text-lg font-bold">Fresh</div>
                <div className="text-sm">Daily</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
