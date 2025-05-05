import { FC } from 'react';

import styles from './eventCard.module.scss';

import img from './bgImg.png';
import { DeleteIcon, EditIcon, SendIcon } from '@/shared/icons';

type EventCardProps = {
  variant?: 'default' | 'add';
};

export const EventCard: FC<EventCardProps> = ({ variant = 'default' }) => {
  return (
    <>
      {variant === 'default' ? (
        <div className={styles.container}>
          <h4 className={styles.title}>Birthday party</h4>
          <p className={styles.date}>12.12.2022</p>
          <div className={styles.box}>
            <div className={styles.box__left}>
              <SendIcon />
            </div>
            <div className={styles.box__items}>
              <img src={img} alt="" />
            </div>
            <div className={styles.box__right}>
              <EditIcon />
              <DeleteIcon />
            </div>
          </div>
          <div className={styles.footer}>
            <p className={styles.footer__text}>Gifts: 22</p>
            <p className={styles.footer__text}>Reserved : 10</p>
          </div>
        </div>
      ) : (
        <div className={styles.add}>
          <div className={styles.plus}>+</div>
          <p className={styles.add__text}>Add Event</p>
        </div>
      )}
    </>
  );
};
