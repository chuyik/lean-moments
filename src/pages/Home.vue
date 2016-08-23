<template>
  <div class="container">
    <a v-link="{ path: '/moments' }">朋友圈</a>
    <a v-link="{ path: '/multi-moments' }">多个朋友圈</a>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

a {
  font-size: 3rem;
  color: #35C941;
  margin-bottom: 2rem;
  position: relative;

  &:hover:after {
    content: '';
    width: 100%;
    height: .3rem;
    background: #35C941;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>