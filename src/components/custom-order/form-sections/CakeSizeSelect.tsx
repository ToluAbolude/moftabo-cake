
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { UseFormReturn } from "react-hook-form"

type CakeSizeSelectProps = {
  form: UseFormReturn<any>
}

export const CakeSizeSelect = ({ form }: CakeSizeSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cake Size</FormLabel>
          <ToggleGroup
            type="single"
            value={field.value}
            onValueChange={(value) => {
              if (value) field.onChange(value)
            }}
            className="justify-start"
          >
            <ToggleGroupItem 
              value="6-inch"
              className={field.value === "6-inch" ? "bg-cake-purple text-white" : ""}
            >
              6-inch
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="8-inch"
              className={field.value === "8-inch" ? "bg-cake-purple text-white" : ""}
            >
              8-inch
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="10-inch"
              className={field.value === "10-inch" ? "bg-cake-purple text-white" : ""}
            >
              10-inch
            </ToggleGroupItem>
          </ToggleGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
