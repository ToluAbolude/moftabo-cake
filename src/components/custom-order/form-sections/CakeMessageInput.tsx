
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

type CakeMessageInputProps = {
  form: UseFormReturn<any>
}

export const CakeMessageInput = ({ form }: CakeMessageInputProps) => {
  return (
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
  )
}
