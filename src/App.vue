<template>
  <div id="app">
    <router-link to="/"> Index Page </router-link>
    <div v-if="!isToken">
      <router-link to="/login"> Login Page </router-link>
      <router-link to="/register"> Register Page </router-link>
    </div>
    <div v-else>
      <router-link to="/profile"> Profile </router-link>
      <Logout/>
    </div>
    <hr>
    <router-view/>
    token: {{ getToken() }}
  </div>
</template>

<script>
  import Logout from "./components/Logout";
  export default {
    name: 'App',
    components: {
      Logout,
    },
    data() {
      return {
        isToken: null,
      }
    },
    methods: {
      getToken: function () {
        this.isToken = this.$cookies.isKey('session');
        return this.isToken;
      }
    }
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
