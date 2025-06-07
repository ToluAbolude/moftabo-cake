
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"

type CakeFlavorSelectProps = {
  form: UseFormReturn<any>
}

const CAKE_FLAVORS = [
  { id: "vanilla", label: "Vanilla" },
  { id: "chocolate", label: "Chocolate" },
  { id: "redvelvet", label: "Red Velvet" },
  { id: "lemon", label: "Lemon" },
  { id: "strawberry", label: "Strawberry" },
]

export const CakeFlavorSelect = ({ form }: CakeFlavorSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="flavors"
      render={() => (
        <FormItem>
          <FormLabel>Cake Flavors {form.watch("flavors")?.length > 1 && <span className="text-cake-purple">(+25% for multiple flavors)</span>}</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CAKE_FLAVORS.map((flavor) => (
              <FormField
                key={flavor.id}
                control={form.control}
                name="flavors"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={flavor.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <Checkbox
                        checked={field.value?.includes(flavor.id)}
                        onCheckedChange={(checked) => {
                          const currentFlavors = field.value || []
                          if (checked) {
                            field.onChange([...currentFlavors, flavor.id])
                          } else {
                            field.onChange(
                              currentFlavors.filter((value: string) => value !== flavor.id)
                            )
                          }
                        }}
                      />
                      <FormLabel className="font-normal cursor-pointer">
                        {flavor.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
