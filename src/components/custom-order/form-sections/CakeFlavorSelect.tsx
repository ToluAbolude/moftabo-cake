
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"

type CakeFlavorSelectProps = {
  form: UseFormReturn<any>
}

export const CakeFlavorSelect = ({ form }: CakeFlavorSelectProps) => {
  return (
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
              <SelectItem value="lemon">Lemon</SelectItem>
              <SelectItem value="strawberry">Strawberry</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
