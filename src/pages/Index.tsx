
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCakes from "@/components/home/FeaturedCakes";
import CategorySection from "@/components/home/CategorySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { useEffect } from "react";

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <main>
        <Hero />
        <FeaturedCakes />
        <CategorySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
