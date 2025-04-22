
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export const Cart = () => {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {state.items.length > 0 && (
            <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
              {state.items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] py-4">
          {state.items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Your cart is empty
            </p>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4 border-b pb-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {state.items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>£{state.total.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-cake-purple hover:bg-cake-dark-purple">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
