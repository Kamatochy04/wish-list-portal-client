import { DeleteIcon, EditIcon, GiftIcon } from '@/shared/icons';
import styles from './giftReserveCard.module.scss';
import { FC } from 'react';

type GiftCardProps = {
  variant?: 'container' | 'block';
};

export const GiftReserveCard: FC<GiftCardProps> = ({ variant = 'container' }) => {
  return (
    <div className={`${styles[variant]} ${styles.box}`}>
      <img
        src=""
        alt=""
        className={`${variant === 'block' ? styles.block_img : styles.container_img}`}
      />
      <div className={styles.text}>
        <h4 className={` ${styles.text_line} ${styles.title}`}>
          Gift Title here
          {variant == 'container' ? null : <p>10 $</p>}
        </h4>
        <p className={styles.descr}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus
          venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim
        </p>
        <div className={styles.link}>
          <p>Link to shop</p>
          {variant == 'container' ? null : <div className={styles.price}>10$</div>}
        </div>
      </div>

      {variant == 'block' ? null : (
        <div className={styles.inf}>
          <div className={styles.price}>10$</div>
          <div className={styles.gift}>
            <GiftIcon />
            <p className={styles.gift__text}>Reserve it</p>
          </div>
        </div>
      )}
    </div>
  );
};
