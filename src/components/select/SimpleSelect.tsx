import { forwardRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { type SelectProp } from "@/types/common";

interface Props {
  options: SelectProp[] | [];
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (val: string | number) => void;
  value?: string;
}

const SimpleSelect = forwardRef<HTMLDivElement, Props>(
  ({ options, className, label, error, placeholder, value, onChange }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={label}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={cn(
              "w-full",
              {
                "border-destructive focus-visible:border-none focus-visible:ring-0":
                  error,
                "text-muted-foreground": !value,
              },
              className
            )}
          >
            <SelectValue placeholder={placeholder ?? "Select"} />
          </SelectTrigger>
          <SelectContent ref={ref} className="z-[100]">
            {options.map((option: SelectProp) => (
              <SelectItem value={option.value} key={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }
);

SimpleSelect.displayName = "SimpleSelect";

export default SimpleSelect;
