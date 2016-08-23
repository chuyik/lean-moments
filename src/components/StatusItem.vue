<template>
  <div class="status-item clearfix">
    <div class="left"><div class="avatar"></div></div>
    <div class="right">
      <div class="nickname">。歌儿</div>
      <div class="content">祝师弟</div>
      <div class="images"></div>
      <div class="footer clearfix">
        <div class="time-ago">3分钟前</div>
        <div class="reply-btn"><img src="../assets/reply@2x.png" class="retina"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .status-item {
    padding: 1.5rem 1.2rem;
    border-top: 0.05rem solid #E1E1E1; 
  }

  .left {
    float: left;
    width: 6rem;
    
    > .avatar {
      width: 4.2rem;
      height: 4.2rem;
      background: #D8D8D8;
    }
  }
  .right {
    float: left;
    width: calc(100% - 6rem);
  }
  .nickname {
    font-family: PingFangSC-Medium;
    font-size: 1.5rem;
    color: #5273A4;
  }
  .content {
    font-family: PingFangSC-Regular;
    font-size: 1.5rem;
    color: #000000;
  }
  .time-ago {
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #707070;
    float: left;
  }
  .reply-btn {
    float: right;
    img {
      width: 1.9rem;
      margin-top: 0.3rem;
    }
  }
</style>
