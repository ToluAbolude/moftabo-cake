
import { Images } from "lucide-react";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ImageModal from "@/components/gallery/ImageModal";
import cakeImages from "@/assets/images/gallery";

// Convert object of images into an array for easier mapping
const galleryImagesArray = Object.values(cakeImages);

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImagesArray.length);
    }
  };

  const previousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 
          ? galleryImagesArray.length - 1 
          : selectedImageIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cake-light-purple/20 via-white to-cake-peach/20 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <ScrollReveal className="flex items-center justify-center mb-6 gap-3">
            <div className="p-3 bg-gradient-to-r from-cake-purple to-cake-dark-purple rounded-full">
              <Images className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Our <span className="text-gradient">Cake Gallery</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite collection of handcrafted cakes. Each creation tells a story of passion, 
              artistry, and delicious perfection. Click any image to explore in detail!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-cake-purple/20">
                <span className="text-cake-purple font-medium">
                  {galleryImagesArray.length} Beautiful Creations
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryImagesArray.map((img, i) => {
            // Create varied heights for more dynamic layout
            const heightClass = i % 7 === 0 ? "sm:row-span-2" : 
                               i % 5 === 0 ? "lg:row-span-2" : "";
            
            return (
              <ScrollReveal 
                key={i} 
                className={`group cursor-pointer ${heightClass}`}
                delay={50 * (i % 12)} 
                direction={i % 4 === 0 ? "up" : i % 4 === 1 ? "right" : i % 4 === 2 ? "down" : "left"}
              >
                <div 
                  className="relative rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
                  onClick={() => openModal(i)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img}
                      alt={`Beautiful cake design ${i + 1}`}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                        heightClass ? "h-80 sm:h-96 lg:h-[500px]" : "h-64 sm:h-72 lg:h-80"
                      }`}
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover content */}
                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="p-6 text-white w-full">
                        <h3 className="font-bold text-lg mb-2">Cake Design {i + 1}</h3>
                        <p className="text-sm opacity-90 mb-3">
                          Handcrafted with love and attention to detail
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            View Full Size
                          </span>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-cake-purple to-cake-dark-purple rounded-full opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center transform rotate-12 group-hover:rotate-0">
                      <span className="text-white text-xs font-bold">#{i + 1}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={800} className="text-center mt-20">
          <div className="bg-gradient-to-r from-cake-purple/10 to-cake-dark-purple/10 rounded-3xl p-8 md:p-12 border border-cake-purple/20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Inspired by What You See?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us create a custom masterpiece just for you. Every cake in our gallery started as a dream – yours could be next!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cake-purple to-cake-dark-purple text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Order Custom Cake
              </button>
              <button className="border-2 border-cake-purple text-cake-purple px-8 py-3 rounded-full font-medium hover:bg-cake-purple hover:text-white transition-all duration-300">
                View Catalog
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentImageIndex={selectedImageIndex || 0}
        images={galleryImagesArray}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  );
};

export default Gallery;
