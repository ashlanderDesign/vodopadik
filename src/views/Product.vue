<template>
  <section class="product" id="product">
    <div class="product-main">
      <div class="product-image">
        <img :src="`/products/${product.id}.jpg`" alt="" />
      </div>
      <div class="product-info">
        <h3 class="product-title">
          {{ product.name }}
        </h3>
        <div class="product-info-main">
          <div class="left">
            <div class="product-price">
              <span class="price">{{ product.price }} ₽</span>
              <button
                :class="[
                  'button',
                  'button-large',
                  !inCart(product) && 'button-primary',
                  inCart(product) && 'button-secondary',
                ]"
                @click="addToCart(product)"
              >
                <span class="button-label">{{
                  inCart(product) ? "В корзине" : "Купить"
                }}</span>
              </button>
            </div>
          </div>
          <div class="right">
            <div class="availability">
              <div class="store">
                <div class="title">Кол-во товара в магазине:</div>
                <span>{{ stock.store }}</span>
              </div>
              <div class="warehouse">
                <div class="title">Кол-во товара на складе:</div>
                <span>{{ stock.warehouses }}</span>
              </div>
            </div>
          </div>
        </div>
        <h2 class="description-title">Описание товара:</h2>
        <div class="product-description">
          {{ product.description }}
        </div>
      </div>
    </div>
    <h3 class="description-title" v-show="related.length > 0">
      Для установки данного товара Вам может понадобиться:
    </h3>
    <div class="related-products">
      <div class="mini-card" v-for="reprod in related" :key="reprod.id">
        <button
          :class="[
            'alreadyHave',
            installProducts.indexOf(reprod) > -1 ? 'unactive' : 'active',
          ]"
          @click="
            installProducts.indexOf(reprod) > -1
              ? removeFromInstall(reprod)
              : addToInstall(reprod)
          "
        >
          Уже есть
        </button>
        <img :src="`/products/${reprod.id}.jpg`" alt="" class="card-image" />
        <div class="card-info">
          <router-link :to="`/product?id=${reprod.id}`" class="info-title">{{
            reprod.name
          }}</router-link>
          <div class="info-price">
            <span class="price">{{ reprod.price }} ₽</span>
            <button
              :class="[
                'button',
                'button-block',
                !inCart(reprod) && 'button-primary',
                inCart(reprod) && 'button-secondary',
              ]"
              @click="addToCart(reprod)"
            >
              {{ inCart(reprod) ? "В корзине" : "Купить" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="installation">
      <h3 class="description-title">
        Средняя стоимость установки данного товара:
      </h3>
      <div class="delivery">
        <input type="checkbox" v-model="calcNeedDelivery" id="isDelivery" />
        <label for="isDelivery">Нужна доставка</label>
      </div>
      <div class="delivery">
        <input type="checkbox" v-model="calcNeedMaster" id="isMaster" />
        <label for="isMaster">Нужен мастер для установки</label>
      </div>
      <div class="calculations">
        <div class="row" v-show="installProducts.length > 0">
          {{ installProducts.length }} товаров на общую сумму
          {{ totalOfRelated }}
        </div>
        <div class="row" v-show="calcNeedMaster">
          499 ₽ (стоимость найма мастера по установке)
        </div>
        <div class="row" v-show="calcNeedDelivery">
          600 ₽ (стоимость доставки)
        </div>
      </div>
      <div class="divider"></div>
      <span class="calc-total"
        >Итого: {{ parseFloat(totalInstall).toFixed(0) }} ₽</span
      >
    </div>
    <div class="product-reviews">
      <div class="reviews-header">
        Отзывы <span>{{ reviews.length }}</span>
      </div>
      <div class="reviews-list">
        <div class="my-review-form">
          <textarea
            class="my-review-body"
            v-model="review.body"
            :placeholder="`Оставьте свой отзыв о товаре ${product.name}`"
          ></textarea>
          <div class="my-review-controls">
            <button class="button button-primary button-large">
              <span class="button-label" @click="sendReview()"
                >Оставить отзыв</span
              >
            </button>
          </div>
        </div>
        <div class="review" v-for="review in reviews" :key="review.id">
          <div class="review-header">
            <span>{{ review.create_date }}</span
            ><span>Оценка: {{ review.rating }}</span>
          </div>
          <span class="review-body">{{ review.body }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Product",
  data: () => {
    return {
      product: {},
      related: [],
      reviews: [],
      installProducts: [],
      stock: {
        store: 0,
        warehouses: 0,
      },
      calcNeedDelivery: false,
      calcNeedMaster: false,
      review: {
        body: "",
        create_date: new Date(),
        customer_id: 1,
      },
    };
  },
  methods: {
    getProduct(id) {
      fetch("https://santechnika-aqua45.ru/web/api/products/view?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          this.product = data[0];
          this.getRelated();
          this.getReviews(data[0].id);
          document.title = data[0].name;
        });
    },
    getStockStores(id) {
      fetch("https://santechnika-aqua45.ru/web/api/stock/store?id=" + id)
        .then((res) => res.json())
        .then((data) => (this.stock.store = data[0].quantity));
    },
    getStock(id) {
      fetch("https://santechnika-aqua45.ru/web/api/stock/warehouses?id=" + id)
        .then((res) => res.json())
        .then((data) => (this.stock.warehouses = data[0].quantity));
    },
    getRelated() {
      const string = this.product.related_products;
      fetch(
        "https://santechnika-aqua45.ru/web/api/products/related?ids=" + string
      )
        .then((res) => res.json())
        .then((data) => {
          this.related = data;
          this.installProducts = [...data];
        });
    },
    getReviews(id) {
      fetch("https://santechnika-aqua45.ru/web/api/reviews/view?product=" + id)
        .then((res) => res.json())
        .then((data) => (this.reviews = data));
    },
    addToInstall(product) {
      this.installProducts.push(product);
      console.log(this.installProducts, this.related);
    },
    removeFromInstall(product) {
      const index = this.installProducts.indexOf(product);
      if (index > -1) {
        this.installProducts.splice(index, 1);
        console.log(this.installProducts, this.related);
      }
    },
    getUserById() {},
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    sendReview() {
      fetch("https://santechnika-aqua45.ru/web/api/reviews/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: this.review.body,
          create_date: this.review.create_date,
          customer_id: this.review.customer_id,
          product_id: this.product.id,
          rating: 5,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (this.product) {
            this.getReviews(this.product.id);
          }
        });
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
  computed: {
    totalOfRelated() {
      let total = 0;

      this.installProducts.map((item) => {
        total += item.price;
      });

      return parseFloat(total).toFixed(2);
    },
    totalInstall() {
      const deliveryCost = 600;
      const masterCost = 499;
      const relatedTotal = this.totalOfRelated;

      if (relatedTotal != 0 && this.calcNeedDelivery) {
        return Number(deliveryCost) + Number(masterCost) + Number(relatedTotal);
      }
      if (relatedTotal != 0 && !this.calcNeedMaster && this.calcNeedDelivery) {
        return Number(deliveryCost) + Number(relatedTotal);
      }
      if (relatedTotal != 0 && !this.calcNeedMaster && !this.calcNeedDelivery) {
        return Number(relatedTotal);
      }
      if (relatedTotal != 0 && !this.calcNeedDelivery) {
        return Number(masterCost) + Number(relatedTotal);
      }
      if (relatedTotal == 0 && this.calcNeedDelivery) {
        return Number(deliveryCost) + Number(masterCost);
      }
      if (relatedTotal == 0 && this.calcNeedDelivery && !this.calcNeedMaster) {
        return Number(deliveryCost);
      }
      if (relatedTotal == 0 && !this.calcNeedDelivery && this.calcNeedMaster) {
        return Number(masterCost);
      }
      if (relatedTotal == 0 && !this.calcNeedDelivery && !this.calcNeedMaster) {
        return Number(0);
      }
      return Number(masterCost);
    },
  },
  mounted() {
    const query = this.$router.history.current.query;
    if (query.id) {
      this.getProduct(query.id);
      this.getStockStores(query.id);
      this.getStock(query.id);
    }
  },
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  min-height: 90vh;
  border-radius: 16px;
  padding: 32px;
  @media screen and (max-width: 1000px) {
    padding: 8px;
  }
}

.installation {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 30%;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  background-color: #ebebeb;
  padding: 32px;
  border-radius: 16px;
  margin: 32px 0;

  .delivery {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    cursor: pointer;

    input {
      margin-right: 8px;
    }
  }

  .calculations {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 24px;
    width: 100%;
    flex-direction: column;

    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 16px;
    }
  }

  .divider {
    height: 4px;
    width: 60%;
    background-color: #000;
    margin: 16px 0;
    border-radius: 16px;
  }

  .calc-total {
    font-size: 32px;
    font-weight: 700;
  }
}

.reviews-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 64px;

  .review {
    background-color: #fff;
    box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
    width: 100%;
    border-radius: 4px;
    padding: 16px 32px;
    margin-bottom: 16px;

    &-header {
      margin-bottom: 16px;

      span {
        margin-right: 16px;
      }
    }

    &-body {
      font-size: 24px;
    }
  }

  .my-review-form {
    background-color: #fff;
    box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
    width: 100%;
    border-radius: 4px;
    padding: 16px 32px;
    margin-bottom: 64px;

    .my-review-body {
      width: 100%;
      resize: none;
      border: none;
      border-radius: 8px;
      background-color: #ebebeb;
      padding: 16px;
      outline: none;
      margin-bottom: 32px;
    }

    .my-review-controls {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

.product-main {
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  margin-bottom: 64px;
}

.related-products {
  display: flex;
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cecece;
    height: 8px;
    border-radius: 50px;
  }
}

.mini-card {
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 4px;
  flex: 2;
  padding: 16px 32px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  margin-bottom: 16px;
  margin-right: 32px;
  position: relative;

  .alreadyHave {
    position: absolute;
    left: 5px;
    top: 5px;
    padding: 8px;
    border-radius: 8px;
    border: none;
    outline: none;
    cursor: pointer;

    &.unactive {
      background-color: #ebebeb;
    }

    &.active {
      background-color: #24daac;
    }
  }

  .card-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 16px;
    height: 100%;

    .info-title {
      font-weight: 500;
    }

    .info-price {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 8px 16px;
      border-radius: 8px;
      background-color: #ebebeb;
      width: 100%;

      .price {
        margin-right: 16px;
        font-weight: 500;
        white-space: nowrap;
      }
    }
  }

  .card-image {
    width: 128px;
    height: 128px;
  }
}

.product-info-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  width: 100%;

  .left {
    width: 50%;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }

  .right {
    width: 30%;
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
    margin-right: 16px;

    .availability {
      display: flex;
      background-color: #ebebeb;
      border-radius: 4px;
      padding: 32px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;

      .store {
        width: 100%;
        background-color: #fff;
        padding: 16px 32px;
        margin-bottom: 16px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-weight: 500;
        }
      }

      .warehouse {
        width: 100%;
        background-color: #fff;
        padding: 16px 32px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-weight: 500;
        }
      }
    }
  }
}

.product-reviews {
  width: 100%;
}

.reviews-header {
  font-weight: 800;
  font-size: 28px;
  margin-top: 64px;
}

.description-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  @media screen and (max-width: 1000px) {
    font-size: 18px;
    margin-top: 16px;
  }
}

.reviews-header span {
  padding: 8px 16px;
  background-color: #216ad6;
  color: #fff;
  border-radius: 8px;
}

.product-info {
  width: 70%;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 16px;
  }
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  padding: 32px;
}

.product-description {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  @media screen and (max-width: 1000px) {
    font-size: 16px;
    line-height: 16px;
  }
}

.product-price {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 8px;
  background-color: #ebebeb;
  margin-bottom: 64px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    justify-content: space-between;
  }
}

.product-price .price {
  font-size: 34px;
  font-weight: 500;
  margin-right: 16px;
  white-space: nowrap;

  @media screen and (max-width: 1000px) {
    font-size: 24px;
  }
}

.product-price .discount {
  font-size: 34px;
  font-weight: 500;
  color: rgb(173, 47, 47);
  text-decoration: line-through;
  margin-right: 16px;
}

.product-manufacturer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}

.manufacturer-name {
  padding: 64px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
  font-weight: 800;
  font-size: 28px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.product-image {
  width: 512px;
  height: 512px;
  border-radius: 8px;
  background-color: #e6e6e6;
  margin-right: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 32px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.product-title {
  font-weight: 700;
  font-size: 34px;
  margin-bottom: 32px;
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
}
</style>
