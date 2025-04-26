
import { Button } from "@/components/ui/button";

interface CakeOptionsProps {
  sizes: string[];
  flavors: string[];
  selectedSize: string;
  selectedFlavor: string;
  onSizeSelect: (size: string) => void;
  onFlavorSelect: (flavor: string) => void;
}

const CakeOptions = ({
  sizes,
  flavors,
  selectedSize,
  selectedFlavor,
  onSizeSelect,
  onFlavorSelect,
}: CakeOptionsProps) => (
  <div>
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            onClick={() => onSizeSelect(size)}
            className={selectedSize === size 
              ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
              : "border-gray-300 text-gray-700"}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
    
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Flavor</label>
      <div className="flex flex-wrap gap-2">
        {flavors.map((flavor) => (
          <Button
            key={flavor}
            variant={selectedFlavor === flavor ? "default" : "outline"}
            onClick={() => onFlavorSelect(flavor)}
            className={selectedFlavor === flavor 
              ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
              : "border-gray-300 text-gray-700"}
          >
            {flavor}
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export default CakeOptions;
