<template>
  <div class="wrapper">
    <div class="lines">
      <div class="line" v-for="line in $store.state.cart" :key="line.id">
        <img :src="`/products/${line.id}.jpg`" alt="" class="image" />
        <span class="name">{{ line.name }}</span>
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
    <div class="checkout">
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
        <button class="button button-primary button-large">
          <span class="button-label">Оформить заказ</span>
        </button>
        <button class="button button-secondary button-large">
          <span class="button-label">Отменить и очистить корзину</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  data: () => {
    return {
      total: 0,
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
    removeFromCart(product) {
      this.$store.commit("removeFromCart", product);
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
  }

  .total {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
  }
}

.lines {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 60%;

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

    .image {
      height: 128px;
    }

    .total {
      font-weight: 500;
      font-size: 24px;
      background-color: #ebebeb;
      padding: 16px;
      border-radius: 8px;
    }

    .quantity {
      display: flex;
      align-items: center;
      justify-content: center;

      .items {
        background-color: #ebebeb;
        padding: 16px 32px;
        margin: 0 8px;
      }

      //   .button {
      //     font-weight: 500;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     padding: 8px;
      //     width: 64px;
      //     font-size: 18px;
      //     background-color: #cecece;
      //   }
    }

    .name {
      font-weight: 500;
      font-size: 24px;
    }
  }
}
</style>
