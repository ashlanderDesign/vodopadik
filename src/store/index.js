import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    user: {
      isLogged: false,
      username: null,
      token: null,
      id: null,
      name: null,
      surname: null,
      phone: null
    },
    cart: []
  },
  mutations: {
    setCategories(context, payload) {
      context.categories = payload;
    },
    clearCart(context) {
      context.cart = []
      localStorage.removeItem('cart');
    },
    edit(context, payload) {
      context.user.name = payload.name;
      context.user.surname = payload.surname;
      context.user.phone = payload.phone;
    },
    auth(context, payload) {
      context.user.isLogged = true;
      context.user.username = payload.username;
      context.user.token = payload.token;
      context.user.id = payload.id;
      context.user.name = payload.name;
      context.user.surname = payload.surname;
      context.user.phone = payload.phone;
      localStorage.setItem('user', JSON.stringify(context.user))
    },
    logout(context) {
      context.user = {
        isLogged: false,
        username: null,
        token: null
      }
      localStorage.removeItem('user')
    },
    setUser(context, payload) {
      context.user = payload;
    },
    removeFromCart(context, payload) {
      let index = context.cart.indexOf(payload);
      if(payload.quantity > 1) {
        context.cart[index].quantity -= 1;
      } else {
        context.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(context.cart));
    },
    setCart(context, payload) {
      context.cart = payload;
    },
    addToCart(context, payload) {
      const filtered = context.cart.filter((x) => x.id === payload.id);
      console.log(filtered, payload)
      if(filtered.length === 0) {
        context.cart.push({...payload, quantity: 1, total: payload.price})
      } else {
        const index = context.cart.indexOf(filtered[0]);
        context.cart[index].quantity += 1
        context.cart[index].total = context.cart[index].quantity * context.cart[index].price
      }
      localStorage.setItem('cart', JSON.stringify(context.cart));
    }
  },
  actions: {},
  modules: {},
});
