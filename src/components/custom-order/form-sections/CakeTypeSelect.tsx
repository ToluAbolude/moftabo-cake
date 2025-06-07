
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"

type CakeTypeSelectProps = {
  form: UseFormReturn<any>
}

export const CakeTypeSelect = ({ form }: CakeTypeSelectProps) => {
  return (
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
              <SelectItem value="anniversary">Anniversary Cake</SelectItem>
              <SelectItem value="baby_shower">Baby Shower Cake</SelectItem>
              <SelectItem value="custom">Custom Cake</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
