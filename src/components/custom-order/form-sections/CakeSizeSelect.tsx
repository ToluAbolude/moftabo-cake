
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { UseFormReturn } from "react-hook-form"
import { getBasePriceForSize, CakeSize } from "@/utils/pricingUtils"

type CakeSizeSelectProps = {
  form: UseFormReturn<any>
}

export const CakeSizeSelect = ({ form }: CakeSizeSelectProps) => {
  const sizes: CakeSize[] = ['4-inch', '5-inch', '6-inch', '7-inch', '8-inch', '9-inch', '10-inch', '11-inch', '12-inch', '14-inch'];

  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Cake Size</FormLabel>
          <div className="space-y-2">
            <ToggleGroup
              type="single"
              value={field.value}
              onValueChange={(value) => {
                if (value) field.onChange(value)
              }}
              className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full"
            >
              {sizes.map((size) => (
                <ToggleGroupItem 
                  key={size}
                  value={size}
                  className={`flex flex-col items-center p-3 h-auto border-2 transition-all duration-200 ${
                    field.value === size 
                      ? "bg-primary text-primary-foreground border-primary shadow-md" 
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="font-semibold">{size}</span>
                  <span className="text-xs opacity-75">£{getBasePriceForSize(size)}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">
              Prices shown are base prices before any customization fees
            </p>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
