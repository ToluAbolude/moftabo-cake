import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ImageUpload } from "./ImageUpload"
import { calculateCakePrice, CakeSize, isRushOrder } from "@/utils/pricingUtils"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"
import { CakeTypeSelect } from "./form-sections/CakeTypeSelect"
import { CakeSizeSelect } from "./form-sections/CakeSizeSelect"
import { CakeFlavorSelect } from "./form-sections/CakeFlavorSelect"
import { CakeMessageInput } from "./form-sections/CakeMessageInput"
import { DeliveryDatePicker } from "./form-sections/DeliveryDatePicker"

const orderFormSchema = z.object({
  cakeType: z.string().min(1, "Please select a cake type"),
  size: z.string().min(1, "Please select a cake size"),
  flavors: z.array(z.string()).min(1, "Please select at least one cake flavor"),
  message: z.string().optional(),
  designImage: z.string().optional(),
  inspirationImage: z.string().optional(),
  deliveryDate: z.date()
})

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
      description: `${cakeName} has been added to your cart.`
    })
    
    form.reset()
    setUploadedImages({})
  }

  const hasCustomDesign = !!(uploadedImages.design || uploadedImages.inspiration)
  const hasMultipleFlavors = form.watch("flavors")?.length > 1

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CakeTypeSelect form={form} />
            <CakeSizeSelect form={form} />
            <div className="md:col-span-2">
              <CakeFlavorSelect form={form} />
            </div>
            <div className="md:col-span-2">
              <CakeMessageInput form={form} />
            </div>
          </div>

          <ImageUpload onImagesChange={setUploadedImages} />
          
          <DeliveryDatePicker form={form} isRushOrder={isRushOrderState} cakeType={form.watch("cakeType")} />

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg">Price Breakdown</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base Price ({form.watch("size")})</span>
                <span>£{calculateCakePrice({ size: form.watch("size") as CakeSize }).toFixed(2)}</span>
              </div>
              {hasCustomDesign && (
                <div className="flex justify-between text-cake-purple">
                  <span>Custom Design (+25%)</span>
                  <span>+£{(calculateCakePrice({ size: form.watch("size") as CakeSize }) * 0.25).toFixed(2)}</span>
                </div>
              )}
              {hasMultipleFlavors && (
                <div className="flex justify-between text-cake-purple">
                  <span>Multiple Flavors (+25%)</span>
                  <span>+£{(calculateCakePrice({ size: form.watch("size") as CakeSize, isMultipleFlavors: false }) * 0.25).toFixed(2)}</span>
                </div>
              )}
              {isRushOrderState && (
                <div className="flex justify-between text-orange-600">
                  <span>Rush Order (+30%)</span>
                  <span>+£{(calculateCakePrice({ size: form.watch("size") as CakeSize, isRushOrder: false }) * 0.30).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total Price</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-4 border-t">
            <Button type="submit" className="w-full bg-cake-purple hover:bg-cake-dark-purple">
              Add to Cart - £{totalPrice.toFixed(2)}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
