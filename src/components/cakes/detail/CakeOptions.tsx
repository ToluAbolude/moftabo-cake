
import { Button } from "@/components/ui/button";
import { CakeSize, calculateCakePrice } from "@/utils/pricingUtils";
import { useState } from "react";

interface CakeOptionsProps {
  sizes: string[];
  flavors: string[];
  selectedSize: string;
  selectedFlavor: string;
  onSizeSelect: (size: string) => void;
  onFlavorSelect: (flavor: string) => void;
  onPriceUpdate: (price: number) => void;
}

const CakeOptions = ({
  sizes,
  flavors,
  selectedSize,
  selectedFlavor,
  onSizeSelect,
  onFlavorSelect,
  onPriceUpdate,
}: CakeOptionsProps) => {
  const [isCustomDesign, setIsCustomDesign] = useState(false);
  const [isRushOrder, setIsRushOrder] = useState(false);

  const handleSizeSelect = (size: string) => {
    onSizeSelect(size);
    updatePrice(size as CakeSize, isCustomDesign, isRushOrder);
  };

  const updatePrice = (size: CakeSize, custom: boolean, rush: boolean) => {
    const newPrice = calculateCakePrice({
      size,
      isCustomDesign: custom,
      isRushOrder: rush,
    });
    onPriceUpdate(newPrice);
  };

  const toggleCustomDesign = () => {
    const newCustom = !isCustomDesign;
    setIsCustomDesign(newCustom);
    updatePrice(selectedSize as CakeSize, newCustom, isRushOrder);
  };

  const toggleRushOrder = () => {
    const newRush = !isRushOrder;
    setIsRushOrder(newRush);
    updatePrice(selectedSize as CakeSize, isCustomDesign, newRush);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              onClick={() => handleSizeSelect(size)}
              className={selectedSize === size 
                ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
                : "border-gray-300 text-gray-700"}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Options</label>
        <div className="flex gap-2">
          <Button
            variant={isCustomDesign ? "default" : "outline"}
            onClick={toggleCustomDesign}
            className={isCustomDesign 
              ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
              : "border-gray-300 text-gray-700"}
          >
            Custom Design (+25%)
          </Button>
          <Button
            variant={isRushOrder ? "default" : "outline"}
            onClick={toggleRushOrder}
            className={isRushOrder 
              ? "bg-cake-purple hover:bg-cake-dark-purple text-white" 
              : "border-gray-300 text-gray-700"}
          >
            Rush Order (+30%)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CakeOptions;
