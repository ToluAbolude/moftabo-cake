
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
    <div className="min-h-[80vh] bg-gradient-to-b from-cake-light-purple/30 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex items-center mb-10 gap-3">
          <Images className="h-8 w-8 text-cake-purple" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Our <span className="text-gradient">Cake Gallery</span>
          </h1>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <p className="text-gray-600 mb-12 text-lg max-w-2xl">
            Explore our beautiful cake designs and creations. Click any image to view it in full size!
          </p>
        </ScrollReveal>
        
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryImagesArray.map((img, i) => (
            <ScrollReveal 
              key={i} 
              className="group cursor-pointer" 
              delay={100 * (i % 8)} 
              direction={(i % 3 === 0) ? "right" : (i % 3 === 1) ? "up" : "left"}
            >
              <div 
                className="rounded-xl shadow-md overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
                onClick={() => openModal(i)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img}
                    alt={`Beautiful cake design ${i + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="font-medium">Cake Design {i + 1}</p>
                      <p className="text-sm opacity-90">Click to view full size</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
