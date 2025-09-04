// src/components/GiftCard.tsx
import { FC, useMemo } from 'react';
import styles from './giftCard.module.scss';
import { DeleteIcon, EditIcon } from '@/shared/icons';
import { useDeleteMutation } from '@/features/gift/api/gift.api';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector } from '@/app/store/hooks';
import { Currency } from '@/shared/entities/entities';

const exchangeRates = {
  USD: { BYN: 3.3, RUB: 90, USD: 1 },
  BYN: { USD: 0.3, RUB: 27.27, BYN: 1 },
  RUB: { USD: 0.011, BYN: 0.037, RUB: 1 },
};

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency = Currency.USD,
): number {
  if (fromCurrency === toCurrency) return amount;
  const rate = exchangeRates[fromCurrency]?.[toCurrency];
  return rate !== undefined ? Number((amount * rate).toFixed(2)) : amount;
}

type GiftCardProps = {
  variant?: 'container' | 'block';
  id: number;
  name: string;
  description?: string;
  imagePath?: string | null;
  price?: number;
  currency?: Currency;
  externalLink?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number, name: string) => void;
};

export const GiftCard: FC<GiftCardProps> = ({
  variant = 'container',
  id,
  name,
  description,
  imagePath,
  price,
  currency = Currency.USD,
  externalLink,
  onEdit,
  onDelete,
}) => {
  const [deleteGiftMutation, { isLoading: isDeleting }] = useDeleteMutation();
  const userCurrency = useAppSelector((state) => state.user.currency) || Currency.USD;

  const handleDelete = async () => {
    await deleteGiftMutation(id).unwrap();
  };

  const handleEdit = () => {
    if (onEdit) onEdit(id);
  };

  const handleDeleteClick = () => {
    if (onDelete) onDelete(id, name);
  };

  const convertedPrice = useMemo(
    () => (price ? convertCurrency(price, currency, userCurrency) : undefined),
    [price, currency, userCurrency],
  );

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles[variant]} ${styles.box}`}
        initial={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={imagePath || ''}
          alt={name}
          className={`${variant === 'block' ? styles.block_img : styles.container_img}`}
        />
        <div className={styles.text}>
          <h4 className={`${styles.text_line} ${styles.title}`}>
            {name}
            {variant === 'container' ? null : (
              <div className={styles.icons}>
                <button
                  className={styles.icon}
                  aria-label="Delete gift"
                  disabled={isDeleting}
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon onClick={handleDelete} />
                </button>
                <button className={styles.icon} aria-label="Edit gift" onClick={handleEdit}>
                  <EditIcon />
                </button>
              </div>
            )}
          </h4>
          <p className={styles.descr}>{description || 'No description'}</p>
          <div className={styles.link}>
            {externalLink ? (
              <a href={externalLink} target="_blank" rel="noopener noreferrer">
                Link to shop
              </a>
            ) : (
              <p>No link provided</p>
            )}
            {variant === 'container' ? null : (
              <div className={styles.price}>
                {convertedPrice && userCurrency ? `${convertedPrice} ${userCurrency}` : 'No price'}
              </div>
            )}
          </div>
        </div>

        {variant === 'block' ? null : (
          <div className={styles.inf}>
            <div className={styles.price}>
              {convertedPrice && userCurrency ? `${convertedPrice} ${userCurrency}` : 'No price'}
            </div>
            <div className={styles.icons}>
              <button
                className={styles.icon}
                aria-label="Delete gift"
                disabled={isDeleting}
                onClick={handleDeleteClick}
              >
                <DeleteIcon onClick={handleDelete} />
              </button>
              <button className={styles.icon} aria-label="Edit gift" onClick={handleEdit}>
                <EditIcon />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
