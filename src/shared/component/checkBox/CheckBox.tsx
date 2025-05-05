import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, label, ...props }, ref) => {
    return (
      <label>
        <input type="checkbox" ref={ref} {...props} />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
