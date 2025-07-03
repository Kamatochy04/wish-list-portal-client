import { FC } from 'react';
import styles from './deleteConfirmPopup.module.scss';
import { Button } from '@/shared/component';

type Props = {
  eventTitle: string;
  giftTitle: string;
  onClouse: () => void;
  onClousePopup: () => void;
};

export const DeletePopup: FC<Props> = ({ eventTitle, giftTitle, onClouse, onClousePopup }) => {
  return (
    <div className={styles.container}>
      <p className={styles.container__text}>
        Are you sure that you want to delete that event/gift {eventTitle}/{giftTitle} ?
      </p>

      <div className={styles.buttons}>
        <Button className={styles.button} onClick={() => onClouse()}>
          Yes
        </Button>
        <Button variant="primary" className={styles.button} onClick={() => onClousePopup()}>
          No
        </Button>
      </div>
    </div>
  );
};
