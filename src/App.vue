<template>
  <div id="app">
    <nav class="mobile-nav-panel" v-show="mobileNavShow">
      <span
        class="close"
        @click="
          mobileNavShow = false;
          openMobileCategory(categories);
        "
        >Закрыть</span
      >
      <div class="search search-fluid">
        <input
          type="text"
          placeholder="Поиск по каталогу..."
          class="header-search"
          v-model="mobileSearch"
        />
        <button class="button button-circle button-large button-primary">
          <img class="button-icon" src="/img/search_icon.svg" alt="" />
        </button>
      </div>
      <div class="catalogue" v-show="mobileCatalogue.length > 0">
        <div
          class="item"
          v-for="category in mobileCatalogue"
          @click="openMobileCategory(category.children)"
          :key="category.id"
        >
          <span v-if="category.parent == null">{{ category.name }}</span>
          <router-link
            v-if="category.parent != null"
            :to="'catalog?id=' + category.id"
            @click.native="
              mobileNavShow = false;
              openMobileCategory(categories);
            "
          >
            {{ category.name }}
          </router-link>
          <img src="/img/chevron_right.svg" alt="" />
        </div>
      </div>
    </nav>
    <header class="header-wrapper">
      <div class="header-top">
        <a href="https://yandex.ru/maps/-/CCUemDT4cB" target="_blank">
          <button class="button button-primary-transparent">
            <img src="/img/navigation_arrow.svg" alt="" class="button-icon" />
            <span class="button-label">Курган</span>
          </button>
        </a>
        <div class="header-top-right">
          <a href="https://yandex.ru/maps/-/CCUemDT4cB" target="_blank"
            >Адрес магазина</a
          >
          <router-link to="/account" href="#top" id="login-button"
            >Личный кабинет
            {{ getUsername ? `(${getUsername})` : "" }}</router-link
          >
        </div>
      </div>
      <div class="menu-mobile">
        <router-link to="/"
          ><img src="/img/logo_akva.jpg" alt="" class="header-logo"
        /></router-link>
        <img
          src="/img/cart_icon.svg"
          @click="cartShow = !cartShow"
          alt=""
          class="button-icon"
        />
        <a href="tel:88002348808"><img src="/img/phone_icon.svg" alt="" /></a>
        <img
          src="/img/hamburger_icon.svg"
          alt=""
          class="menu-button"
          @click="mobileNavShow = true"
        />
        <div class="cart mobile" v-show="cartShow">
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
              @click="
                $router.push('/order');
                cartShow = false;
              "
            >
              <span class="button-label">Оформить заказ</span>
            </button>
          </div>
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
              @click="
                $router.push('/order');
                cartShow = false;
              "
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
        ><a href="/docs/contract.docx" target="_blank" download>Установка</a
        ><router-link to="/jobs">Вакансии</router-link
        ><router-link to="/organization">Юридическим лицам</router-link>
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
        <router-link class="mobile-only" to="/sales">Акции</router-link>
        <router-link class="mobile-only" to="/delivery"
          >Доставка и самовывоз</router-link
        >
        <a
          class="mobile-only"
          href="/docs/contract.docx"
          target="_blank"
          download
          >Установка</a
        >
        <router-link class="mobile-only" to="/jobs" href=""
          >Вакансии</router-link
        >
        <router-link class="mobile-only" to="/organization" href=""
          >Юридическим лицам</router-link
        >
        <router-link to="/contacts">Связаться с нами</router-link>
        <a href="tel:88002348808">Звонок</a>
        <a href="/docs/public.docx" target="_blank" download
          >Публичная оферта</a
        >
        <a
          href="/docs/privacy.docx"
          target="_blank"
          download
          >Политика конфиденциальности</a
        >
      </div>
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
      mobileCatalogue: [],
      catalogShow: false,
      cartShow: false,
      mobileNavShow: false,
      mobileSearch: "",
    };
  },
  computed: {
    getUsername() {
      const user = this.$store.state.user;
      if (user.isLogged) {
        console.log(user.username, user.name);
        if (user.name != undefined) {
          return user.name;
        }
        if (user.username != undefined) {
          return user.username;
        }
        return false;
      }

      return false;
    },
  },
  methods: {
    getCategories() {
      fetch("https://santechnika-aqua45.ru/web/api/categories")
        .then((res) => res.json())
        .then((data) => {
          this.prepareCategories(data);
          this.$store.commit("setCategories", data);
        });
    },
    openMobileCategory(data) {
      if (data.length > 0) this.mobileCatalogue = data;
    },
    searchProducts(string) {
      fetch(
        "https://santechnika-aqua45.ru/web/api/products/search?search=" + string
      )
        .then((res) => res.json())
        .then((data) => (this.searchResults = data));
    },
    prepareCategories(list) {
      const nest = (items, id = null, link = "parent") =>
        items
          .filter((item) => item[link] === id)
          .map((item) => ({ ...item, children: nest(items, item.id) }));
      this.categories = nest(list);
      this.mobileCatalogue = [...nest(list)];
      return nest(list);
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

  @media screen and (max-width: 1000px) {
    display: none;
  }

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
  @media screen and (max-width: 1000px) {
    padding: 12px 8px;
  }
}

.header-top-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  @media screen and (max-width: 1000px) {
    & *:not(#login-button) {
      display: none;
    }
  }
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

  @media screen and (max-width: 1000px) {
    display: none;
  }
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

  &.mobile {
    width: 90vw;
    padding: 16px;
  }

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
      white-space: nowrap;
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
  @media screen and (max-width: 1000px) {
    display: none;
  }
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

  &-fluid {
    width: 100%;
  }
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

.mobile-nav-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;

  .catalogue {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    max-height: 70vh;
    overflow-y: scroll;

    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;

      span {
        font-weight: 500;
        font-size: 16px;
      }

      img {
        height: 64px;
      }
    }
  }

  .close {
    padding: 8px 16px;
    background-color: #ebebeb;
    margin: 16px;
    border-radius: 16px;
  }
}

.header-phone a {
  font-weight: 700;
  font-size: 24px;
  color: #000;
  text-decoration: none;
  white-space: nowrap;
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

  @media screen and (max-width: 1000px) {
    padding: 8px;
    flex-direction: row;
    align-items: flex-end;
  }
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

.menu-mobile {
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 16px;
  position: relative;

  img:not(.header-logo) {
    height: 32px;
    filter: invert(47%) sepia(79%) saturate(5504%) hue-rotate(206deg)
      brightness(100%) contrast(93%);
  }

  .menu-button {
    filter: invert(47%) sepia(79%) saturate(5504%) hue-rotate(206deg)
      brightness(100%) contrast(93%);
  }
  @media screen and (max-width: 1000px) {
    display: flex;
  }
}

.footer-logo {
  height: 8vh;
  @media screen and (max-width: 1000px) {
    height: auto;
    width: 100%;
  }
}

.footer-top a {
  text-decoration: none;
  font-size: 18px;
  color: #f5f5f5;
  background-color: #2075f5;
  padding: 8px 16px;
  border-radius: 8px;

  @media screen and (max-width: 1000px) {
    font-size: 14px;
    text-align: center;
  }
}

.footer-top a:hover {
  background-color: #1d62ca;
}

.footer-mobile {
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
  }
  flex-direction: column;
  align-items: flex-start;
  width: 50%;

  a {
    text-decoration: none;
    font-size: 18px;
    color: #f5f5f5;
    background-color: #2075f5;
    padding: 8px 16px;
    border-radius: 8px;
    margin: 8px 0;
    width: 100%;

    @media screen and (max-width: 1000px) {
      font-size: 14px;
      text-align: center;
    }

    &:hover {
      background-color: #1d62ca;
    }
  }
}

.footer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .mobile-only {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-end;

    .mobile-only {
      display: inline;
    }

    & a {
      margin: 8px 0;
      width: 100%;
    }
  }
}
</style>
