<template>
  <div id="app">
    <header class="header-wrapper">
      <div class="header-top">
        <button class="button button-primary-transparent">
          <img src="/img/navigation_arrow.svg" alt="" class="button-icon" />
          <span class="button-label">Курган</span>
        </button>
        <div class="header-top-right">
          <a href="#top">Адрес магазина</a>
          <router-link to="/account" href="#top" id="login-button"
            >Личный кабинет</router-link
          >
        </div>
        <div id="loginForm" class="header-login-form hidden">
          <h4 class="header-login-form-title">Войти или зарегистрироваться</h4>
          <input type="text" placeholder="Имя пользователя" />
          <input type="password" placeholder="Пароль" />
          <button class="button button-primary button-block button-medium">
            Войти
          </button>
          <button
            id="registerButton"
            class="button button-secondary button-block button-medium"
          >
            Зарегистрироваться
          </button>
        </div>
        <div id="registerForm" class="header-login-form hidden">
          <h4 class="header-login-form-title">Регистрация</h4>
          <input type="text" placeholder="Имя пользователя" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Пароль" />
          <input type="password" placeholder="Повторите пароль" />
          <button class="button button-primary button-block button-medium">
            Зарегистрироваться
          </button>
          <button
            id="haveAccountButton"
            class="button button-secondary button-block button-medium"
          >
            У меня уже есть аккаунт
          </button>
        </div>
      </div>
      <div class="header-mid">
        <router-link to="/"
          ><img src="/img/logo_akva.jpg" alt="" class="header-logo"
        /></router-link>
        <div class="search">
          <input
            type="text"
            placeholder="Поиск по каталогу..."
            class="header-search"
            @change="searchProducts($event.target.value)"
          />
          <div class="search-results" v-show="searchResults.length !== 0">
            <router-link
              @click.native="searchResults = []"
              class="item"
              v-for="result in searchResults"
              :key="result.id"
              :to="`/product?id=${result.id}`"
              >{{ result.name }}</router-link
            >
          </div>
          <button class="button button-circle button-large button-primary">
            <img class="button-icon" src="/img/search_icon.svg" alt="" />
          </button>
        </div>
        <section class="header-phone">
          <img src="/img/phone_icon.svg" alt="" />
          <a href="tel:+78009999999">+7 800 999 99-99</a>
        </section>
        <button
          class="button button-large button-primary-transparent"
          @click="cartShow = !cartShow"
        >
          <img src="/img/cart_icon.svg" alt="" class="button-icon" />
          <span class="button-label">Корзина</span>
        </button>
        <div class="cart" v-show="cartShow">
          <h2>Ваша корзина:</h2>
          <div
            class="cart-item"
            v-for="item in $store.state.cart"
            :key="item.id"
          >
            <span class="item-name">{{ item.name }}</span>
            <span class="quantity">{{ item.quantity }} шт</span>
          </div>
          <div class="cart-footer">
            <button
              class="button button-block button-large button-primary"
              @click="$router.push('/order')"
            >
              <span class="button-label">Оформить заказ</span>
            </button>
          </div>
        </div>
      </div>
      <div class="header-nav">
        <button
          class="button button-large-wide button-primary"
          id="catalog"
          @click="catalogShow = !catalogShow"
        >
          <img src="/img/hamburger_icon.svg" alt="" class="button-icon" />
          <span class="button-label">Каталог товаров</span>
        </button>
        <router-link to="/sale" href="">Акции</router-link
        ><router-link to="/delivery" href="">Доставка и самовывоз</router-link
        ><a href="">Установка</a><a href="">Вакансии</a
        ><a href="">Юридическим лицам</a>
        <section class="catalog-list" v-show="catalogShow">
          <div
            class="list-item"
            v-for="category in categories"
            :key="category.id"
          >
            <span>{{ category.name }}</span>
            <img src="/img/chevron_right.svg" alt="" class="list-item-icon" />
            <div v-if="category.children" class="list-item-children hidden">
              <router-link
                :to="'catalog?id=' + subcategory.id"
                @click.native="catalogShow = false"
                v-for="subcategory in category.children"
                :key="subcategory.id"
                class="list-item"
              >
                {{ subcategory.name }}
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </header>
    <div class="container">
      <router-view :key="$route.fullPath" />
    </div>
    <footer class="footer-wrapper">
      <div class="footer-top">
        <img src="/img/logo_akva.jpg" alt="" class="footer-logo" />
        <a href="">Связаться с нами</a>
        <a href="">Заказать обратный звонок</a>
        <a href="">Публичная оферта</a>
        <router-link to="/policy" href=""
          >Политика конфеденциальности</router-link
        >
      </div>
      <!-- <div class="footer-bottom">2021 &copy; АКВА</div> -->
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      categories: [],
      searchResults: [],
      catalogShow: false,
      cartShow: false,
    };
  },
  methods: {
    getCategories() {
      fetch("http://localhost:8081/api/categories")
        .then((res) => res.json())
        .then((data) => {
          this.prepareCategories(data);
          this.$store.commit("setCategories", data);
        });
    },
    searchProducts(string) {
      fetch("http://localhost:8081/api/products/search?search=" + string)
        .then((res) => res.json())
        .then((data) => (this.searchResults = data));
    },
    prepareCategories(list) {
      const nest = (items, id = null, link = "parent") =>
        items
          .filter((item) => item[link] === id)
          .map((item) => ({ ...item, children: nest(items, item.id) }));
      this.categories = nest(list);
      console.log(nest(list));
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style lang="scss">
@import "sass/button";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
}

.search-results {
  position: absolute;
  background-color: #fff;
  padding: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  z-index: 9999;
  top: calc(100% + 16px);
  width: 100%;
  left: 0;
  max-height: 60vh;
  overflow-y: scroll;
  border-radius: 16px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);

  &::-webkit-scrollbar {
    background: transparent;
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ebebeb;
    width: 4px;
    border-radius: 16px;
  }

  .item {
    padding: 8px;
    color: #000;
    text-decoration: none;

    &:hover {
      color: #2075f5;
    }
  }
}

#app {
  background-image: url("/img/geometry.png");
  background-size: 256px 256px;
  font-family: "Roboto", sans-serif;
}

.header-wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  font-family: "Roboto", sans-serif;
  min-height: 15vh;
  background-color: #fff;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.12);
}

.header-top a {
  text-decoration: none;
  color: #3c3c3a;
}

.header-top a:hover {
  color: #2075f5;
}

.header-top {
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
  align-items: center;
  width: 100%;
  background-color: #cdd9e9;
  position: relative;
}

.header-top-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.header-login-form {
  position: absolute;
  background-color: #fff;
  padding: 16px;
  border-radius: 16px;
  top: calc(100% + 16px);
  right: 32px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.23);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: column;
  max-width: 15vw;
}

.header-login-form-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
}

.header-login-form input {
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: none;
  background-color: #ebebeb;
}

.header-mid {
  width: 100%;
  padding: 12px 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.cart {
  position: absolute;
  right: 16px;
  top: calc(100% + 16px);
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  z-index: 999999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 32px;
  gap: 16px;

  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;

    .item-name {
      font-weight: 500;
    }

    .quantity {
      background-color: #ebebeb;
      padding: 8px;
    }
  }
}

.header-nav {
  width: 100%;
  padding: 12px 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 64px;
  position: relative;
}

.header-nav a {
  color: #3a3a3c;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
}

.header-nav a:hover {
  color: #2075f5;
}

.search {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.header-search {
  width: 80%;
  background-color: #ebebeb;
  border-radius: 16px;
  padding: 16px 18px;
  outline: none;
  border: none;
}

.header-search-button {
  background-color: #2075f5;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-phone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;
  border-radius: 16px;
}

.header-phone img {
  height: 24px;
}

.header-phone a {
  font-weight: 700;
  font-size: 24px;
  color: #000;
  text-decoration: none;
}

.header-cart {
  height: 32px;
}

.header-search-button img {
  width: 16px;
}

.header-logo {
  height: 9vh;
}

.hidden {
  display: none;
}

.footer-wrapper {
  background-color: #cfcfcf;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  padding: 8px 40px;
  gap: 8px;
}

.catalog-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  padding: 16px;
  top: 110%;
  background-color: #fff;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.12);
  z-index: 999;
}

.catalog-list.hidden {
  display: none;
}

.list-item {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  position: relative;

  a {
    color: #000;
    font-weight: 400;
  }

  &:hover > a {
    color: #fff;
  }

  a:hover {
    color: #fff;
  }
}

.list-item:hover .list-item-children {
  position: absolute;
  left: calc(100%);
  top: 0;
  background-color: #fff;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.12);
  width: 100%;
}

.list-item .list-item-icon {
  height: 16px;
}

.list-item:hover {
  background-color: #2075f5;
  color: #fff;
}

.footer-logo {
  height: 8vh;
}

.footer-top a {
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;
  background-color: #2075f5;
  padding: 8px 16px;
  border-radius: 8px;
}

.footer-top a:hover {
  background-color: #1d62ca;
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
