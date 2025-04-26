
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "./ImageUpload";
import { DatePicker } from "./DatePicker";
import { CakeSize, calculateCakePrice } from "@/utils/pricingUtils";
import { useCart } from "@/contexts/CartContext";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { v4 as uuidv4 } from "uuid";

const orderFormSchema = z.object({
  cakeType: z.string().min(1, "Please select a cake type"),
  size: z.string().min(1, "Please select a cake size"),
  flavor: z.string().min(1, "Please select a cake flavor"),
  message: z.string().optional(),
  designImage: z.string().optional(),
  inspirationImage: z.string().optional(),
  deliveryDate: z.date(),
});

export const CakeOrderForm = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomDesign, setIsCustomDesign] = useState(false);
  const [isRushOrder, setIsRushOrder] = useState(false);
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cakeType: "",
      size: "6-inch",
      flavor: "",
      message: "",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
    },
  });

  // Calculate price whenever relevant fields change
  useEffect(() => {
    const size = form.watch("size") as CakeSize;
    if (size) {
      const newPrice = calculateCakePrice({
        size,
        isCustomDesign,
        isRushOrder,
      });
      setTotalPrice(newPrice);
    }
  }, [form.watch("size"), isCustomDesign, isRushOrder, form]);

  // Check if delivery date is less than 5 days away and set rush order
  useEffect(() => {
    const deliveryDate = form.watch("deliveryDate");
    if (deliveryDate) {
      const currentDate = new Date();
      const daysDifference = Math.ceil(
        (deliveryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const newIsRushOrder = daysDifference < 5;
      setIsRushOrder(newIsRushOrder);
    }
  }, [form.watch("deliveryDate")]);

  const onSubmit = (data: z.infer<typeof orderFormSchema>) => {
    const cakeId = uuidv4();
    const cakeName = `Custom ${data.cakeType} Cake - ${data.flavor}`;
    
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cakeId,
        name: cakeName,
        price: totalPrice,
        quantity: 1,
        imageUrl: data.designImage || data.inspirationImage || "/placeholder.svg",
      },
    });
    
    toast({
      title: "Added to Cart!",
      description: `${cakeName} has been added to your cart.`,
    });
    
    // Reset form after submission (optional)
    form.reset();
    setIsCustomDesign(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="cakeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cake Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cake type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday Cake</SelectItem>
                    <SelectItem value="wedding">Wedding Cake</SelectItem>
                    <SelectItem value="custom">Custom Cake</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cake Size</FormLabel>
                <ToggleGroup 
                  type="single" 
                  value={field.value} 
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="6-inch" className={field.value === "6-inch" ? "bg-cake-purple text-white" : ""}>
                    6-inch
                  </ToggleGroupItem>
                  <ToggleGroupItem value="8-inch" className={field.value === "8-inch" ? "bg-cake-purple text-white" : ""}>
                    8-inch
                  </ToggleGroupItem>
                  <ToggleGroupItem value="10-inch" className={field.value === "10-inch" ? "bg-cake-purple text-white" : ""}>
                    10-inch
                  </ToggleGroupItem>
                </ToggleGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="flavor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cake Flavor</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cake flavor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vanilla">Vanilla</SelectItem>
                    <SelectItem value="chocolate">Chocolate</SelectItem>
                    <SelectItem value="redvelvet">Red Velvet</SelectItem>
                    <SelectItem value="lemon">Lemon</SelectItem>
                    <SelectItem value="strawberry">Strawberry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cake Message</FormLabel>
                <FormControl>
                  <Input placeholder="Enter message for the cake" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Design Options</FormLabel>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="customDesign" 
              checked={isCustomDesign} 
              onCheckedChange={(checked) => setIsCustomDesign(checked === true)}
            />
            <label
              htmlFor="customDesign"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Custom Design (+25%)
            </label>
          </div>
        </div>

        <ImageUpload />
        
        <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <div className="space-y-2">
              <FormLabel className="block">Delivery Date {isRushOrder && <span className="text-red-500 ml-2">(Rush Order +30%)</span>}</FormLabel>
              <DatePicker />
              {isRushOrder && (
                <p className="text-sm text-red-500">
                  Rush order fee applies for deliveries within 5 days
                </p>
              )}
            </div>
          )}
        />

        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="text-xl font-semibold">
            Total Price: £{totalPrice.toFixed(2)}
          </div>
          <Button type="submit" className="bg-cake-purple hover:bg-cake-dark-purple">
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
};
