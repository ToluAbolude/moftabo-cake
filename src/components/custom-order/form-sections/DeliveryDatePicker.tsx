
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { UseFormReturn } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

  return (
    <FormField
      control={form.control}
      name="deliveryDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Delivery Date {isRushOrder && <span className="text-red-500 ml-2">(Rush Order +30%)</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a delivery date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {isRushOrder && (
            <p className="text-sm text-red-500">
              {getRushOrderText()}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
