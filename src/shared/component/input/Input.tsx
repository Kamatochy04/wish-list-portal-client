import { VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { inputVariants } from './inputVariants';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    className?: string;
    labelText?: string;
    erroText?: string;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, labelText, variant, size, erroText, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <label className={styles.container}>
        {labelText ? <p className={styles.label}>{labelText}</p> : null}
        <div className={inputVariants({ variant, size, className })}>
          {leftIcon && <span>{leftIcon}</span>}
          <input ref={ref} {...props} />
          {rightIcon && <span>{rightIcon}</span>}
        </div>
        {erroText ? <p className={styles.error}>{erroText}</p> : null}
      </label>
    );
  },
);

Input.displayName = 'Input';
