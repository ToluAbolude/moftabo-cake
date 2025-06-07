
import { Shield, Users, Clock, Palette } from "lucide-react";

const USPSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Slow & Well-Built Cakes",
      description: "Each cake is carefully crafted with premium quality ingredients and rich chocolate ganache, taking the time needed for perfection."
    },
    {
      icon: Shield,
      title: "Quality Guarantee", 
      description: "We stand behind our work with confidence - no returns or complaints because we get it right the first time."
    },
    {
      icon: Users,
      title: "Loyal Customer Base",
      description: "Our returning customers trust us for their special moments, building relationships that last for years."
    },
    {
      icon: Palette,
      title: "Custom Cake Expertise",
      description: "Years of experience in custom cakes. Just send us your image and specifications, and we'll deliver your vision."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-cake-cream to-cake-light-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cake-dark-purple mb-4">
            Why Choose Moftabo Cakes?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes us the preferred choice for cake lovers who demand excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-cake-purple/10 rounded-full p-3 mb-4">
                    <IconComponent className="h-6 w-6 text-cake-purple" />
                  </div>
                  <h3 className="font-semibold text-lg text-cake-dark-purple mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
