
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
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black/95 border-none">
        <div className="relative flex items-center justify-center min-h-[50vh] p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
                onClick={onPrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 text-white hover:bg-white/20 bg-black/50 rounded-full"
                onClick={onNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          <img
            src={currentImage}
            alt={`Cake design ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
            style={{ maxWidth: 'calc(100vw - 80px)', maxHeight: 'calc(100vh - 120px)' }}
          />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/70 px-3 py-1 rounded-full z-10">
              {currentImageIndex + 1} of {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
