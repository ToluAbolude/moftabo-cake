
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "birthday",
    name: "Birthday Cakes",
    description: "Make your special day even sweeter",
    imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJpcnRoZGF5JTIwY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Elegant designs for your perfect day",
    imageUrl: "https://images.unsplash.com/photo-1623377406160-de05778541b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmclMjBjYWtlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
  },
  {
    id: "anniversary",
    name: "Anniversary Cakes",
    description: "Celebrate years of love and happiness",
    imageUrl: "https://images.unsplash.com/photo-1612203985729-70726e0382ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFubml2ZXJzYXJ5JTIwY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
  }
];

const CategorySection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cakes for Every Occasion</h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Whatever you're celebrating, Moftabo has the perfect cake to make your event memorable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-lg shadow-md h-80 group"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                  <Button 
                    onClick={() => navigate(`/catalog?category=${category.id}`)}
                    className="bg-cake-purple hover:bg-cake-dark-purple text-white"
                    size="sm"
                  >
                    Browse Cakes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
