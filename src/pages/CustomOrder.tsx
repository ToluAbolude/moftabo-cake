
import { CakeOrderForm } from "@/components/custom-order/CakeOrderForm";

const CustomOrder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <CakeOrderForm />
      </div>
    </div>
  );
};

export default CustomOrder;
