import { forwardRef } from 'react';
// import styles from './logo.module.scss';
import { LogoVariant, logoVariant } from './logoVariants';

interface LogoProps extends LogoVariant {
  className?: string;
}

export const Logo = forwardRef<HTMLParagraphElement, LogoProps>(({ className, size }, ref) => {
  return (
    <p className={logoVariant({ className, size })} ref={ref}>
      Gift<span>Me</span>
    </p>
  );
});
