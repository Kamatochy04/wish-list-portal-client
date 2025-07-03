import { Button } from '@/shared/component';
import styles from './giftPage.module.scss';
import { ListBlockIcon, ListLineIcon } from '@/shared/icons';
import { EventCard, GiftCard } from '@/widgets';
import { EventForm, GiftForm } from '@/features';
import { useGetQuery } from '@/features/event/api/event.api';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useAos from '@/shared/hooks/AOS';
import { useNavigate } from 'react-router-dom';

export default function GiftPage() {
  useAos();
  const [showVariant, setShowVariant] = useState<'block' | 'container'>('block');
  const [eventFormIsOpen, setEventFormIsOpen] = useState(false);
  const [giftFormIsOpen, setGiftFormIsOpen] = useState(false);

  const { data, isLoading } = useGetQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (eventFormIsOpen || giftFormIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [eventFormIsOpen, giftFormIsOpen]);

  return (
    <section className="">
      {eventFormIsOpen ? (
        <div className={styles.modal}>
          <EventForm onClouse={() => setEventFormIsOpen(false)} />
        </div>
      ) : null}
      {giftFormIsOpen ? (
        <div className={styles.modal}>
          <GiftForm onClouse={() => setGiftFormIsOpen(false)} />
        </div>
      ) : null}

      <div className="container">
        {isLoading ? (
          <div className={styles.header}>
            {[...Array(3)].map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <Skeleton
                  width="100%"
                  height={100}
                  baseColor="rgba(255, 255, 255, 0.1)"
                  highlightColor="rgba(255, 255, 255, 0.2)"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.header}>
            {data?.map((item) => {
              const eventId = item.id;
              return (
                <EventCard
                  gitftCount={item.gifts.length}
                  key={item.id}
                  img={item.imagePath}
                  data={item.eventDate}
                  onClick={() => {
                    navigate(`/event-page/${eventId}`);
                  }}
                  title={item.title}
                />
              );
            })}
            <EventCard
              variant="add"
              onClick={() => setEventFormIsOpen(!eventFormIsOpen)}
              data-aos="zoom-in"
              // data-aos-delay={100 + (data?.length || 0) * 100}
            />
          </div>
        )}

        <div
          className={styles.table_header}
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="600"
        >
          <Button
            variant="primary"
            leftIcon={<div className={styles.plus}>+</div>}
            className={styles.add_button}
            onClick={() => setGiftFormIsOpen(true)}
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            Add Gift
          </Button>

          <div className={styles.table__block} data-aos="fade-left" data-aos-delay="500">
            <p className={styles.text}>Show as:</p>
            <div className={styles.icons}>
              <div
                className={`${showVariant === 'block' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('block')}
                data-aos="flip-up"
                data-aos-delay="600"
              >
                <ListBlockIcon />
              </div>
              <div
                className={`${showVariant === 'container' ? styles.icon_active : ''} ${styles.icon}`}
                onClick={() => setShowVariant('container')}
                data-aos="flip-up"
                data-aos-delay="700"
              >
                <ListLineIcon />
              </div>
            </div>
          </div>
        </div>
        <div className={styles[showVariant]}>
          {[...Array(5)].map((_, index) => (
            <GiftCard
              key={index}
              variant={showVariant}
              data-aos="fade-up"
              data-aos-delay={800 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
