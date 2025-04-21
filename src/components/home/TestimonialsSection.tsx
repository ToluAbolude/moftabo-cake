
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Birthday Celebration",
    content: "The cake was absolutely stunning and delicious! Everyone at the party was impressed with the design and taste. Moftabo made my daughter's 5th birthday extra special.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding",
    content: "Our wedding cake was not only beautiful but tasted amazing too! The team at Moftabo worked with us to create exactly what we envisioned. Highly recommend for any special occasion.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Anniversary",
    content: "Ordered a custom cake for our 10th anniversary and it exceeded all expectations. The attention to detail was incredible and the flavor combinations were perfect.",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Customers Say
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4 md:px-8"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mx-auto max-w-2xl">
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                    <div className="ml-auto flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 w-2 rounded-full ${
                      activeIndex === idx ? "bg-cake-purple" : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
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
