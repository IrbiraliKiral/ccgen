import * as React from "react";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div className="relative inline-flex items-center">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none checked:bg-primary checked:border-primary cursor-pointer",
            className
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <FaCheck className="absolute left-0.5 top-0.5 h-3 w-3 text-primary-foreground pointer-events-none hidden peer-checked:block" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

