
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
    <div className="flex items-center">
      <button
        onClick={onDecrement}
        className="p-2 border border-gray-300 rounded-l-md"
      >
        <Minus className="h-4 w-4 text-gray-500" />
      </button>
      <span className="px-4 py-2 border-y border-gray-300 text-center w-12">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="p-2 border border-gray-300 rounded-r-md"
      >
        <Plus className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  </div>
);

export default QuantitySelector;
