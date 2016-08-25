<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 62.5%;
}

body {
  height: 100%;
  /*overflow: hidden;*/
  margin: 0;
  font-size: 14px;
  font-size: 1.4rem;
  -webkit-font-smoothing: antialiased;
}

.clearfix:after {
  content:"";
  display:block;
  clear:both;
}

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.fixed-header {
  position: fixed;
  z-index: 100;
}

.view-contents {
  padding-top: 6.6rem;
}

#app {
  font-family: Helvetica, sans-serif;
}

#app a {
  text-decoration: none;
}

.stop-scrolling {
  height: 100%;
  overflow: hidden;
}

img.retina {
  width: 50%;
}

/* override vux styles */
div.vux-header, #status-bar {
  background: rgba(43, 42, 47, 0.95);
}

h1.vux-header-title {
  margin: auto !important;
  font-weight: 500 !important;
}

p.weui_toast_content {
  margin: 5px 5px 15px;
}

.weui_toast {
  width: 12rem !important;
}


</style>
