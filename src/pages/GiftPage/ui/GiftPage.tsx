import { Button } from '@/shared/component';
import styles from './giftPage.module.scss';
import { ListBlockIcon, ListLineIcon } from '@/shared/icons';
import { EventCard, GiftCard } from '@/widgets';

import { useState } from 'react';

export default function GiftPage() {
  const [showVariant, setShowVariant] = useState<'block' | 'container'>('block');

  return (
    <section className="">
      <div className="container">
        <div className={styles.header}>
          <EventCard />
          <EventCard />
          <EventCard variant="add" />
        </div>

        <div className={styles.table_header}>
          <Button
            variant="primary"
            leftIcon={<div className={styles.plus}>+</div>}
            className={styles.add_button}
          >
            Add Gift
          </Button>

          <div className={styles.table__block}>
            <p className={styles.text}>Show as:</p>
            <div className={styles.icons}>
              <div
                className={`${showVariant == 'block' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('block')}
              >
                <ListBlockIcon />
              </div>
              <div
                className={`${showVariant == 'container' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('container')}
              >
                <ListLineIcon />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={`${showVariant === 'block' ? styles.block : styles.gifts}`}> */}
        <div className={styles[showVariant]}>
          <GiftCard variant={showVariant} />
          <GiftCard variant={showVariant} />
          <GiftCard variant={showVariant} />
          <GiftCard variant={showVariant} />
          <GiftCard variant={showVariant} />
        </div>
        {/* <EventForm /> */}
      </div>
    </section>
  );
}
