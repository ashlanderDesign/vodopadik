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
    cart: [{"id":2,"name":"Круг отрезной по металлу Д14А 115х2, 5х22 ","unit":"5","description":"Круги отрезные по металлу можно использовать для резки метериалов из стали, цветных металлов и их сплавов.","price":31.77,"category_id":22,"image":"2.jpg","related_products":null,"quantity":6},{"id":3,"name":"Круг отрезной по металлу Д14А 115х2х22 ","unit":"4","description":"Круги отрезные по металлу можно использовать для резки метериалов из стали, цветных металлов и их сплавов.","price":30.59,"category_id":22,"image":"3.jpg","related_products":null,"quantity":5},{"id":4,"name":"Круг отрезной по металлу Д14А 125х2, 5х22 ","unit":"3","description":"Круги отрезные по металлу можно использовать для резки метериалов из стали, цветных металлов и их сплавов.","price":20.15,"category_id":22,"image":"4.jpg","related_products":null,"quantity":1},{"id":1,"name":"Круг отрезной по металлу Д14А 115х1х22 ","unit":"7","description":"Круги отрезные по металлу можно использовать для резки метериалов из стали, цветных металлов и их сплавов.","price":24.11,"category_id":22,"image":"1.jpg","related_products":null,"quantity":1}]
  },
  mutations: {
    setCategories(context, payload) {
      context.categories = payload;
    },
    clearCart(context) {
      context.cart = []
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
    },
    logout(context) {
      context.user = {
        isLogged: false,
        username: null,
        token: null
      }
    },
    removeFromCart(context, payload) {
      let index = context.cart.indexOf(payload);
      if(payload.quantity > 1) {
        context.cart[index].quantity -= 1;
      } else {
        context.cart.splice(index, 1);
      }
    },
    addToCart(context, payload) {
      const filtered = context.cart.filter((x) => x.id === payload.id);
      console.log(filtered, payload)
      if(filtered.length === 0) {
        context.cart.push({...payload, quantity: 1})
      } else {
        const index = context.cart.indexOf(filtered[0]);
        context.cart[index].quantity += 1
      }
    }
  },
  actions: {},
  modules: {},
});
