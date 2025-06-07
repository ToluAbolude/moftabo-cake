import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "./ImageUpload"
import { calculateCakePrice, CakeSize, isRushOrder, isValidDeliveryDate } from "@/utils/pricingUtils"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"
import { CakeTypeSelect } from "./form-sections/CakeTypeSelect"
import { CakeSizeSelect } from "./form-sections/CakeSizeSelect"
import { CakeFlavorSelect } from "./form-sections/CakeFlavorSelect"
import { CakeMessageInput } from "./form-sections/CakeMessageInput"
import { DeliveryDatePicker } from "./form-sections/DeliveryDatePicker"
import { ShoppingCart, Sparkles } from "lucide-react"

const orderFormSchema = z.object({
  cakeType: z.string().min(1, "Please select a cake type"),
  size: z.string().min(1, "Please select a cake size"),
  flavors: z.array(z.string()).min(1, "Please select at least one cake flavor"),
  message: z.string().optional(),
  designImage: z.string().optional(),
  inspirationImage: z.string().optional(),
  deliveryDate: z.date()
}).refine((data) => {
  if (!data.cakeType || !data.deliveryDate) return true;
  return isValidDeliveryDate(data.cakeType as any, data.deliveryDate);
}, {
  message: "Selected delivery date is too soon for this cake type",
  path: ["deliveryDate"]
});

export const CakeOrderForm = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [isRushOrderState, setIsRushOrderState] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<{design?: string; inspiration?: string}>({})
  const { dispatch } = useCart()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cakeType: "",
      size: "6-inch",
      flavors: [],
      message: "",
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // Default to 2 weeks from now
    }
  })

  useEffect(() => {
    const size = form.watch("size") as CakeSize
    const flavors = form.watch("flavors")
    const deliveryDate = form.watch("deliveryDate")
    const cakeType = form.watch("cakeType")
    
    if (size && deliveryDate && cakeType) {
      // Check if custom design (image uploaded)
      const isCustomDesign = !!(uploadedImages.design || uploadedImages.inspiration)
      
      // Check if multiple flavors
      const isMultipleFlavors = flavors && flavors.length > 1
      
      // Check rush order based on cake type
      const newIsRushOrder = isRushOrder({
        cakeType: cakeType as any,
        deliveryDate,
        currentDate: new Date()
      })
      setIsRushOrderState(newIsRushOrder)
      
      const newPrice = calculateCakePrice({
        size,
        isCustomDesign,
        isRushOrder: newIsRushOrder,
        isMultipleFlavors
      })
      setTotalPrice(newPrice)
    }
  }, [form.watch("size"), form.watch("flavors"), form.watch("deliveryDate"), form.watch("cakeType"), uploadedImages])

  const onSubmit = (data: z.infer<typeof orderFormSchema>) => {
    const cakeId = uuidv4()
    const flavorText = data.flavors.length > 1 ? `${data.flavors.join(" & ")} Mix` : data.flavors[0]
    const cakeName = `Custom ${data.cakeType} Cake - ${flavorText}`
    
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cakeId,
        name: cakeName,
        price: totalPrice,
        quantity: 1,
        imageUrl: uploadedImages.design || uploadedImages.inspiration || "/placeholder.svg"
      }
    })
    
    toast({
      title: "Added to Cart!",
      description: `${cakeName} has been added to your cart.`,
      duration: 3000,
    })
    
    form.reset()
    setUploadedImages({})
  }

  const hasCustomDesign = !!(uploadedImages.design || uploadedImages.inspiration)
  const hasMultipleFlavors = form.watch("flavors")?.length > 1
  const basePrice = calculateCakePrice({ size: form.watch("size") as CakeSize })

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Create Your Dream Cake</h1>
        </div>
        <p className="text-muted-foreground text-lg">Design a custom cake that's perfect for your special occasion</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Main Form Sections */}
          <div className="grid gap-8">
            {/* Cake Details */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Cake Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <CakeTypeSelect form={form} />
                  <CakeSizeSelect form={form} />
                </div>
                <CakeFlavorSelect form={form} />
                <CakeMessageInput form={form} />
              </CardContent>
            </Card>

            {/* Design Customization */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Design Customization
                  {hasCustomDesign && <Badge variant="secondary" className="ml-2">+25%</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload onImagesChange={setUploadedImages} />
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Delivery Information
                  {isRushOrderState && <Badge variant="destructive" className="ml-2">Rush +30%</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryDatePicker form={form} isRushOrder={isRushOrderState} cakeType={form.watch("cakeType")} />
              </CardContent>
            </Card>
          </div>

          {/* Price Breakdown */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Base Price ({form.watch("size")})</span>
                  <span className="font-semibold">£{basePrice.toFixed(2)}</span>
                </div>
                {hasCustomDesign && (
                  <div className="flex justify-between items-center py-2 text-primary">
                    <span className="flex items-center gap-2">
                      Custom Design 
                      <Badge variant="secondary">+25%</Badge>
                    </span>
                    <span className="font-semibold">+£{(basePrice * 0.25).toFixed(2)}</span>
                  </div>
                )}
                {hasMultipleFlavors && (
                  <div className="flex justify-between items-center py-2 text-primary">
                    <span className="flex items-center gap-2">
                      Multiple Flavors
                      <Badge variant="secondary">+25%</Badge>
                    </span>
                    <span className="font-semibold">+£{(calculateCakePrice({ size: form.watch("size") as CakeSize, isMultipleFlavors: false }) * 0.25).toFixed(2)}</span>
                  </div>
                )}
                {isRushOrderState && (
                  <div className="flex justify-between items-center py-2 text-orange-600">
                    <span className="flex items-center gap-2">
                      Rush Order
                      <Badge variant="destructive">+30%</Badge>
                    </span>
                    <span className="font-semibold">+£{(calculateCakePrice({ size: form.watch("size") as CakeSize, isRushOrder: false }) * 0.30).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Price</span>
                  <span className="text-primary">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-6 border-t">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              Add to Cart - £{totalPrice.toFixed(2)}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
