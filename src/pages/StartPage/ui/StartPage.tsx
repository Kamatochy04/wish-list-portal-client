import { useState, useEffect, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/core';
import styles from './startPage.module.scss';
import { Button } from '@/shared/component';
import { CreateWishlistIcon, ReceiveGiftsIcon, ShareWishlistIcon } from '@/shared/icons';
import { MostPopularGiftItem } from '@/widgets';
import useAos from '@/shared/hooks/AOS';
import { useNavigate } from 'react-router-dom';

interface Gift {
  id: number;
  name: string;
  eventId: number | null;
  description: string | null;
  imagePath: string | null;
  price: number | null;
  currency: 'USD' | 'BYN' | 'RUB' | null;
  externalLink: string | null;
  isReserved: boolean;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export default function StartPage() {
  useAos();
  const [giftItems, setGiftItems] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const splideRef = useRef<Splide | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const fetchPopularGifts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/gifts/popular', {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cache-Control': 'max-age=3600',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to load popular gifts');
        }
        const data: Gift[] = await response.json();
        setGiftItems(data.slice(0, 8));
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularGifts();

    return () => controller.abort();
  }, []);

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.page__container} data-aos="zoom-in">
          <div className={styles.block} data-aos="fade-up" data-aos-duration="600">
            <h3 className={styles.block__title} data-aos="flip-up" data-aos-delay="200">
              How to receive a good gift?
            </h3>

            <div className={styles.block__container}>
              <div
                className={styles.inf_block}
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="500"
              >
                <div className={styles.inf_block__header}>
                  <CreateWishlistIcon />
                  <p className={styles.inf_block__text}>Create Wishlist</p>
                </div>
                <p className={styles.inf_block__descr}>
                  Create as many lists as you want. Start with one for your birthday and one for
                  Christmas.
                </p>
              </div>
              <div
                className={styles.inf_block}
                data-aos="fade-up"
                data-aos-delay="400"
                data-aos-duration="500"
              >
                <div className={styles.inf_block__header}>
                  <ShareWishlistIcon />
                  <p className={styles.inf_block__text}>Share Wishlist</p>
                </div>
                <p className={styles.inf_block__descr}>
                  Share your wishlist with friends and family so they know what to get you.
                </p>
              </div>
              <div
                className={styles.inf_block}
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="500"
              >
                <div className={styles.inf_block__header}>
                  <ReceiveGiftsIcon />
                  <p className={styles.inf_block__text}>Receive Gifts</p>
                </div>
                <p className={styles.inf_block__descr}>
                  Enjoy receiving gifts you actually want and will use.
                </p>
              </div>
            </div>
          </div>

          <Button
            className={styles.button}
            data-aos="zoom-in"
            data-aos-delay="600"
            data-aos-duration="400"
            onClick={() => navigate('/main')}
          >
            Create My Wishlist
          </Button>

          <div className={styles.carousel} data-aos="zoom-in" data-aos-delay="700">
            <h4 className={styles.carousel__title} data-aos="fade-down" data-aos-delay="800">
              Most Popular Gifts
            </h4>
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className={styles.error}>Error: {error}</p>
            ) : giftItems.length === 0 ? (
              <p>No gifts available</p>
            ) : (
              <Splide
                ref={splideRef}
                options={{
                  type: 'loop',
                  perPage: 4,
                  perMove: 1,
                  gap: '10px',
                  pagination: true,
                  arrows: false,
                  lazyLoad: 'nearby',
                  preloadPages: 1,
                  speed: 400,
                  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  breakpoints: {
                    1280: { perPage: 3 },
                    1024: { perPage: 2 },
                    767: { perPage: 1 },
                  },
                }}
                className={styles.carousel__container}
              >
                {giftItems.map((item) => (
                  <SplideSlide key={item.id}>
                    <MostPopularGiftItem
                      id={item.id}
                      name={item.name}
                      imagePath={item.imagePath ? `${item.imagePath}?format=webp` : null}
                      price={item.price}
                      currency={item.currency}
                      description={item.description}
                      externalLink={item.externalLink}
                      likes={item.likes}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
