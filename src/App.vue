<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
html {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #606266;
  background-image: url("https://cdn.max-c.com/heybox_web/images/20191118/app_bg.jpg");
  background-repeat: repeat !important;
}
</style>
