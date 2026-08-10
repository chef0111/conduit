import type { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { FormControlFn } from './form-base';
import { FormBase } from './form-base';

export const FormSelect: FormControlFn<{
  children: ReactNode;
  fieldClassName?: string;
  className?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical' | 'responsive' | null;
}> = ({
  children,
  fieldClassName,
  className,
  orientation,
  placeholder,
  onValueChange,
  ...props
}) => {
  return (
    <FormBase {...props} className={fieldClassName} orientation={orientation}>
      {({ onChange, onBlur, value, ...field }) => (
        <Select
          name={field.name}
          value={value ?? null}
          onValueChange={(val) => {
            onChange(val);
            if (val !== null) {
              onValueChange?.(val);
            }
          }}
        >
          <SelectTrigger
            aria-invalid={field['aria-invalid']}
            id={field.id}
            onBlur={onBlur}
            className={className}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="w-full">{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
};
