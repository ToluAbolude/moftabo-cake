
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import cakeImages from "@/assets/images/gallery";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-cake-light-purple/20 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-32 w-72 h-72 rounded-full bg-cake-pink/20 blur-3xl"></div>
        <div className="absolute -left-10 bottom-20 w-80 h-80 rounded-full bg-cake-peach/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="space-y-6" delay={200}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Delicious Cakes for <span className="text-gradient">Every Celebration</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Over 7 years of creating unforgettable cake experiences. From birthdays to weddings,
              let Moftabo make your special moments even sweeter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/catalog">
                <Button className="w-full sm:w-auto bg-cake-purple hover:bg-cake-dark-purple text-white px-8 py-6 rounded-xl text-base">
                  Order Now
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="outline" className="w-full sm:w-auto border-cake-purple text-cake-purple hover:bg-cake-light-purple px-8 py-6 rounded-xl text-base">
                  Custom Design
                </Button>
              </Link>
            </div>
            
            <div className="hidden md:flex pt-6">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-xs font-medium text-pink-800">99+</div>
                <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src={cakeImages.cake3} alt="Customer" />
                <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src={cakeImages.cake4} alt="Customer" />
                <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src={cakeImages.cake5} alt="Customer" />
              </div>
              <span className="ml-4 text-sm text-gray-500">Trusted by hundreds of happy customers</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={400} direction="left">
            <div className="relative">
              <img
                className="w-full h-auto rounded-3xl shadow-2xl"
                src={cakeImages.cake1}
                alt="Beautifully decorated cake"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl rotate-12 overflow-hidden border-4 border-white shadow-lg">
                <img
                  className="w-full h-full object-cover"
                  src={cakeImages.cake2}
                  alt="Cake detail"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Hero;
