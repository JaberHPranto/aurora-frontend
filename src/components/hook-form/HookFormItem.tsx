import React, { cloneElement, isValidElement } from "react";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  children: React.ReactNode;
  name: string;
  label?: string;
  className?: string;
  defaultValue?: string | number;
  isRequired?: boolean;
}

const HookFormItem = ({
  children,
  name,
  label,
  className,
  isRequired = false,
}: Props) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {isRequired && <span style={{ color: "red" }}>*</span>}
          </FormLabel>
          <FormControl>
            {isValidElement(children)
              ? cloneElement(children, {
                  ...field,
                  // @ts-expect-error: children.props.onChange is not guaranteed to exist, but handling it safely GG
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);

                    // if onChange is passed externally, then it will be triggered after hook form's onChange
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                    children.props?.onChange?.(event);
                  },
                  error: error?.message,
                })
              : children}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HookFormItem;
