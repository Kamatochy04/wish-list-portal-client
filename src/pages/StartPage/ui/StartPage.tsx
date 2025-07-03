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
import { useState, useEffect } from 'react';
import useAos from '@/shared/hooks/AOS';

export default function StartPage() {
  useAos();
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
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else if (window.innerWidth < 1280) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <div className={styles.page__container} data-aos="zoom-in">
            <div className={styles.block} data-aos="fade-up" data-aos-duration="800">
              <h3 className={styles.block__title} data-aos="flip-up" data-aos-delay="200">
                How to receive a good gift?
              </h3>

              <div className={styles.block__container}>
                <div
                  className={styles.inf_block}
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="600"
                >
                  <div className={styles.inf_block__header}>
                    <CreateWishlistIcon />
                    <p className={styles.inf_block__text}>Create Wishlist</p>
                  </div>
                  <p className={styles.inf_block__descr}>
                    You can create as many lists as you want. Start with one for your birthday and
                    one for Christmas
                  </p>
                </div>
                <div
                  className={styles.inf_block}
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="600"
                >
                  <div className={styles.inf_block__header}>
                    <ShareWishlistIcon />
                    <p className={styles.inf_block__text}>Share Wishlist</p>
                  </div>
                  <p className={styles.inf_block__descr}>
                    Share your wishlist with friends and family so they know exactly what to get you
                  </p>
                </div>
                <div
                  className={styles.inf_block}
                  data-aos="fade-up"
                  data-aos-delay="600"
                  data-aos-duration="600"
                >
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

            <Button
              className={styles.button}
              data-aos="zoom-in"
              data-aos-delay="800"
              data-aos-duration="500"
            >
              Create My Wishlist
            </Button>

            <div
              className={styles.carusel}
              data-aos="fade-up"
              data-aos-delay="900"
              data-aos-duration="700"
            >
              <h4 className={styles.carusel__title} data-aos="fade-down" data-aos-delay="1000">
                Most Popular Gifts
              </h4>
              <div className={styles.carusel__container}>
                <button
                  className={styles.carusel__arrow}
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  data-aos="fade-right"
                  data-aos-delay="1100"
                >
                  <LeftArrowIcon />
                </button>

                <div className={styles.carusel__items}>
                  {visibleItems.map((item, index) => (
                    <div key={item.id} data-aos="zoom-in" data-aos-delay={1200 + index * 100}>
                      <MostPopularGiftItem />
                    </div>
                  ))}
                </div>

                <button
                  className={styles.carusel__arrow}
                  onClick={nextSlide}
                  aria-label="Next slide"
                  data-aos="fade-left"
                  data-aos-delay="1100"
                >
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
