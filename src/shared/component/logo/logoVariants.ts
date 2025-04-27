import { cva, type VariantProps } from 'class-variance-authority';
import styles from './logo.module.scss';

export type LogoVariant = VariantProps<typeof logoVariant>;

export const logoVariant = cva(styles.base, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
