<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  @import 'https://use.fontawesome.com/releases/v5.3.1/css/all.css';
  @import '@/assets/css/app.scss';
  @import '@/assets/styles/custom-bootstrap.scss';
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
