
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploadProps = {
  onImagesChange: (images: {design?: string; inspiration?: string}) => void;
}

export const ImageUpload = ({ onImagesChange }: ImageUploadProps) => {
  const [selectedImages, setSelectedImages] = useState<{
    design?: string;
    inspiration?: string;
  }>({});

  useEffect(() => {
    onImagesChange(selectedImages);
  }, [selectedImages, onImagesChange]);

  const handleImageUpload = (type: 'design' | 'inspiration') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImages(prev => ({
          ...prev,
          [type]: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const hasAnyImage = selectedImages.design || selectedImages.inspiration;

  return (
    <div className="space-y-6">
      {hasAnyImage && (
        <div className="bg-cake-light-purple/20 p-3 rounded-lg">
          <p className="text-sm text-cake-purple font-medium">
            ✨ Custom Design detected - +25% added to total price
          </p>
        </div>
      )}
      
      {/* Image Upload Section - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Design Image Upload */}
        <div className="space-y-4">
          <p className="font-medium">Upload Cake Design</p>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("design-image-upload")?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose Design Image
            </Button>
            <input
              type="file"
              id="design-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload('design')}
            />
          </div>
          {selectedImages.design && (
            <div className="mt-4">
              <img
                src={selectedImages.design}
                alt="Design uploaded"
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Additional Design Image Upload */}
        <div className="space-y-4">
          <p className="font-medium">Additional Cake Design Image</p>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("inspiration-image-upload")?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Choose Additional Image
            </Button>
            <input
              type="file"
              id="inspiration-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload('inspiration')}
            />
          </div>
          {selectedImages.inspiration && (
            <div className="mt-4">
              <img
                src={selectedImages.inspiration}
                alt="Additional design uploaded"
                className="max-w-xs rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
