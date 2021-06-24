<template>
  <main class="wrapper">
    <aside class="side-block">
      <div class="block">
        <div class="title">Подпишись на наши обновления!</div>
        <input type="text" placeholder="Ваш email" />
        <button class="button button-primary button-block button-large">
          <span class="button-label">Подписаться</span>
        </button>
      </div>
      <div class="block">
        <div class="title">Популярные категории</div>
        <router-link
          :to="`/catalog?id=${category.id}`"
          v-for="category in popularCategories"
          :key="category.id"
          >{{ category.name }}</router-link
        >
      </div>
    </aside>
    <section class="landing" id="home">
      <div class="banner">
        <h2>Установим технику за Вас</h2>
      </div>
      <h1 class="title">Рекомендуем Вам</h1>
      <div class="cards-recommend">
        <div class="card">
          <img src="/products/345.jpg" alt="" class="card-image" />
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
          <img src="/products/255.jpg" alt="" class="card-image" />
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
          <img src="/products/94.jpg" alt="" class="card-image" />
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
          <img src="/products/582.jpg" alt="" class="card-image" />
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
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      popularCategories: [],
    };
  },
  methods: {
    getPopularCategories() {
      fetch("https://santechnika-aqua45.ru/web/api/categories")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.slice(0, 6));
          this.popularCategories = data.filter((x) => {
            return x.id > 7 && x.id < 14;
          });
        });
    },
  },
  mounted() {
    this.getPopularCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/button";

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 32px 40px;
  width: 100%;
}

.side-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}

.block {
  padding: 32px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 24px;
    text-align: left;
    width: 100%;
    margin-bottom: 16px;
  }

  input {
    background-color: #ebebeb;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    padding: 16px 32px;
    margin-bottom: 16px;
    width: 100%;
  }

  a {
    padding: 8px 4px;
    font-weight: 500;
    text-decoration: none;
    color: #000;

    &:hover {
      color: #2075f5;
    }
  }
}

.cards-recommend {
  display: grid;
  grid-template-columns: repeat(4, 4fr);
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
  margin-left: 32px;
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
