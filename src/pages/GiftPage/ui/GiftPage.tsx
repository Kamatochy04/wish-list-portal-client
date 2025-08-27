import { Button, NoGiftsComponent } from '@/shared/component';
import styles from './giftPage.module.scss';
import { ListBlockIcon, ListLineIcon } from '@/shared/icons';
import { EventCard, GiftCard } from '@/widgets';
import { EventForm, GiftForm } from '@/features';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useAos from '@/shared/hooks/AOS';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserGiftsQuery } from '@/features/gift/api/gift.api';
import { useGetQuery } from '@/features/event/api/event.api';
import { RootState } from '@/app/store/store';

export default function GiftPage() {
  useAos();
  const [showVariant, setShowVariant] = useState<'block' | 'container'>('block');
  const [eventFormIsOpen, setEventFormIsOpen] = useState(false);
  const [giftFormIsOpen, setGiftFormIsOpen] = useState(false);
  const [editEventId, setEditEventId] = useState<number | undefined>(undefined);
  const [editGiftId, setEditGiftId] = useState<number | undefined>(undefined);
  const [deleteGiftId, setDeleteGiftId] = useState<number | undefined>(undefined);
  const [deleteGiftTitle, setDeleteGiftTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const { events } = useSelector((state: RootState) => state.events);
  const { gifts } = useSelector((state: RootState) => state.gifts);

  const { isLoading: isLoadingEvents } = useGetQuery();
  const { isLoading: isLoadingGifts } = useGetUserGiftsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (eventFormIsOpen || giftFormIsOpen || deleteGiftId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [eventFormIsOpen, giftFormIsOpen, deleteGiftId]);

  const handleEditEvent = (id: number) => {
    setEditEventId(id);
    setEventFormIsOpen(true);
  };

  const handleEditGift = (id: number) => {
    setEditGiftId(id);
    setGiftFormIsOpen(true);
  };

  const handleDeleteGift = (id: number, title: string) => {
    setDeleteGiftId(id);
    setDeleteGiftTitle(title);
  };

  const displayGifts = gifts?.length ? gifts : [];
  const totalPages = Math.ceil(displayGifts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentGifts = displayGifts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="">
      {eventFormIsOpen && (
        <div className={styles.modal}>
          <EventForm
            onClouse={() => {
              setEventFormIsOpen(false);
              setEditEventId(undefined);
            }}
            eventId={editEventId}
          />
        </div>
      )}
      {giftFormIsOpen && (
        <div className={styles.modal}>
          <GiftForm
            onClouse={() => {
              setGiftFormIsOpen(false);
              setEditGiftId(undefined);
            }}
            giftId={editGiftId}
          />
        </div>
      )}

      <div className="container">
        {isLoadingEvents ? (
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
            {events?.map((item) => {
              const eventId = item.id;
              return (
                <EventCard
                  key={item.id}
                  img={item.imagePath}
                  data={item.eventDate}
                  onClick={() => {
                    navigate(`/event-page/${eventId}`);
                  }}
                  onEdit={() => handleEditEvent(eventId)}
                  title={item.title}
                  id={eventId}
                />
              );
            })}
            <EventCard
              variant="add"
              onClick={() => {
                setEditEventId(undefined);
                setEventFormIsOpen(!eventFormIsOpen);
              }}
              data-aos="zoom-in"
            />
          </div>
        )}

        <div className={styles.table_header}>
          <Button
            variant="primary"
            leftIcon={<div className={styles.plus}>+</div>}
            className={styles.add_button}
            onClick={() => {
              setEditGiftId(undefined);
              setGiftFormIsOpen(true);
            }}
          >
            Add Gift
          </Button>

          <div className={styles.table__block}>
            <p className={styles.text} data-aos="zoom-in" data-aos-delay="700">
              Show as:
            </p>
            <div className={styles.icons}>
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

        {isLoadingGifts ? (
          <div className={styles[showVariant]}>
            {[...Array(5)].map((_, index) => (
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
        ) : displayGifts.length === 0 ? (
          <NoGiftsComponent />
        ) : (
          <div className={styles[showVariant]}>
            {currentGifts.map((gift) => (
              <GiftCard
                key={gift.id}
                variant={showVariant}
                id={gift.id}
                name={gift.name}
                description={gift.description}
                imagePath={gift.imagePath}
                price={gift.price}
                currency={gift.currency}
                externalLink={gift.externalLink}
                onEdit={() => handleEditGift(gift.id)}
                onDelete={() => handleDeleteGift(gift.id, gift.name)}
                data-aos="fade-up"
                data-aos-delay={800 + gift.id * 100}
              />
            ))}
          </div>
        )}
        {displayGifts.length > 0 && (
          <div className={styles.pagination}>
            <button
              className={styles.pagination__button}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={styles.pagination__page}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pagination__button}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
