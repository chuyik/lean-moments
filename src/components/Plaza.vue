<template>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <x-header :left-options="{showBack: !needLogin || currentUser, backText: '返回'}">
      英雄广场
      <a slot="right" @click="logOut" v-if="currentUser">注销</a>
    </x-header>
  </div>
  <div>
    <div v-for="user in users" class="weui_cells_radio weui_media_box weui_media_appmsg">
      <div class="weui_media_hd">
        <img class="weui_media_appmsg_thumb" :src="user.get('avatar').get('url')">
      </div>
      <div class="weui_media_bd">
        <h4 class="weui_media_title">{{user.get('nickname')}}</h4>
      </div>
      <div class="weui_cell_ft">
        <div class="weui_btn weui_btn_mini weui_btn_primary" v-if="!currentUser || (currentUser.id !== user.id)" @click="logIn(user)">用这个账号</div>
        <input type="radio" class="weui_check" value="1" checked v-else><span class="weui_icon_checked"></span>
      </div>
    </div>
  </div>
  <toast :show.sync="showLoginMsg">账号切换成功！</toast>
  <toast type="warn" :show.sync="showNeedLoginMsg">客官，请先选择一个账号</toast>
</template>

<script>
import AV from 'leancloud-storage'
import {XHeader, Toast} from 'vux-components'
import Statusbar from './Statusbar'

export default {
  ready () {
    setTimeout(() => {this.showNeedLoginMsg = false}, 2000)
  },
  components: {
    XHeader,
    Toast,
    Statusbar
  },
  data () {
    let needLogin = this.$route.query.needLogin
    needLogin = needLogin === 'true' || needLogin === true
    return {
      users: [],
      currentUser: AV.User.current(),
      showLoginMsg: false,
      showNeedLoginMsg: needLogin,
      needLogin
    }
  },

  route: {
    data () {
      return new AV.Query(AV.User)
              .find()
              .then(users => ({users}))
    }
  },

  methods: {
    logIn (user) {
      AV.User.logIn(user.get('username'), user.get('username'))
        .then(user => {
          this.currentUser = user
          this.showLoginMsg = true
        })
        .catch(console.error)
    },
    logOut (user) {
      AV.User.logOut()
        .then(() => {
          this.currentUser = null
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
