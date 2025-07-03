import { GiftCard } from '@/widgets';
import styles from './eventpage.module.scss';
import { ListBlockIcon, ListLineIcon } from '@/shared/icons';
import { useEffect, useState } from 'react';
import useAos from '@/shared/hooks/AOS';
import { useParams } from 'react-router-dom';
import { useGetOneQuery } from '../api/getEvent.api';

export default function EventPage() {
  useAos();
  const { eventID } = useParams<{ eventID: string }>();
  const [showVariant, setShowVariant] = useState<'block' | 'container'>('block');

  const { data: event, isLoading, isError } = useGetOneQuery(Number(eventID));

  useEffect(() => {
    console.log(event);
  }, [event]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !event) return <div>Error loading event</div>;

  return (
    <div className="">
      <div className="container">
        <div className={styles.header} data-aos="fade-up" data-aos-duration="800">
          {event.imagePath && (
            <img
              src={event.imagePath}
              alt={event.title}
              data-aos="fade-right"
              data-aos-delay="100"
            />
          )}
          <div className={styles.header__descr} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.header__title}>
              <h2 className={styles.title} data-aos="fade-right" data-aos-delay="300">
                {event.title}
              </h2>
              <p className={styles.data} data-aos="fade-left" data-aos-delay="300">
                {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'No date'}
              </p>
            </div>
            <p className={styles.header__descrText} data-aos="fade-up" data-aos-delay="400">
              {event.description || 'No description available'}
            </p>
          </div>
          <div className={styles.header__showVariant} data-aos="fade-left" data-aos-delay="500">
            <div className={styles.icons}>
              <p data-aos="fade-down" data-aos-delay="600">
                Show as:
              </p>
              <div
                className={`${showVariant === 'block' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('block')}
              >
                <ListBlockIcon />
              </div>
              <div
                className={`${showVariant === 'container' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('container')}
              >
                <ListLineIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles[showVariant]} ${styles.gitfContainer}`}>
          {event.gifts.length === 0 ? (
            <h2>Gifts not found</h2>
          ) : (
            event.gifts.map((gift, index) => (
              <div
                key={gift.id}
                data-aos="fade-up"
                data-aos-delay={100 * index}
                data-aos-duration="600"
              >
                <GiftCard variant={showVariant} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
