<template>
  <Container>
    <div class="inf">
      <h3 class="inf__title">How to receive a good gift?</h3>
      <div class="inf__wrapper">
        <div class="block">
          <div class="block__title">
            <img
              src="@/assets/icons/CreateWishlistIcon.svg"
              alt="CreateWishlistIcon"
            />
            <h3 class="block__title-text">Create Wishlist</h3>
          </div>
          <p class="block__text">
            You can create as many lists as you want. Start with one for your
            birthday and one for Christmas
          </p>
        </div>
        <div class="block">
          <div class="block__title">
            <img src="@/assets/icons/PhoneLikeIcon.svg" alt="PhoneLikeIcon" />
            <h3 class="block__title-text">Share Wishlist</h3>
          </div>
          <p class="block__text">
            Only the ones you share it with can see your list. Your friends and
            family can check off which items they are getting, and even suggest
            more gifts
          </p>
        </div>
        <div class="block">
          <div class="block__title">
            <img src="@/assets/icons/GiftIcon.svg" alt="GiftIcon" />
            <h3 class="block__title-text">Receive Gifts</h3>
          </div>
          <p class="block__text">
            The cool part is that you can’t know which gifts you’re getting. You
            will only know that you get what you wished for
          </p>
        </div>
      </div>
    </div>
    <button class="button-main">Create My Wishlist</button>

    <h3 class="second-title">Most Popular Gifts</h3>
    <div class="carusel">
      <button class="carusel__button carusel__button-left">
        <img src="@/assets/icons/ScrollToLeft.svg" alt="ScrollToRight" />
      </button>
      <button class="carusel__button carusel__button-right">
        <img src="@/assets/icons/ScrollToRight.svg" alt="ScrollToRight" />
      </button>

      <div class="card">
        <div class="card__img"></div>
        <div class="card__title">
          <h4 class="card__title-text">Gift Title long text ...</h4>
          <span class="card__title-price">0.0$</span>
        </div>
        <div class="card__link">Buy in store</div>
        <p class="card__text">
          Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
          ut aliquam
        </p>
        <button class="card__button">
          <img src="@/assets/icons/CilHeart.svg" alt="" /> Add to my list
        </button>
      </div>
      <div class="card">
        <div class="card__img"></div>
        <div class="card__title">
          <h4 class="card__title-text">Gift Title long text ...</h4>
          <span class="card__title-price">0.0$</span>
        </div>
        <div class="card__link">Buy in store</div>
        <p class="card__text">
          Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
          ut aliquam
        </p>
        <button class="card__button">
          <img src="@/assets/icons/CilHeart.svg" alt="" /> Add to my list
        </button>
      </div>
      <div class="card">
        <div class="card__img"></div>
        <div class="card__title">
          <h4 class="card__title-text">Gift Title long text ...</h4>
          <span class="card__title-price">0.0$</span>
        </div>
        <div class="card__link">Buy in store</div>
        <p class="card__text">
          Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
          ut aliquam
        </p>
        <button class="card__button">
          <img src="@/assets/icons/CilHeart.svg" alt="" /> Add to my list
        </button>
      </div>
      <div class="card">
        <div class="card__img"></div>
        <div class="card__title">
          <h4 class="card__title-text">Gift Title long text ...</h4>
          <span class="card__title-price">0.0$</span>
        </div>
        <div class="card__link">Buy in store</div>
        <p class="card__text">
          Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit
          ut aliquam
        </p>
        <button class="card__button">
          <img src="@/assets/icons/CilHeart.svg" alt="" /> Add to my list
        </button>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/container/Container.vue";
</script>

<style scoped lang="scss">
.carusel {
  display: flex;
  align-items: center;
  gap: 35px;
  margin-top: 5px;
  position: relative;
  &__button {
    position: absolute;
    &-left {
      left: -60px;
    }
    &-right {
      right: -60px;
    }
  }
}
.card {
  background: #e8e8e8;
  border-radius: 10px;
  padding: 8px 15px 12px 15px;
  &__img {
    width: 100%;
    height: 150px;
    background: #c4c4c4;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-weight: 700;
    color: #000;
    margin-top: 5px;
    &-text {
      font-size: 18px;
    }
    &-price {
      font-size: 21px;
    }
  }
  &__link {
    font-weight: 700;
    font-size: 12px;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: #000;

    margin-top: 5px;
  }
  &__text {
    font-weight: 700;
    font-size: 12px;
    color: #000;
    margin-top: 5px;
  }
  &__button {
    font-weight: 700;
    font-size: 12px;
    color: #000;
    padding: 5px;
    border-radius: 10px;

    background: #c4c4c4;

    margin-top: 16px;

    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.inf {
  padding: 13px 29px 57px 29px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 63px;

  &__title {
    font-weight: 700;
    font-size: 20px;
    color: #000;
    text-align: center;
  }
  &__wrapper {
    margin-top: 27px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.block {
  max-width: 250px;
  &__title {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 70px;
    &-text {
      font-weight: 700;
      font-size: 20px;
      color: #000;
    }
  }
  &__text {
    font-weight: 400;
    font-size: 16px;
    color: #7b7b80;
    margin-top: 16px;
    line-height: 130%;
  }
}

.button-main {
  font-weight: 700;
  font-size: 24px;
  color: #fff;
  display: block;

  margin-top: 130px;

  border-radius: 9px;
  padding: 21px 40px;

  margin: 0 auto;

  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background: #f00;

  cursor: pointer;
}

.second-title {
  font-weight: 700;
  font-size: 36px;
  color: #000;
  margin-top: 30px;
  text-align: center;
}
</style>
