import { FC } from 'react';
import styles from './noGiftsComponent.module.scss';
import { GiftIcon } from '@/shared/icons';

export const NoGiftsComponent: FC = () => {
  return (
    <div className={styles.noGiftsContainer}>
      <div className={styles.iconWrapper}>
        <GiftIcon />
      </div>
      <h2 className={styles.title}>No Gifts Yet</h2>
      <p className={styles.subtitle}>It looks like there are no gifts available at the moment.</p>
      <p className={styles.message}>
        Start by adding your first gift to bring some excitement to your events!
      </p>
    </div>
  );
};
