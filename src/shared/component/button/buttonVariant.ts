import { cva, type VariantProps } from 'class-variance-authority';
import styles from './button.module.scss';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
    disabled: {
      true: styles.disabled,
    },
  },
  defaultVariants: {},
});
