
import { FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type DesignOptionsProps = {
  isCustomDesign: boolean
  setIsCustomDesign: (value: boolean) => void
}

export const DesignOptions = ({ isCustomDesign, setIsCustomDesign }: DesignOptionsProps) => {
  return (
    <div className="space-y-2">
      <FormLabel>Design Options</FormLabel>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="customDesign"
          checked={isCustomDesign}
          onCheckedChange={(checked) => setIsCustomDesign(checked === true)}
        />
        <label
          htmlFor="customDesign"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Custom Design (+25%)
        </label>
      </div>
    </div>
  )
}
