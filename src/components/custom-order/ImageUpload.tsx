
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState<{
    design?: string;
    inspiration?: string;
  }>({});

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

  return (
    <div className="space-y-6">
      {/* Design Image Upload */}
      <div className="space-y-4">
        <p className="font-medium">Upload Your Cake Design</p>
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

      {/* Inspiration Image Upload */}
      <div className="space-y-4">
        <p className="font-medium">Upload Inspiration Image (Optional)</p>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("inspiration-image-upload")?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Choose Inspiration
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
              alt="Inspiration uploaded"
              className="max-w-xs rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
