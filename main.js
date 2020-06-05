import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store'

Vue.config.productionTip = false;

axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/ourdiary-62da1/databases/(default)/documents';

const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const interceptorsResponse = axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.request.eject(interceptorsResponse);

store.dispatch('autoLogin');
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
