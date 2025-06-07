
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageIndex: number;
  images: string[];
  onNext: () => void;
  onPrevious: () => void;
}

const ImageModal = ({ 
  isOpen, 
  onClose, 
  currentImageIndex, 
  images, 
  onNext, 
  onPrevious 
}: ImageModalProps) => {
  if (!images || images.length === 0) return null;
  
  const currentImage = images[currentImageIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 max-w-none max-h-none w-screen h-screen p-0 bg-black/95 border-none flex items-center justify-center m-0">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
                onClick={onPrevious}
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
                onClick={onNext}
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            </>
          )}

          <img
            src={currentImage}
            alt={`Cake design ${currentImageIndex + 1}`}
            className="max-w-[calc(100%-80px)] max-h-[calc(100%-80px)] object-contain"
          />

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1 rounded-full z-10">
            {currentImageIndex + 1} of {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
