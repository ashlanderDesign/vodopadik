<template>
  <div class="wrapper">
    <div class="notification" v-show="isDone">
      Ваш заказ был передан в оформление
    </div>
    <div class="emptyCart" v-if="$store.state.cart.length == 0">
      <span class="nothing"> Ваша корзина пуста:( </span>
      <button
        class="button button-large button-primary"
        @click="$router.push('/')"
      >
        <span class="button-label">Перейти в каталог</span>
      </button>
    </div>
    <div class="lines" v-if="$store.state.cart.length > 0">
      <div class="line" v-for="line in $store.state.cart" :key="line.id">
        <img :src="`/products/${line.id}.jpg`" alt="" class="image" />
        <router-link :to="`/product?id=${line.id}`" class="name">{{
          line.name
        }}</router-link>
        <span class="total"
          >{{
            parseFloat(Number(line.price) * line.quantity).toFixed(2)
          }}
          ₽</span
        >
        <div class="quantity">
          <span
            class="button button-primary button-large"
            @click="removeFromCart(line)"
            >-</span
          >
          <span class="items">{{ line.quantity }}</span>
          <span
            class="button button-primary button-large"
            @click="addToCart(line)"
            >+</span
          >
        </div>
      </div>
    </div>
    <div class="checkout" v-if="$store.state.cart.length > 0">
      <div class="row title">Оформление заказа</div>
      <div class="row total">
        <span>Сумма заказа:</span>
        <span>{{ orderTotal }} ₽</span>
      </div>
      <div class="row phone">
        <input type="tel" placeholder="Ваш номер телефона" />
      </div>
      <div class="row name">
        <input type="text" placeholder="Ваше имя" />
      </div>
      <div class="row email">
        <input type="text" placeholder="Ваш email" />
      </div>
      <div class="row controls">
        <button class="button button-primary button-large" @click="done()">
          <span class="button-label">Оплатить и оформить заказ</span>
        </button>
        <button class="button button-secondary button-large" @click="clear()">
          <span class="button-label">Отменить и очистить корзину</span>
        </button>
      </div>
      <span class="row reminder"
        >Мы принимаем только предоплату. Перед созданием заказа Вы будете
        переадресованы на страницу платежной системы</span
      >
      <span class="row reminder"
        >Стоимость доставки - 600 ₽. Для оформления доставки Вам позвонит Ваш
        персональный менеджер и уточнит все детали</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: () => {
    return {
      total: 0,
      isDone: false,
    };
  },
  computed: {
    orderTotal() {
      let price = 0;
      this.$store.state.cart.forEach((item) => {
        price += Number(item.price) * item.quantity;
      });
      return parseFloat(price).toFixed(2);
    },
  },
  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    done() {
      this.isDone = true;
      setTimeout(() => {
        this.isDone = false;
      }, 2500);
    },
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
    },
    clear() {
      this.$store.commit("clearCart");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 40px 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: 80vh;
  position: relative;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    margin: 16px 8px;
  }
}

.reminder {
  font-family: monospace;
  color: rgb(80, 80, 80);
  font-size: 18px;
}

.emptyCart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.notification {
  position: fixed;
  bottom: 64px;
  right: 64px;
  background-color: #2075f5;
  border-radius: 16px;
  color: #fff;
  padding: 32px;
}

.checkout {
  width: 38%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
  padding: 32px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  @media screen and (max-width: 1000px) {
    width: 100%;
    padding: 16px;
  }

  .row {
    width: 100%;
    margin-bottom: 16px;

    input {
      width: 100%;
      background-color: #ebebeb;
      padding: 16px;
      border: none;
      border-radius: 8px;
      outline: none;
      font-size: 18px;
    }
  }

  .title {
    font-weight: 700;
    font-size: 28px;
  }
  .controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    width: 100%;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
    }
  }

  .total {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
  }
}

.nothing {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 32px;
}

.lines {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  width: 60%;
  min-height: 30vh;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 16px;
    padding: 16px 32px;
    width: 100%;
    box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);

    @media screen and (max-width: 1000px) {
      padding: 8px;
      flex-wrap: wrap;
    }

    .image {
      height: 128px;
      @media screen and (max-width: 1000px) {
        height: 64px;
      }
    }

    .total {
      font-weight: 500;
      font-size: 24px;
      background-color: #ebebeb;
      padding: 12px 16px;
      border-radius: 8px;
      white-space: nowrap;
      margin-right: 16px;
      @media screen and (max-width: 1000px) {
        font-size: 16px;
      }
    }

    .quantity {
      display: flex;
      align-items: center;
      justify-content: center;

      .button {
        @media screen and (max-width: 1000px) {
          padding: 8px 16px !important;
        }
      }

      .items {
        background-color: #ebebeb;
        padding: 16px 32px;
        margin: 0 8px;
        @media screen and (max-width: 1000px) {
          padding: 8px 16px;
        }
      }
    }

    .name {
      font-weight: 500;
      font-size: 24px;
      padding: 0 16px;
      color: #000;
      text-decoration: none;
      @media screen and (max-width: 1000px) {
        font-size: 14px;
        padding: 0px 8px;
      }

      &:hover {
        color: #2075f5;
      }
    }
  }
}
</style>
