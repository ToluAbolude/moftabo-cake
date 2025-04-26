
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/animations/ScrollReveal";
import cakeImages from "@/assets/images/gallery";

const categories = [
  {
    id: "birthday",
    name: "Birthday Cakes",
    description: "Make your special day even sweeter",
    imageUrl: cakeImages.cake7
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Elegant designs for your perfect day",
    imageUrl: cakeImages.cake8
  },
  {
    id: "anniversary",
    name: "Anniversary Cakes",
    description: "Celebrate years of love and happiness",
    imageUrl: cakeImages.cake9
  }
];

const CategorySection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cakes for <span className="text-gradient">Every Occasion</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whatever you're celebrating, Moftabo has the perfect cake to make your event memorable
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <ScrollReveal 
              key={category.id}
              delay={300 * (index + 1)}
              direction={index === 1 ? "up" : (index === 0 ? "right" : "left")}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg h-96 group">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover 
                    group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200 mb-6">{category.description}</p>
                    <Button 
                      onClick={() => navigate(`/catalog?category=${category.id}`)}
                      className="bg-cake-purple hover:bg-cake-dark-purple text-white"
                    >
                      Browse Cakes
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
