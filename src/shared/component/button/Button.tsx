import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { buttonVariants, ButtonVariants } from './buttonVariant';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <span className="mr-2">Загрузка...</span> : null}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

// Экспортируем типы для использования в других компонентах
export type { ButtonProps };
export { buttonVariants };
