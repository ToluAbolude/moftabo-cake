
import { Star } from "lucide-react";

interface CakeRatingProps {
  rating: number;
  reviews: number;
}

const CakeRating = ({ rating, reviews }: CakeRatingProps) => (
  <div className="flex items-center mb-4">
    <div className="flex mr-2">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
        />
      ))}
    </div>
    <span className="text-gray-600 text-sm">{rating} ({reviews} reviews)</span>
  </div>
);

export default CakeRating;
