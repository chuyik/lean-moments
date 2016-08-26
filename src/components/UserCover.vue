<template>
  <div class="user-cover">
    <div class="featured" :style="{'background-image': getImage('cover')}">
    </div>
    <div class="user-info">
      <div class="nickname" v-text="user && user.get('nickname')"></div>
      <div class="avatar" :style="{'background-image': getImage('avatar')}">
      </div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  props: {
    user: {
      type: Object,
      default: () => {AV.User.current()}
    }
  },
  methods: {
    getImage (key) {
      if (this.user)
        return `url(${this.user.get(key).get('url')})`
    }
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
    right: 1.2rem;
    bottom: -2.3rem;
    z-index: 10;

    > .nickname {
      font-weight: bold;
      font-size: 1.8rem;
      color: #FFFFFF;
      text-shadow: 0px 1px 0px rgba(0,0,0,0.70);
      position: absolute;
      top: 1rem;
      right: 8rem;
      text-align: right;
      width: 100px;
    }

    > .avatar {
      width: 7rem;
      height: 7rem;
      background-color: #505050;
      background-size: cover;
      border: 2px solid #FFF;
      box-shadow: 0 0 0 1px #C7C7C7;
    }
  }
</style>
