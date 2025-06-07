
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

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
      <DialogOverlay className="fixed inset-0 z-50 bg-black/95" />
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 border-none bg-transparent shadow-none max-w-none max-h-none w-screen h-screen">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-60 text-white hover:bg-white/20 bg-black/50 rounded-full"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:bg-white/20 bg-black/50 rounded-full"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:bg-white/20 bg-black/50 rounded-full"
              onClick={onNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image container */}
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={currentImage}
            alt={`Cake design ${currentImageIndex + 1}`}
            className="max-w-[calc(100vw-100px)] max-h-[calc(100vh-100px)] object-contain rounded-lg"
          />
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-4 py-2 rounded-full z-60">
            {currentImageIndex + 1} of {images.length}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
