import { cva, type VariantProps } from 'class-variance-authority';
import styles from './input.module.scss';

export type InputVariants = VariantProps<typeof inputVariants>;

export const inputVariants = cva(styles.base, {
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
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
