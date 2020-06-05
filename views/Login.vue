<template>
  <div class="login">
    <div class= "contents">
      <h2>Login</h2>
      <div>
          <label for="email">Email</label>
          <br>
          <input class="textarea" id="email" type="email" v-model="email">
      </div>
      <br>
      <div>
        <label for="password">Password</label>
        <br>
        <input class="textarea" id="password" type="password" v-model="password">
        <br>
        <button @click="login">Login</button>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>

import Footer from './Footer.vue';
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  components: {
    Footer,
  },
  methods: {
      login() {
        this.$store.dispatch('login', {
            email: this.email,
            password: this.password
        })
        this.email = '';
        this.password = '';
      }
  }
  
};
</script>

<style scoped>

  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  button {
    
    margin-top: 40px;
  }
  
</style>

