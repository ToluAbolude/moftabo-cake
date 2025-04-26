
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { ShoppingBag, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  // Clear the cart after successful payment
  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be processed soon.
        </p>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <p className="text-sm text-gray-600 mb-1">
            A confirmation email has been sent to your email address.
          </p>
          <p className="text-sm text-gray-600">
            Your order number: <span className="font-medium">ORD-{Math.floor(Math.random() * 10000)}</span>
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => navigate('/catalog')}
            className="w-full bg-cake-purple hover:bg-cake-dark-purple"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
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

export default PaymentSuccess;
