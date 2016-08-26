<template>
  <div class="container">
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
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .container {
    background: #003973;
    background: linear-gradient(to left, #003973 , #E5E5BE);
    
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .view {
    background: white;
    box-shadow: 0 0 10px #616161;
    width: 375px;
    height: 677px;
    margin: 0 5px;

    > iframe {
      width: 100%;
      height:100%;
    }
  }
</style>