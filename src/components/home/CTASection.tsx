
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CakeSlice } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import cakeImages from "@/assets/images/gallery";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cake-light-purple/50 to-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-cake-pink/20 blur-3xl"></div>
        <div className="absolute -left-20 top-20 w-80 h-80 rounded-full bg-cake-cream/30 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <ScrollReveal className="lg:w-1/2" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Create Your <span className="text-gradient">Dream Cake</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Can't find exactly what you're looking for? Design your own custom cake with our
              easy-to-use cake builder. Choose your favorite flavors, fillings, decorations, and more!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/custom">
                <Button className="bg-cake-purple hover:bg-cake-dark-purple text-white px-8 py-6 rounded-xl">
                  Start Designing
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" className="border-cake-purple text-cake-purple hover:bg-cake-light-purple px-8 py-6 rounded-xl">
                  View Gallery
                </Button>
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="lg:w-1/3 flex justify-center" delay={400} direction="left">
            <div className="relative">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src={cakeImages.cake13} 
                  alt="Custom cake creation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-xl shadow-lg p-4 glass-effect flex items-center justify-center">
                <CakeSlice className="h-12 w-12 text-cake-purple" strokeWidth={1.5} />
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={cakeImages.cake14} 
                  alt="Cake detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
