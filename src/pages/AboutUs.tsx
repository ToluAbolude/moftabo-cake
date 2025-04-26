
import Footer from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CakeSlice, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-cake-light-purple to-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-cake-dark-purple">
              Our Story
            </h1>
            <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto">
              For over 7 years, Moftabo Cakes has been crafting delicious custom cakes 
              that bring joy to every celebration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-cake-dark-purple">
                  Our Mission
                </h2>
                <p className="text-gray-600">
                  At Moftabo Cakes, our mission is to create extraordinary cake experiences 
                  that transform special moments into unforgettable memories. Each cake 
                  we craft is a unique masterpiece, made with love, creativity, and the 
                  finest ingredients.
                </p>
                <div className="flex items-center gap-2 text-cake-purple">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Made with love since 2018</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="aspect-square bg-cake-peach rounded-full flex items-center justify-center">
                <CakeSlice className="w-32 h-32 text-cake-purple" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-b from-white to-cake-light-purple">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-semibold text-center text-cake-dark-purple mb-12">
              Our Values
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality",
                description: "We use only the finest ingredients to ensure every cake tastes as amazing as it looks."
              },
              {
                title: "Creativity",
                description: "Each cake is a unique creation, designed to match your vision and exceed expectations."
              },
              {
                title: "Customer Service",
                description: "We're dedicated to making your cake ordering experience as delightful as our cakes."
              }
            ].map((value, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-cake-purple mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
