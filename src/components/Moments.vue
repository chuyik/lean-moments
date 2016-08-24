<template>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <Navbar></Navbar>
  </div>
  <div class="moments-content">
    <Usercover :user="currentUser"></Usercover>
    <Statuslist></Statuslist>
  </div>
  
</template>

<script>
import AV from 'leancloud-storage'

import Statusbar from './Statusbar'
import Navbar from './MomentsNavbar'
import Usercover from './UserCover'
import Statuslist from './StatusList'

export default {
  components: {
    Statusbar,
    Navbar,
    Usercover,
    Statuslist
  },
  data () {
    return {
      showCameraMenu: false,
      showShootMsg: false,
      currentUser: AV.User.current(),
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
