
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CakeOrderForm } from "@/components/custom-order/CakeOrderForm";

const CustomOrder = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-cake-dark-purple mb-6">Custom Cake Order</h1>
      <CakeOrderForm />
    </div>
  );
};

export default CustomOrder;
