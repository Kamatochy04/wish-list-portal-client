import {
  CreateWishlistIcon,
  LeftArrowIcon,
  ReceiveGiftsIcon,
  RightArrowIcon,
  ShareWishlistIcon,
} from '@/shared/icons';
import styles from './startPage.module.scss';
import { Button } from '@/shared/component';
import { MostPopularGiftItem } from '@/widgets';
import { useState } from 'react';

export default function StartPage() {
  const giftItems = [
    { id: 1, name: 'Gift 1', price: 50 },
    { id: 2, name: 'Gift 2', price: 75 },
    { id: 3, name: 'Gift 3', price: 100 },
    { id: 4, name: 'Gift 4', price: 120 },
    { id: 5, name: 'Gift 5', price: 90 },
    { id: 6, name: 'Gift 6', price: 60 },
    { id: 7, name: 'Gift 7', price: 110 },
    { id: 8, name: 'Gift 8', price: 80 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= giftItems.length ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? giftItems.length - itemsToShow : prevIndex - 1,
    );
  };

  const visibleItems = giftItems.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <>
      <section className={styles.page}>
        <div className="container">
          <div className={styles.page__container}>
            <div className={styles.block}>
              <h3 className={styles.block__title}>How to receive a good gift?</h3>

              <div className={styles.block__container}>
                <div className={styles.inf_block}>
                  <div className={styles.inf_block__header}>
                    <CreateWishlistIcon />
                    <p className={styles.inf_block__text}>Create Wishlist</p>
                  </div>
                  <p className={styles.inf_block__descr}>
                    You can create as many lists as you want. Start with one for your birthday and
                    one for Christmas
                  </p>
                </div>
                <div className={styles.inf_block}>
                  <div className={styles.inf_block__header}>
                    <ShareWishlistIcon />
                    <p className={styles.inf_block__text}>Share Wishlist</p>
                  </div>
                  <p className={styles.inf_block__descr}>
                    Share your wishlist with friends and family so they know exactly what to get you
                  </p>
                </div>
                <div className={styles.inf_block}>
                  <div className={styles.inf_block__header}>
                    <ReceiveGiftsIcon />
                    <p className={styles.inf_block__text}>Receive Gifts</p>
                  </div>
                  <p className={styles.inf_block__descr}>
                    Enjoy receiving gifts that you actually want and will use
                  </p>
                </div>
              </div>
            </div>

            <Button className={styles.button}>Create My Wishlist</Button>

            <div className={styles.carusel}>
              <h4 className={styles.carusel__title}>Most Popular Gifts</h4>
              <div className={styles.carusel__container}>
                <button
                  className={styles.icon_left}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <LeftArrowIcon />
                </button>

                <div className={styles.carusel__items}>
                  {visibleItems.map((item) => (
                    <MostPopularGiftItem key={item.id} />
                  ))}
                </div>

                <button className={styles.icon_right} onClick={nextSlide} aria-label="Next slide">
                  <RightArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
