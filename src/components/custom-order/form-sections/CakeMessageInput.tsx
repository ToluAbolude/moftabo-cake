
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
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
            <Textarea 
              placeholder="Enter message for the cake (optional)" 
              className="min-h-[80px]"
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
