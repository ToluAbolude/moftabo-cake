
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <p className="font-medium">Upload Design Image (Optional)</p>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("image-upload")?.click()}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Choose Image
        </Button>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
      {selectedImage && (
        <div className="mt-4">
          <img
            src={selectedImage}
            alt="Uploaded design"
            className="max-w-xs rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};
