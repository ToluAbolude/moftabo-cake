
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "./ImageUpload";
import { DatePickerWithRange } from "./DatePickerWithRange";

const orderFormSchema = z.object({
  cakeType: z.string().min(1, "Please select a cake type"),
  size: z.string().min(1, "Please select a cake size"),
  flavor: z.string().min(1, "Please select a cake flavor"),
  message: z.string().optional(),
  designImage: z.string().optional(),
  deliveryDate: z.object({
    from: z.date(),
    to: z.date(),
  }).optional(),
});

export const CakeOrderForm = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  
  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cakeType: "",
      size: "",
      flavor: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof orderFormSchema>) => {
    console.log("Form submitted:", data);
    // Here we'll later add the logic to add to cart
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cake size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="6">6 inch</SelectItem>
                    <SelectItem value="8">8 inch</SelectItem>
                    <SelectItem value="10">10 inch</SelectItem>
                  </SelectContent>
                </Select>
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

        <ImageUpload />
        <DatePickerWithRange />

        <div className="flex justify-between items-center pt-6">
          <div className="text-xl font-semibold">
            Total Price: £{totalPrice}
          </div>
          <Button type="submit" className="bg-cake-purple hover:bg-cake-dark-purple">
            Add to Cart
          </Button>
        </div>
      </form>
    </Form>
  );
};
