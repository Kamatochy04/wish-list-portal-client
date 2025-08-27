import { Button } from '@/shared/component';
import styles from './mostPopularGiftItem.module.scss';
import { HeartIcon } from '@/shared/icons';
import { useState } from 'react';
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

interface MostPopularGiftItemProps {
  id: number;
  name: string;
  imagePath: string | null;
  price: number | null;
  currency: Currency | null;
  description: string | null;
  externalLink: string | null;
  likes: number;
}

export const MostPopularGiftItem = ({
  id,
  name,
  imagePath,
  price,
  currency,
  description,
  externalLink,
  likes,
}: MostPopularGiftItemProps) => {
  const [imageError, setImageError] = useState(false);
  const userCurrency = useAppSelector((state) => state.user.currency) || Currency.USD;

  const handleImageError = () => {
    setImageError(true);
  };

  const convertedPrice = price && currency ? convertCurrency(price, currency, userCurrency) : null;

  return (
    <div className={styles.block}>
      <img
        src={imagePath || undefined}
        alt={name}
        className={styles.block__image}
        onError={handleImageError}
      />
      <div className={styles.block__title}>
        <p>{name}</p>
        <span className={styles.price}>
          {convertedPrice && userCurrency
            ? `${convertedPrice.toFixed(2)} ${userCurrency}`
            : 'Price not available'}
        </span>
      </div>
      {externalLink ? (
        <a href={externalLink} className={styles.link} target="_blank" rel="noopener noreferrer">
          Buy in store
        </a>
      ) : (
        <div className={styles.link}>No link.Se available</div>
      )}
      <p className={styles.descr}>{description || 'No description available'}</p>
      <Button variant="primary" leftIcon={<HeartIcon />} className={styles.button}>
        Add to my list
      </Button>
    </div>
  );
};
