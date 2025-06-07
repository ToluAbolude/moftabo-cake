
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { UseFormReturn } from "react-hook-form"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getMinimumDeliveryDate } from "@/utils/pricingUtils"

type DeliveryDatePickerProps = {
  form: UseFormReturn<any>
  isRushOrder: boolean
  cakeType: string
}

export const DeliveryDatePicker = ({ form, isRushOrder, cakeType }: DeliveryDatePickerProps) => {
  const getRushOrderText = () => {
    if (cakeType === 'wedding') {
      return 'Rush order fee applies for deliveries less than 4 weeks notice'
    }
    return 'Rush order fee applies for deliveries less than 2 weeks notice'
  }

  const getMinimumDeliveryText = () => {
    if (cakeType === 'wedding') {
      return 'Wedding cakes require minimum 2 weeks notice'
    }
    return 'Minimum 5 days notice required for delivery'
  }

  const minDeliveryDate = cakeType ? getMinimumDeliveryDate(cakeType as any) : new Date()

  return (
    <FormField
      control={form.control}
      name="deliveryDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base font-semibold">
            Delivery Date {isRushOrder && <span className="text-orange-600 ml-2 font-normal">(Rush Order +30%)</span>}
          </FormLabel>
          
          {/* Minimum delivery notice info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <span>{getMinimumDeliveryText()}</span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 text-base",
                    !field.value && "text-muted-foreground",
                    "border-2 hover:border-primary/50 focus:border-primary transition-colors"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {field.value ? (
                    format(field.value, "EEEE, MMMM do, yyyy")
                  ) : (
                    <span>Select your delivery date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < minDeliveryDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {isRushOrder && (
            <div className="flex items-center gap-2 text-sm text-orange-700 bg-orange-50 p-3 rounded-lg border border-orange-200">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <span>{getRushOrderText()}</span>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
