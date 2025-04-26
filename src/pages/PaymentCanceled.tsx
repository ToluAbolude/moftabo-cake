
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle, ShoppingCart } from "lucide-react";

const PaymentCanceled = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was canceled. No charges were made to your account.
        </p>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <p className="text-sm text-gray-600">
            If you encountered any issues during checkout, please feel free to contact our support team.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => navigate('/cart')}
            className="w-full bg-cake-purple hover:bg-cake-dark-purple"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Return to Cart
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
