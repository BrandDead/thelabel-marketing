"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  checked,
  onChange,
  name,
  ...props
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      onCheckedChange={(checkedState) => {
        if (onChange) {
          onChange({
            target: {
              name,
              type: 'checkbox',
              checked: checkedState === true
            }
          });
        }
      }}
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-white/20 bg-white/10 shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:text-white cursor-pointer",
        className
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }
