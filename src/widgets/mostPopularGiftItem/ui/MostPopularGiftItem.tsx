import { Button } from '@/shared/component';
import styles from './mostPopularGiftItem.module.scss';
import { HeartIcon } from '@/shared/icons';

export const MostPopularGiftItem = () => {
  return (
    <div className={styles.block}>
      <img src="" alt="" />
      <div className={styles.block__title}>
        <p>Gift Title long text ...</p>
        <span className={styles.price}>0.0$</span>
      </div>
      <div className={styles.link}>Buy in store</div>
      <p className={styles.descr}>
        Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
      </p>
      <Button variant="primary" leftIcon={<HeartIcon />} className={styles.button}>
        Add to my list
      </Button>
    </div>
  );
};
