<template>
  <main class="wrapper">
    <aside class="side-block">
      <div class="block" v-show="showSubscribe">
        <div class="title" v-show="!isSubscribed">
          Подпишись на наши обновления!
        </div>
        <input type="text" placeholder="Ваш email" v-show="!isSubscribed" />
        <button
          class="button button-primary button-block button-large"
          v-show="!isSubscribed"
          @click="subscribe()"
        >
          <span class="button-label">Подписаться</span>
        </button>
        <h3 v-show="isSubscribed">Спасибо за подписку!</h3>
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
        <div class="card" v-for="product in recommended" :key="product.id">
          <img :src="`/products/${product.id}.jpg`" alt="" class="card-image" />
          <div class="card-body">
            <router-link
              :to="`/product?id=${product.id}`"
              class="card-header"
              >{{ product.name }}</router-link
            >
          </div>
          <div class="card-footer">
            <button
              :class="[
                'button',
                'button-large',
                'button-block',
                !inCart(product) && 'button-primary',
                inCart(product) && 'button-secondary',
              ]"
              @click="addToCart(product)"
            >
              {{ inCart(product) ? "В корзине" : "Купить" }}
            </button>
            <span class="card-price">{{ product.price }} ₽</span>
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
      recommended: [],
      showSubscribe: true,
      isSubscribed: false,
    };
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    subscribe() {
      this.isSubscribed = true;
      setTimeout(() => {
        this.showSubscribe = false;
      }, 1500);
    },
    getPopularCategories() {
      fetch("https://santechnika-aqua45.ru/web/api/categories")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.slice(0, 6));
          this.popularCategories = data.filter((x) => {
            return x.id >= 59 && x.id <= 66;
          });
        });
    },
    random(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomProducts() {
      const array = [
        this.random(1, 500),
        this.random(1, 500),
        this.random(1, 500),
        this.random(1, 500),
      ];
      fetch(
        "https://santechnika-aqua45.ru/web/api/products/related?ids=" +
          array.join(",")
      )
        .then((res) => res.json())
        .then((data) => (this.recommended = data));
    },
    inCart(product) {
      const cart = this.$store.state.cart;

      if (cart.length > 0) {
        const filtered = cart.filter((x) => x.id == product.id);
        return filtered.length > 0;
      }
      return false;
    },
  },
  mounted() {
    this.getPopularCategories();
    this.getRandomProducts();
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

  @media screen and (max-width: 1000px) {
    padding: 32px 8px;
    flex-direction: column-reverse;
  }
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

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
  @media screen and (max-width: 1000px) {
    padding: 32px 64px;
  }
}

.banner h2 {
  color: #fff;
  font-size: 56px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
}

.landing {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 0.5fr 4fr;
  gap: 32px;
  margin-left: 32px;

  @media screen and (max-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    margin-bottom: 32px;
  }
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
  color: #000;
  text-decoration: none;
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
