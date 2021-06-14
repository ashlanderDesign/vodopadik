<template>
  <section class="landing" id="home">
    <div class="banner">
      <h2>Установим технику за Вас</h2>
      <button class="button button-large button-primary">
        Рассчитать установку
      </button>
    </div>
    <h1 class="title">Рекомендуем Вам</h1>
    <div class="cards-recommend">
      <div class="card">
        <img src="" alt="" class="card-image" />
        <div class="card-body">
          <h3 class="card-header">Канал круглый 1,0 м D125 ФЛЕКС</h3>
          <span class="card-stock card-stock-green">В наличии</span>
        </div>
        <div class="card-footer">
          <button class="button button-large button-block button-primary">
            Купить
          </button>
          <span class="card-price">1400 ₽</span>
        </div>
      </div>
      <div class="card">
        <img src="" alt="" class="card-image" />
        <div class="card-body">
          <h3 class="card-header">
            Колено разноугловое горизонтальное 60х120 ФЛЕКС
          </h3>
          <span class="card-stock card-stock-green">В наличии</span>
        </div>
        <div class="card-footer">
          <button class="button button-large button-block button-primary">
            Купить
          </button>
          <span class="card-price">1400 ₽</span>
        </div>
      </div>
      <div class="card">
        <img src="" alt="" class="card-image" />
        <div class="card-body">
          <h3 class="card-header">
            Сифон 1 1,2х40 Ani Грот с гофрой 40х40х50 А0115 АНИ пласт
          </h3>
          <span class="card-stock card-stock-green">В наличии</span>
        </div>
        <div class="card-footer">
          <button class="button button-large button-block button-primary">
            Купить
          </button>
          <span class="card-price">1400 ₽</span>
        </div>
      </div>
      <div class="card">
        <img src="" alt="" class="card-image" />
        <div class="card-body">
          <h3 class="card-header">
            Сифон 1 1,2х40 А220 с гофрой 40х40х50 UNICORN
          </h3>
          <span class="card-stock card-stock-green">В наличии</span>
        </div>
        <div class="card-footer">
          <button class="button button-large button-block button-primary">
            Купить
          </button>
          <span class="card-price">1400 ₽</span>
        </div>
      </div>
      <div class="card">
        <img src="" alt="" class="card-image" />
        <div class="card-body">
          <h3 class="card-header">
            Соединитель 55х110,D100 эксц 90 град круглый ФЛЕКС
          </h3>
          <span class="card-stock card-stock-green">В наличии</span>
        </div>
        <div class="card-footer">
          <button class="button button-large button-block button-primary">
            Купить
          </button>
          <span class="card-price">1400 ₽</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
@import "../sass/button";

.cards-recommend {
  display: grid;
  grid-template-columns: repeat(5, 4fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 16px;
}

.banner {
  width: 100%;
  background-image: url("/img/santehnik.jpg");
  background-size: cover;
  border-radius: 16px;
  height: 35vh;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding: 32px 150px;
  color: #fff;
}

.banner h2 {
  color: #fff;
  font-size: 56px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.landing {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 0.5fr 4fr;
  gap: 32px;
  padding: 32px 40px;
}

.card {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 4fr 2fr 0.5fr;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
  padding: 16px;
  border-radius: 4px;
  gap: 16px;
}

.card-image {
  width: 100%;
}

.card-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: #eeeeee;
  padding: 8px;
  border-radius: 8px;
}

.card-price {
  padding: 16px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  width: 40%;
  white-space: nowrap;
}

.card-header {
  font-weight: 600;
  letter-spacing: 0.8px;
  font-size: 18px;
  line-height: 20px;
  cursor: pointer;
}

.card-header:hover {
  color: #2075f5;
}

.card-stock {
  font-weight: 700;
}

.card-stock-green {
  color: rgb(11, 155, 11);
}

.card-stock-red {
  color: rgb(224, 26, 19);
}
</style>
