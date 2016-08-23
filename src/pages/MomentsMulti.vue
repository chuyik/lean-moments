<template>
  <div class="container">
    <div class="views">
      <div class="view">
        <iframe src="/view/moments" frameborder="0"></iframe>
      </div>
      <div class="view">
        <iframe src="/view/moments" frameborder="0"></iframe>
      </div>
      <div class="view">
        <iframe src="/view/moments" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .views {
    display: flex;
    align-items: center;
    justify-content: center;

    > .view {
      width: 375px;
      height: 677px;
      border: 1px solid red;

      > iframe {
        width: 100%;
        height:100%;
      }
    } 
  }
</style>