import { FC } from 'react';

import styles from './eventCard.module.scss';

import { DeleteIcon, EditIcon, SendIcon } from '@/shared/icons';

type EventCardProps = {
  variant?: 'default' | 'add';
  onClick: () => void;
  title?: string;
  data?: string;
  img?: string | undefined;
  gitftCount?: number;
};

export const EventCard: FC<EventCardProps> = ({
  data = '',
  img = '',
  gitftCount,
  variant = 'default',
  onClick,
  title,
}) => {
  return (
    <>
      {variant === 'default' ? (
        <div className={styles.container} onClick={onClick}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.date}>{data}</p>
          <div className={styles.box}>
            <div className={styles.box__left}>
              <SendIcon />
            </div>
            <div className={styles.box__items}>
              <img src={img} alt="event" />
            </div>
            <div className={styles.box__right}>
              <EditIcon />
              <DeleteIcon />
            </div>
          </div>
          <div className={styles.footer}>
            <p className={styles.footer__text}>Gifts: {gitftCount}</p>
            <p className={styles.footer__text}>Reserved : 10</p>
          </div>
        </div>
      ) : (
        <div className={styles.add} onClick={onClick}>
          <div className={styles.plus}>+</div>
          <p className={styles.add__text}>Add Event</p>
        </div>
      )}
    </>
  );
};
