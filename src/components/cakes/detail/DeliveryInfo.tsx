
import { Calendar, Clock } from "lucide-react";

const DeliveryInfo = () => (
  <div className="bg-gray-50 p-4 rounded-md mb-6">
    <div className="flex items-start gap-3 text-sm">
      <Calendar className="h-5 w-5 text-cake-purple flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900">Delivery & Pickup</p>
        <p className="text-gray-600">Orders require 48 hours notice. Same-day pickup not available.</p>
      </div>
    </div>
    <div className="mt-3 flex items-start gap-3 text-sm">
      <Clock className="h-5 w-5 text-cake-purple flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900">Freshly Baked</p>
        <p className="text-gray-600">All cakes are freshly baked to order with premium ingredients.</p>
      </div>
    </div>
  </div>
);

export default DeliveryInfo;
