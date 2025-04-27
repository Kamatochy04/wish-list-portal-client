import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return <input type="checkbox" ref={ref} {...props} />;
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
