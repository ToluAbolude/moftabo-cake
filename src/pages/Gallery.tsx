
import { images } from "lucide-react";
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80",
    alt: "Woman sitting on bed using a laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
    alt: "Turned on gray laptop computer",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
    alt: "Macro photography of black circuit board",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    alt: "Monitor showing Java programming",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    alt: "Woman using laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    alt: "Matrix movie still",
  },
  {
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
    alt: "Colorful software code on monitor",
  },
  {
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80",
    alt: "People around video screens",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    alt: "People near table with laptops",
  },
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    alt: "MacBook with code on screen",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-[80vh] bg-soft-purple/50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center mb-8 gap-3">
          <images className="h-8 w-8 text-cake-purple" />
          <h1 className="text-3xl md:text-4xl font-bold text-cake-dark-purple">Cake Gallery</h1>
        </div>
        <p className="text-neutral-gray mb-10 text-lg max-w-2xl">
          Explore our beautiful cake designs and creations. Get inspiration for your next order!
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <div key={i} className="rounded-2xl shadow-md overflow-hidden bg-white hover:scale-[1.025] hover:shadow-lg transition-all duration-200 border border-soft-gray">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
              <div className="px-4 py-2 bg-white">
                <p className="text-sm text-gray-700">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
