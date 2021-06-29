<template>
  <main class="wrapper">
    <aside class="filters" v-if="isFiltersAvailable">
      <span class="title">Фильтры</span>
      <div class="filters-row-title">Цена</div>
      <div class="filters-row">
        <input v-model="filters.priceFrom" type="number" placeholder="От" />
        <input v-model="filters.priceTo" type="number" placeholder="До" />
      </div>
      <button
        class="button button-large button-block button-primary"
        @click="getFiltered(categoryId)"
      >
        <span class="button-label">Применить</span>
      </button>
    </aside>
    <div class="mobile-filters" v-show="showMobileFilters">
      <button
        class="button button-large button-secondary close"
        @click="showMobileFilters = false"
      >
        <span class="button-label">Закрыть</span>
      </button>
      <span class="title">Фильтры</span>
      <div class="filters-row-title">Цена</div>
      <div class="filters-row">
        <input v-model="filters.priceFrom" type="number" placeholder="От" />
        <input v-model="filters.priceTo" type="number" placeholder="До" />
      </div>
      <button
        class="button button-large button-block button-primary"
        @click="getFiltered(categoryId)"
      >
        <span class="button-label">Применить</span>
      </button>
    </div>
    <section class="cards">
      <div class="title">
        <h1>{{ categoryName }}</h1>
      </div>
      <button
        v-if="isFiltersAvailable"
        @click="showMobileFilters = true"
        class="button button-large button-block button-primary filters-button"
      >
        <div class="button-label">Фильтры</div>
      </button>
      <div class="card" v-for="product in products" :key="product.id">
        <img :src="`/products/${product.id}.jpg`" alt="" class="card-image" />
        <div class="card-body">
          <router-link :to="`/product?id=${product.id}`" class="card-header">{{
            product.name
          }}</router-link>
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
    </section>
  </main>
</template>

<script>
export default {
  name: "Catalog",
  data: () => {
    return {
      products: [],
      categoryId: null,
      categoryName: "",
      isFiltersAvailable: true,
      showMobileFilters: false,
      filters: {
        priceFrom: "",
        priceTo: "",
      },
    };
  },
  methods: {
    getProductsByCategory(category = null) {
      fetch(
        "https://santechnika-aqua45.ru/web/api/products/by-category?id=" +
          category
      )
        .then((res) => res.json())
        .then((data) => (this.products = data));
    },
    getProductsAll() {
      fetch("https://santechnika-aqua45.ru/web/api/products")
        .then((res) => res.json())
        .then((data) => (this.products = data));
    },
    getProductsBySearchline(search) {
      fetch(
        "https://santechnika-aqua45.ru/web/api/products/search?search=" + search
      )
        .then((res) => res.json())
        .then((data) => (this.products = data));
    },
    getCategoryName(id) {
      fetch("https://santechnika-aqua45.ru/web/api/categories/name?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          this.categoryName = data[0].name;
          document.title = data[0].name;
        });
    },
    getFiltered(category = null) {
      fetch(
        category
          ? `https://santechnika-aqua45.ru/web/api/products/by-category?id=${category}&priceFrom=${this.filters.priceFrom}&priceTo=${this.filters.priceTo}`
          : `https://santechnika-aqua45.ru/web/api/products?priceFrom=${this.filters.priceFrom}&priceTo=${this.filters.priceTo}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.products = data;
        });
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
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
    const query = this.$router.history.current.query;
    if (query.id != undefined) {
      this.getCategoryName(query.id);
      this.categoryId = query.id;
      this.isFiltersAvailable = true;

      if (query.priceFrom != undefined) {
        this.filters.priceFrom = query.priceFrom;
        this.getFiltered(query.id);
      } else if (query.priceTo != undefined) {
        this.filters.priceTo = query.priceTo;
        this.getFiltered(query.id);
      } else {
        this.getProductsByCategory(query.id);
      }
    } else if (query.search != undefined) {
      this.categoryName = `Реультаты поиска "${query.search}"`;
      this.getProductsBySearchline(query.search);
      this.isFiltersAvailable = false;
    } else {
      this.categoryName = "Каталог";
      if (query.priceFrom != undefined) {
        this.filters.priceFrom = query.priceFrom;
        this.getFiltered();
      } else if (query.priceTo != undefined) {
        this.filters.priceTo = query.priceTo;
        this.getFiltered();
      } else {
        this.getProductsAll();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  padding: 32px 40px;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    padding: 32px 8px;
    justify-content: center;
    overflow: hidden;
  }
}

.mobile-filters {
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 90vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;

  .close {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    text-align: left;
    width: 100%;
    margin-bottom: 16px;
  }

  .filters-row {
    margin-bottom: 16px;
  }

  .filters-row-title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 18px;
  }

  input {
    background-color: #ebebeb;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    padding: 16px 32px;
    margin-bottom: 16px;
    width: 100%;
    outline: none;
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

.filters {
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  margin-bottom: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 20%;

  @media screen and (max-width: 1000px) {
    display: none;
  }

  .title {
    font-weight: 600;
    font-size: 24px;
    text-align: left;
    width: 100%;
    margin-bottom: 16px;
  }

  .filters-row {
    margin-bottom: 16px;
  }

  .filters-row-title {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 18px;
  }

  input {
    background-color: #ebebeb;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    padding: 16px 32px;
    margin-bottom: 16px;
    width: 100%;
    outline: none;
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

.filters-button {
  grid-area: filters;
  display: none;
  @media screen and (max-width: 1000px) {
    display: flex;
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  grid-template-rows: 0.1fr 1fr 1fr 0.1fr;
  grid-template-areas:
    "title title title title"
    ". . . . "
    ". . . . "
    "more more more more";
  gap: 12px;
  margin-left: 16px;

  @media screen and (max-width: 1600px) {
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: 0.1fr 1fr 1fr 0.1fr;
    grid-template-areas:
      "title title title"
      ". . . "
      ". . . "
      "more more more";
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.1fr 1fr 1fr 0.1fr;
    grid-template-areas:
      "title"
      "filters"
      "."
      "."
      "more";
    width: 100%;
    margin-left: 0;
  }
}

.cards .more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-area: more;
}

.cards .title {
  grid-area: title;
  font-size: 28px;
  color: #3a3a3c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px 32px;
  border-radius: 4px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  @media screen and (max-width: 1000px) {
    font-size: 16px;
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
