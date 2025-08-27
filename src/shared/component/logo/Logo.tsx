import { forwardRef } from 'react';
import { LogoVariant, logoVariant } from './logoVariants';
import { useNavigate } from 'react-router-dom';

interface LogoProps extends LogoVariant {
  className?: string;
}

export const Logo = forwardRef<HTMLParagraphElement, LogoProps>(({ className, size }, ref) => {
  const navigate = useNavigate();

  return (
    <p className={logoVariant({ className, size })} ref={ref} onClick={() => navigate('/')}>
      Gift<span>Me</span>
    </p>
  );
});

Logo.displayName = 'Logo';
