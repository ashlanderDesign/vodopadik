<template>
  <div class="wrapper">
    <div class="sale">
      <div class="title">
        Только до 31 июля - скидки 60% на весь ассортимент при покупке в
        магазине
      </div>
      <div class="descr">
        Если вы совершите свою первую покупку в нашем магазине до 31 июля - мы
        сделаем вам скидку 60% на любой товар, кроме тех на которые уже есть
        скидка
      </div>
    </div>
    <div class="sale">
      <div class="title">Пенсионерам - постоянная скидка 15%</div>
      <div class="descr">
        При предъявлении действующего пенсионного свидетельства вам полагается
        скидка на любой товар, кроме тех, что уже продаются со скидкой, в
        размере 15%
      </div>
    </div>
    <div class="sale">
      <div class="title">Нашли дешевле? Снизим цену ниже конкурентов!</div>
      <div class="descr">
        Если вы обнаружили идентичный товар дешевле в любом другом магазине
        сантехники - покажите его нам и мы продадим его <b>еще дешевле</b>!
      </div>
    </div>
    <div class="sale">
      <div class="title">Доставка в пределах района Заозерный - бесплатно</div>
      <div class="descr">
        До 2 августа доставка в пределах района Заозерный осуществляется
        бесплатно
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 32px 40px;
  min-height: 80vh;
}

.sale {
  background-color: #fff;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
  width: 80%;

  .title {
    font-size: 32px;
    font-weight: 600;
    width: 70%;
    margin-bottom: 16px;
  }

  .descr {
    font-size: 24px;
  }
}
</style>
