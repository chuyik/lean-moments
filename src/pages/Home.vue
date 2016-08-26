<template>
  <div class="container">
    <a v-link="{ path: '/moments' }">朋友圈</a>
    <a v-link="{ path: '/multi-moments' }">三个朋友圈</a>

    <div class="qrcode-msg">或者手机扫码访问</div>
    <div id="qrcode" v-el:qrcode></div>
  </div>
</template>

<script>
import QRCode from '../third_party/qrcode'
export default {
  ready () {
    new QRCode(this.$els.qrcode, {
      text: document.location.href + 'view/moments', 
      width: 128,
      height: 128
    })
  }

}
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
  
  .qrcode-msg {
    margin: 80px 0 10px;
    font-size: 1.4rem;
    color: #333;
  }
  #qrcode {
  }
</style>