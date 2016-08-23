<template>
  <div id="status-bar">
    <img src="../assets/status-bar.png" alt="">
  </div>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    #status-bar {
      z-index: 1;
      height: 2rem;
      > img {
          width: 100%;
          vertical-align: middle;
      }
    }
</style>
