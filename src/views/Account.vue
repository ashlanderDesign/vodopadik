<template>
  <div class="wrapper">
    <div
      class="login-form"
      v-show="type === 'login' && !$store.state.user.isLogged"
    >
      <span class="title">Авторизуйтесь</span>
      <input v-model="login.username" type="text" placeholder="Логин" />
      <input v-model="login.password" type="password" placeholder="Пароль" />
      <div class="remember-me">
        <input type="checkbox" id="remember" />
        <label for="remember">Запомнить</label>
      </div>
      <button
        class="button button-block button-primary button-large"
        @click="auth()"
      >
        <span class="button-label">Войти</span>
      </button>
      <button
        class="button button-block button-secondary button-large"
        @click="type = 'register'"
      >
        <span class="button-label">Регистрация</span>
      </button>
    </div>
    <div
      class="login-form"
      v-show="type === 'register' && !$store.state.user.isLogged"
    >
      <span class="title">Зарегистрироваться</span>
      <input v-model="register.username" type="text" placeholder="Логин" />
      <input v-model="register.password" type="password" placeholder="Пароль" />
      <input
        v-model="register.rePassword"
        type="password"
        placeholder="Повторите пароль"
      />
      <input type="email" placeholder="Электронная почта" />
      <button
        class="button button-block button-primary button-large"
        @click="create()"
      >
        <span class="button-label">Создать аккаунт</span>
      </button>
      <button
        class="button button-block button-secondary button-large"
        @click="type = 'login'"
      >
        <span class="button-label">Уже есть аккаунт</span>
      </button>
    </div>
    <div class="account" v-show="$store.state.user.isLogged">
      <div class="header">
        <span class="user">{{ $store.state.user.username }}</span>
        <div class="header-controlls">
          <button
            :disabled="isEditing"
            class="button button-large button-primary"
            @click="edit()"
          >
            <span class="button-label">Редактировать</span>
          </button>
          <button class="button button-large button-primary" @click="logout()">
            <span class="button-label">Выйти</span>
          </button>
        </div>
      </div>
      <h1>Общая информация:</h1>
      <div class="info">
        <div class="inputs" v-show="isEditing">
          <input
            type="text"
            :default="userData.surname"
            v-model="user.surname"
            placeholder="Фамилия"
          />
          <input
            :default="userData.name"
            v-model="user.name"
            type="text"
            placeholder="Имя"
          />
          <input
            type="text"
            :default="userData.phone"
            v-model="user.phone"
            placeholder="Телефон"
          />
          <button class="button button-large button-primary" @click="save()">
            <span class="button-label">Сохранить</span>
          </button>
        </div>
        <div class="text" v-show="!isEditing">
          <div class="row">
            <span class="title">Имя</span
            ><span class="value">{{
              $store.state.user.name || "Не указано"
            }}</span>
          </div>
          <div class="row">
            <span class="title">Фамилия</span
            ><span class="value">{{
              $store.state.user.surname || "Не указано"
            }}</span>
          </div>
          <div class="row">
            <span class="title">Телефон</span
            ><span class="value">{{
              $store.state.user.phone || "Не указано"
            }}</span>
          </div>
        </div>
      </div>
      <h1>Заказы:</h1>
      <div class="orders">
        <div class="order" v-for="order in userOrders" :key="order.id">
          <div class="order-id">#{{ order.id }}</div>
          <span class="order-state">{{ order.state.name }}</span>
          <span class="order-date">{{ order.shipping_date }}</span>
        </div>
      </div>
    </div>
    <div class="message" v-show="isError">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  name: "Account",
  data: () => {
    return {
      isLogged: false,
      type: "login",
      isError: false,
      isEditing: false,
      errorMessage: "",
      userOrders: [],
      user: {
        name: null,
        surname: null,
        phone: null,
      },
      login: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        password: "",
        rePassword: "",
      },
    };
  },
  computed: {
    userData() {
      return {
        name: this.$store.state.user.name,
        surname: this.$store.state.user.surname,
        phone: this.$store.state.user.phone,
      };
    },
  },
  methods: {
    edit() {
      this.isEditing = true;
    },
    save() {
      fetch("https://santechnika-aqua45.ru/web/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...this.user,
          token: this.$store.state.user.token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            this.$store.commit("edit", {
              name: this.user.name,
              surname: this.user.surname,
              phone: this.user.phone,
            });
            this.isEditing = false;
          } else {
            this.throwError(data.error);
          }
        });
    },
    auth() {
      fetch("https://santechnika-aqua45.ru/web/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.login.username,
          password: this.login.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            this.$store.commit("auth", {
              username: this.login.username,
              token: data.token,
              id: data.id,
              name: data.name,
              surname: data.surname,
              phone: data.phone,
            });
            this.user = {
              name: data.name,
              surname: data.surname,
              phone: data.phone,
            };
            this.getUserOrders(data.id);
          } else {
            this.throwError(data.error);
          }
        });
    },
    getUserOrders(id) {
      fetch("https://santechnika-aqua45.ru/web/api/order/by-user?id=" + id)
        .then((res) => res.json())
        .then((data) => {
          this.userOrders = data;
        });
    },
    logout() {
      this.$store.commit("logout");
    },
    throwError(message) {
      this.isError = true;
      this.errorMessage = message;
      setTimeout(() => {
        this.isError = false;
      }, 2500);
    },
    create() {
      console.log(this.register);
      fetch("https://santechnika-aqua45.ru/web/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.register.username,
          password: this.register.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            this.$store.commit("auth", {
              username: this.register.username,
              token: data.token,
              id: data.id,
            });
          } else {
            this.throwError(data.error);
          }
        });
    },
  },
  mounted() {
    if (this.$store.state.user.isLogged) {
      this.getUserOrders(this.$store.state.user.id);
      this.user = {
        name: this.$store.state.user.name,
        surname: this.$store.state.user.surname,
        phone: this.$store.state.user.phone,
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 90vh;
  display: flex;
  padding: 32px 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.header-controlls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.message {
  background-color: rgb(212, 59, 59);
  color: #fff;
  padding: 8px 32px;
  border-radius: 8px;
  margin-top: 32px;
}

.account {
  width: 80%;
  height: 80vh;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  padding: 32px;

  .orders {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;

    .order {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;

      &:nth-child(2n) {
        background-color: #ebebeb;
      }
    }
  }

  .inputs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 0;

    input {
      background-color: #ebebeb;
      padding: 16px;
      border-radius: 8px;
      border: none;
      outline: none;
      margin: 0px 16px;
    }
  }

  .text {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    flex-direction: column;

    .row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;

      .title {
        font-weight: 700;
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;

    .user {
      font-weight: 500;
      font-size: 24px;
    }
  }
}

.login-form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.14);
  padding: 32px;

  .remember-me {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 16px;

    input {
      margin: 0;
      width: auto;
      margin-right: 16px;
    }
  }

  .title {
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 64px;
  }

  input {
    width: 100%;
    font-size: 18px;
    background-color: #ebebeb;
    border-radius: 8px;
    padding: 8px 16px;
    border: none;
    outline: none;
    margin-bottom: 16px;
  }

  button {
    margin-bottom: 8px;
  }
}
</style>
