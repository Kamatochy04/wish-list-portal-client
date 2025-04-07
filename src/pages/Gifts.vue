<template>
  <Container>
    <div class="wrapper">
      <div class="item">
        <h3 class="item__title">Birthday party</h3>
        <p class="item__date">12.12.2022</p>
        <img src="@/assets/img/birthdayCake.png" alt="" />
        <div class="item__footer">
          <div class="item__footer-punkt">Gifts: 22</div>
          <div class="item__footer-punkt">Reserved : 10</div>
        </div>
      </div>
      <div class="item">
        <h3 class="item__title">Birthday party</h3>
        <p class="item__date">12.12.2022</p>
        <img src="@/assets/img/birthdayCake.png" alt="" />
        <div class="item__footer">
          <div class="item__footer-punkt">Gifts: 22</div>
          <div class="item__footer-punkt">Reserved : 10</div>
        </div>
      </div>
      <div class="item">
        <h3 class="item__title">Birthday party</h3>
        <p class="item__date">12.12.2022</p>
        <img src="@/assets/img/birthdayCake.png" alt="" />
        <div class="item__footer">
          <div class="item__footer-punkt">Gifts: 22</div>
          <div class="item__footer-punkt">Reserved : 10</div>
        </div>
      </div>
      <div class="add-block">
        <p class="plus">+</p>
        <p class="add-block__text">Add Event</p>
      </div>
    </div>
  </Container>
</template>

<script setup>
import Container from "@/components/container/Container.vue";
</script>

<style scoped lang="scss">
.add-block {
  font-weight: 700;
  font-size: 30px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 15px;
  background: #e5e5e5;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  max-width: 180px;
  aspect-ratio: 1;
  width: 100%;
  padding: 10px;

  cursor: pointer;
}
.plus {
  font-weight: 700;
  font-size: 80px;
  color: #000;
}
.wrapper {
  display: flex;
  align-items: center;
  gap: 42px;
  padding: 60px 0 0 0;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  max-width: 180px;
  aspect-ratio: 1;
  width: 100%;

  padding: 9px 16px;
  border-radius: 15px;
  stroke-width: 2px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  &__title {
    font-weight: 700;
    font-size: 19px;
    text-align: center;
    color: #000;
  }
  &__date {
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    color: #000;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    &-punkt {
      font-weight: 700;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
