<template>
  <div id="app">
    <div class="header-row">
      <img src="./assets/battime-logo.jpg">
      <h1>Батайское время - Административная панель</h1>
    </div>
    <div v-if="isLogged" class="menu-wrapper">
      <links-menu />
    </div>
    <router-view/>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Menu from './components/menu';
import auth from './helpers/auth';

export default {
  components: {
    'links-menu': Menu
  },
  computed: {
    isLogged() {
      return auth.checkIsAuth();
    }
  },
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.header-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  margin-bottom: 50px;
}
.header-row > img {
  width: 150px;
}

.menu-wrapper {
  margin-bottom: 15px;
}

.form {
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 15px;
}
.form label {
  margin-bottom: 10px;
  font-weight: bold;
}
.form .form-row {
  padding-top: 10px;
  padding-bottom: 10px;
}
.left-oriented {
  text-align: left;
}
.error-message {
  color: red;
  font-size: 13px;
}
</style>
