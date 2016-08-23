<template>
  <div class="user-cover">
    <div class="featured"></div>
    <div class="user-info">
      <div class="nickname" v-text="nickname"></div>
      <div class="avatar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nickname: String
  }
}
</script>

<style lang="scss" scoped>
  .user-cover {
    position: relative;
  }

  .featured {
    background: #C4C4C4;
    height: 25.5rem;
    width: 100%;
  }
  
  .user-info {
    position: absolute;
    right: 1rem;
    bottom: -2.3rem;

    > .nickname {
      font-weight: bold;
      font-size: 1.8rem;
      color: #FFFFFF;
      text-shadow: 0px 1px 0px rgba(0,0,0,0.70);
      position: absolute;
      left: -5.5rem;
      top: 1rem;
    }

    > .avatar {
      width: 7rem;
      height: 7rem;
      background: #505050;
      border: 3px solid #FFF;
      box-shadow: 0 0 0 1px #C7C7C7;
    }
  }
</style>
