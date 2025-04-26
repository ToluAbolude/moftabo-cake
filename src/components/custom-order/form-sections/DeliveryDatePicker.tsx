
import { FormField } from "@/components/ui/form"
import { FormLabel } from "@/components/ui/form"
import { DatePicker } from "../DatePicker"
import { UseFormReturn } from "react-hook-form"

type DeliveryDatePickerProps = {
  form: UseFormReturn<any>
  isRushOrder: boolean
}

export const DeliveryDatePicker = ({ form, isRushOrder }: DeliveryDatePickerProps) => {
  return (
    <FormField
      control={form.control}
      name="deliveryDate"
      render={({ field }) => (
        <div className="space-y-2">
          <FormLabel className="block">
            Delivery Date {isRushOrder && <span className="text-red-500 ml-2">(Rush Order +30%)</span>}
          </FormLabel>
          <DatePicker />
          {isRushOrder && (
            <p className="text-sm text-red-500">
              Rush order fee applies for deliveries within 5 days
            </p>
          )}
        </div>
      )}
    />
  )
}
