<template>
  <div class="status-item clearfix">
    <div class="left"><div class="avatar"></div></div>

    <div class="right">
      <div class="nickname">。歌儿</div>
      <div class="content">祝师弟</div>
      <div class="images"></div>

      <div class="footer clearfix">
        <div class="time-ago">3分钟前</div>
        <div class="reply-btn" @click="showTooltip=!showTooltip"><img src="../assets/reply@2x.png" class="retina"></div>
      </div>
      
      <div class="reply-tooltip" v-show="showTooltip" transition="expand">
        <div class="left" @click="likeStatus">
          <div class="content">
            <img src="../assets/like@2x.png" style="width: 1.5rem" class="retina"> 赞
          </div>
        </div>
        <div class="right" @click="commentStatus">
          <div class="content">
            <img src="../assets/comment@2x.png" style="width: 1.3rem" class="retina"> 评论
          </div>
        </div>
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
      showTooltip: false
    }
  },
  methods: {
    likeStatus () {
      this.showTooltip = false
    },
    commentStatus () {
      this.showTooltip = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .status-item {
    padding: 1.5rem 1.2rem 1rem;
    border-top: 0.05rem solid #E1E1E1;

    > .left {
      float: left;
      width: 6rem;
    }
    > .right {
      float: left;
      width: calc(100% - 6rem);
      position: relative;
    }
  }

  .avatar {
    width: 4.2rem;
    height: 4.2rem;
    background: #D8D8D8;
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
    cursor: pointer;
    img {
      width: 1.9rem;
      margin-top: 0.3rem;
    }
  }
  .reply-tooltip {
    width: 18rem;
    height: 3.9rem;
    background: #4D5154;
    border-radius: .4rem;
    display: flex;

    position: absolute;
    right: 30px;
    bottom: -5px;

    .content {
      font-family: PingFangSC-Regular;
      font-size: 1.4rem;
      color: #FFFFFF;
    }

    > * {
      flex: 1;
      text-align: center;
      height: 100%;
      line-height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    > .left {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        width: .1rem;
        height: 2.2rem;
        background: #45484D;
        right: 1px;
      }
    }

    img {position: relative; top: .2rem;}
  }

  .expand-transition {
    transition: all .2s ease;
    overflow: hidden;
  }

  .expand-enter, .expand-leave {
    width: 0;
    opacity: 0;
  }
</style>
