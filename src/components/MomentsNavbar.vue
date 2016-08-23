<template>
  <div class="moments-header">
    <x-header :left-options="{showBack: false}">
      朋友圈
      <a slot="left" v-link="{ path: '/view/plaza' }">
        <img class="retina" src="../assets/people@2x.png">
      </a>
      <a slot="right" @click="showCameraMenu=!showCameraMenu">
        <img class="camera retina" src="../assets/camera@2x.png">
      </a>
    </x-header>
    <actionsheet :show.sync="showCameraMenu" :menus="cameraMenus" @on-click-menu="clickCameraMenu" show-cancel :cancel-text="'取消'"></actionsheet>
    <toast type="cancel" :show.sync="showShootMsg">选第二个，泻泻~</toast>
  </div>
</template>

<script>
import {XHeader, Actionsheet, Toast} from 'vux-components'

export default {
  components: {
    XHeader,
    Actionsheet,
    Toast
  },
  data () {
    return {
      showCameraMenu: false,
      showShootMsg: false,
      cameraMenus: {
        shoot: '拍照',
        album: '从相册中选择'
      }
    }
  },
  methods: {
    clickCameraMenu (key) {
      switch (key) {
        case 'shoot':
          this.showShootMsg = true
          break
        case 'album':
          console.log('prepare to move to album')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .moments-header {
    width: 100%;
  }
  img.camera {
    float: right
  }
</style>