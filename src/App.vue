<template>
  <div id="app" :key="isToken">
    <router-link to="/"> Index Page </router-link>
    <div v-if="!isToken">
      <router-link to="/login"> Login Page </router-link>
      <router-link to="/register"> Register Page </router-link>
    </div>
    <div v-else>
      <Logout/>
      <router-link to="/channel/create">Create channel</router-link>
    </div>
    <hr>
    <router-view/>
    token: {{ isToken }}
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
        isToken: this.$cookies.isKey('session'),
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
