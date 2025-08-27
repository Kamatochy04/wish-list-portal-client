// src/components/EventCard.tsx
import { FC, useState } from 'react';
import styles from './eventCard.module.scss';
import { DeleteIcon, EditIcon, SendIcon } from '@/shared/icons';
import { useDeleteMutation } from '@/features/event/api/event.api';

type EventCardProps = {
  variant?: 'default' | 'add';
  onClick?: () => void;
  title?: string;
  data?: string;
  img?: string | null;
  giftCount?: number;
  id?: number;
  onEdit?: (id: number) => void;
};

const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const EventCard: FC<EventCardProps> = ({
  data = '',
  img = '',
  variant = 'default',
  onClick,
  title,
  id,
  onEdit,
}) => {
  const [deleteEvent] = useDeleteMutation();
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteEvent(id).unwrap();
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleEdit = () => {
    if (id && onEdit) {
      onEdit(id);
    }
  };

  const handleNavigate = () => {
    if (id) {
      setIsShareOpen(true);
    }
  };

  // eslint-disable-next-line no-undef
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick && !(e.target instanceof SVGElement)) {
      onClick();
    }
  };

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/event-page/${id}`,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=http://localhost:3000/event-page/${id}`,
    },
    { name: 'WhatsApp', url: `https://wa.me/?text=http://localhost:3000/event-page/${id}` },
    {
      name: 'Telegram',
      url: `https://telegram.me/share/url?url=http://localhost:3000/event-page/${id}&text=Check out this event!`,
    },
  ];

  return (
    <>
      {variant === 'default' ? (
        <div className={styles.container} onClick={handleCardClick}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.date}>{formatDate(data)}</p>
          <div className={styles.box}>
            <div className={styles.box__left}>
              <SendIcon onClick={handleNavigate} />
            </div>
            <div className={styles.box__items}>
              <img src={img || 'https://via.placeholder.com/150'} alt="event" />
            </div>
            <div className={styles.box__right}>
              <EditIcon onClick={handleEdit} />
              <DeleteIcon onClick={handleDelete} />
            </div>
          </div>
          <div className={styles.footer}>
            <p className={styles.footer__text}>Gifts: {0}</p>
            <p className={styles.footer__text}>Reserved: 10</p>
          </div>
        </div>
      ) : (
        <div className={styles.add} onClick={onClick}>
          <div className={styles.plus}>+</div>
          <p className={styles.add__text}>Add Event</p>
        </div>
      )}
      {isShareOpen && (
        <div className={styles.shareOverlay} onClick={() => setIsShareOpen(false)}>
          <div className={styles.shareModal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.shareTitle}>Share Event</h3>
            <p className={styles.shareLink}>Link: http://localhost:3000/event-page/{id}</p>
            <ul className={styles.shareOptions}>
              {shareLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.shareOption}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <button className={styles.closeButton} onClick={() => setIsShareOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
