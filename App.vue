<template>
  <div id="app">
    <Header></Header>
    
    <template v-if="isAuthenticated">
      <router-link to="/" class="nav-item" active-class="active" exact>Diary</router-link>
      <span class="nav-item" @click="logout">Logout</span>
    </template>

    <template v-if="!isAuthenticated">
      <router-link to="/login" class="nav-item" active-class="active">Login</router-link>
      <router-link to="/register" class="nav-item" active-class="active">Register</router-link>
    </template>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from './views/Header.vue';
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null ;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  },
  components: {
    Header,
  },
}
</script>

<style scoped>
  .nav-item {
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    color: #000;
  }
  .active {
    border-bottom: 1px solid rgb(255, 40, 105);
    color:rgb(255, 40, 105);
  }
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 130px;
}

.contents {
    margin-top: 30px;
  }

  h2 {
    color: rgb(255, 40, 105);
    font-size: 2em;
    margin-bottom: 30px;
  }
  .textarea {
    border: 1px solid rgb(255, 40, 105);
    padding: 5px;
  }

  button {
    border: 1px solid rgb(255, 40, 105);
    background-color: rgb(255, 40, 105);
    color: #fff;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.404);
    padding: 7px;
    transition: all .3s;
  }

  button:hover {
    background-color: #fff;
    color: rgb(255, 40, 105);
    transform: translate(3px, 3px);
    box-shadow: none;
  }
</style>
