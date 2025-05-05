import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './area.module.scss';

type TextAreaProps = {
  label?: string;
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={props.id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea ref={ref} className={`${styles.area} ${error ? 'error' : ''}`} {...props} />
        {error && <span className="text-area-error">{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export { TextArea };
