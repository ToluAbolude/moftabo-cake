import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ImageUpload } from "./ImageUpload"
import { calculateCakePrice } from "@/utils/pricingUtils"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { v4 as uuidv4 } from "uuid"
import { CakeTypeSelect } from "./form-sections/CakeTypeSelect"
import { CakeSizeSelect } from "./form-sections/CakeSizeSelect"
import { CakeFlavorSelect } from "./form-sections/CakeFlavorSelect"
import { CakeMessageInput } from "./form-sections/CakeMessageInput"
import { DesignOptions } from "./form-sections/DesignOptions"
import { DeliveryDatePicker } from "./form-sections/DeliveryDatePicker"

const orderFormSchema = z.object({
  cakeType: z.string().min(1, "Please select a cake type"),
  size: z.string().min(1, "Please select a cake size"),
  flavor: z.string().min(1, "Please select a cake flavor"),
  message: z.string().optional(),
  designImage: z.string().optional(),
  inspirationImage: z.string().optional(),
  deliveryDate: z.date()
})

export const CakeOrderForm = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const [isCustomDesign, setIsCustomDesign] = useState(false)
  const [isRushOrder, setIsRushOrder] = useState(false)
  const { dispatch } = useCart()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      cakeType: "",
      size: "6-inch",
      flavor: "",
      message: "",
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  })

  useEffect(() => {
    const size = form.watch("size") as CakeSize
    if (size) {
      const newPrice = calculateCakePrice({
        size,
        isCustomDesign,
        isRushOrder,
      })
      setTotalPrice(newPrice)
    }
  }, [form.watch("size"), isCustomDesign, isRushOrder, form])

  useEffect(() => {
    const deliveryDate = form.watch("deliveryDate")
    if (deliveryDate) {
      const currentDate = new Date()
      const daysDifference = Math.ceil(
        (deliveryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      )
      const newIsRushOrder = daysDifference < 5
      setIsRushOrder(newIsRushOrder)
    }
  }, [form.watch("deliveryDate")])

  const onSubmit = (data: z.infer<typeof orderFormSchema>) => {
    const cakeId = uuidv4()
    const cakeName = `Custom ${data.cakeType} Cake - ${data.flavor}`
    
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: cakeId,
        name: cakeName,
        price: totalPrice,
        quantity: 1,
        imageUrl: data.designImage || data.inspirationImage || "/placeholder.svg"
      }
    })
    
    toast({
      title: "Added to Cart!",
      description: `${cakeName} has been added to your cart.`
    })
    
    form.reset()
    setIsCustomDesign(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CakeTypeSelect form={form} />
          <CakeSizeSelect form={form} />
          <CakeFlavorSelect form={form} />
          <CakeMessageInput form={form} />
        </div>

        <DesignOptions 
          isCustomDesign={isCustomDesign}
          setIsCustomDesign={setIsCustomDesign}
        />
        
        <ImageUpload />
        
        <DeliveryDatePicker form={form} isRushOrder={isRushOrder} />

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
  )
}
