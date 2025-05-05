import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { buttonVariants, ButtonVariants } from './buttonVariant';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
    // eslint-disable-next-line no-undef
    leftIcon?: React.ReactNode;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { leftIcon, className, variant, size, isLoading = false, children, disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {leftIcon ? leftIcon : null}

        {isLoading ? <span className="mr-2">Загрузка...</span> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export type { ButtonProps };
export { buttonVariants };
