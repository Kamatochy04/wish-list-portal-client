import { ReactNode } from 'react';
import styles from './mediaTab.module.scss';

interface MediaTabProps {
  children: ReactNode;
  text?: string;
}

export function MediaTab({ children, text }: MediaTabProps) {
  return (
    <div className={styles.container}>
      {children}
      <p className={styles.text}>{text}</p>
    </div>
  );
}
