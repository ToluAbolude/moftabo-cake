
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import cakeImages from "@/assets/images/gallery";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Birthday Celebration",
    content: "The cake was absolutely stunning and delicious! Everyone at the party was impressed with the design and taste. Moftabo made my daughter's 5th birthday extra special.",
    avatar: cakeImages.cake10,
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding",
    content: "Our wedding cake was not only beautiful but tasted amazing too! The team at Moftabo worked with us to create exactly what we envisioned. Highly recommend for any special occasion.",
    avatar: cakeImages.cake11,
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Anniversary",
    content: "Ordered a custom cake for our 10th anniversary and it exceeded all expectations. The attention to detail was incredible and the flavor combinations were perfect.",
    avatar: cakeImages.cake12,
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cake-peach/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cake-light-purple/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cake-purple to-cake-dark-purple rounded-full mx-auto"></div>
        </ScrollReveal>

        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4 md:px-8"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mx-auto max-w-3xl hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                      className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold text-gray-900 text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-cake-purple text-sm mb-2">
                            {testimonial.role}
                          </div>
                        </div>
                        <div className="flex mb-2 md:mb-0">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600 italic leading-relaxed mt-1">"{testimonial.content}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-10 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white hover:bg-cake-light-purple text-cake-purple border border-gray-200 shadow-sm transition-all duration-200 hover:scale-105"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex space-x-3 items-center">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx 
                        ? "w-8 bg-cake-purple" 
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white hover:bg-cake-light-purple text-cake-purple border border-gray-200 shadow-sm transition-all duration-200 hover:scale-105"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
