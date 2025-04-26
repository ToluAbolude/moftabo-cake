
import React from "react";
import CakeCard from "./CakeCard";

interface Cake {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
}

interface CakeGridProps {
  cakes: Cake[];
}

const CakeGrid = ({ cakes }: CakeGridProps) => {
  if (cakes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No cakes found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cakes.map(cake => (
        <CakeCard key={cake.id} cake={cake} />
      ))}
    </div>
  );
};

export default CakeGrid;
