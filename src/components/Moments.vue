<template>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <Navbar></Navbar>
  </div>
  <div class="moments-content">
    <user-cover :nickname="'腾奕'"></user-cover>
    <status-list></status-list>
  </div>
  
</template>

<script>
import {XHeader, Actionsheet, Toast} from 'vux-components'
import Statusbar from './Statusbar'
import Navbar from './MomentsNavbar'
import UserCover from './UserCover'
import StatusList from './StatusList'

export default {
  components: {
    Statusbar,
    Navbar,
    XHeader,
    Actionsheet,
    Toast,
    UserCover,
    StatusList
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
  .fixed-header {
    position: fixed;
    z-index: 1;
  }
  .moments-content {
    padding-top: 6.6rem;
  }
</style>
