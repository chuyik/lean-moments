<template>
  <div class="container">
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
  background-image: linear-gradient(to left, rgb(82, 82, 82), rgb(61, 114, 180));
  background-color: rgb(61, 114, 180);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
}

.view {
  background: #FFF;
  box-shadow: 0 0 10px #333;
  width: 375px;
  height: 677px;
  margin: auto;

  > iframe {
    width: 100%;
    height:100%;
  }
} 
</style>