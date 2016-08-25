<template>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <x-header :left-options="{showBack: !needLogin || currentUser, backText: '返回'}">
      英雄广场
      <a slot="right" @click="logOut" v-if="currentUser">注销</a>
    </x-header>
  </div>
  <div class="view-contents">
    <div v-for="user in users" track-by="id" class="weui_cells_radio weui_media_box weui_media_appmsg">
      <div class="weui_media_hd">
        <img class="weui_media_appmsg_thumb" :src="user.get('avatar').get('url')">
      </div>
      <div class="weui_media_bd">
        <h4 class="weui_media_title">{{user.get('nickname')}}</h4>
      </div>
      <div class="weui_cell_ft">
        <div v-if="!currentUser || (currentUser.id !== user.id)">
          <template v-if="currentUser">
            <div class="weui_btn weui_btn_mini weui_btn_primary" @click="follow(user)" v-if="followStatusTree[user.id] === 'no'">关注他/她</div>
            <div class="weui_btn weui_btn_mini weui_btn_plain_default" @click="unfollow(user)" v-if="followStatusTree[user.id] === 'isFollowee'">已关注</div>
            <div class="weui_btn weui_btn_mini weui_btn_primary" @click="follow(user)" v-if="followStatusTree[user.id] === 'isFollower'">已被关注</div>
            <div class="weui_btn weui_btn_mini weui_btn_plain_default" @click="unfollow(user)" v-if="followStatusTree[user.id] === 'isBoth'">已互相关注</div>
          </template>
          <div class="weui_btn weui_btn_mini weui_btn_primary" @click="logIn(user)">用这个账号</div>
        </div>
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
      needLogin,
      followees: [],
      followers: [],
      followStatusTree: {}
    }
  },

  route: {
    data () {
      return Promise.all([
        new AV.Query(AV.User).find(),
        this.currentUser.followeeQuery().find(), 
        this.currentUser.followerQuery().find()
      ])
      .then(([users, followees, followers]) => ({users, followees, followers}))
    }
  },

  watch: {
    users () {
      this.buildFollowStatusTree()
    },
    currentUser () {
      Promise.all([
        this.currentUser.followeeQuery().find(), 
        this.currentUser.followerQuery().find()
      ])
      .then(([followees, followers]) => {
        this.followees = followees
        this.followers = followers
        this.buildFollowStatusTree()
      })
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
    },
    follow (user) {
      AV.User.current()
        .follow(user)
        .then(() => {
          let status = this.followStatusTree[user.id]
          this.followStatusTree = Object.assign({}, this.followStatusTree, {[user.id]: status === 'isBoth' || status === 'isFollower' ? 'isBoth' : 'isFollowee'})
        })
        .catch(console.error)
    },
    unfollow (user) {
      AV.User.current()
        .unfollow(user)
        .then(() => {
          let status = this.followStatusTree[user.id]
          this.followStatusTree = Object.assign({}, this.followStatusTree, {[user.id]: status === 'no' || status === 'isFollowee' ? 'no' : 'isFollower'})
        })
        .catch(console.error)
    },
    getFollowStatus (user) {
      let isFollowee, isFollower 
      this.followees.forEach(followee => {
        if (user.id === followee.id)
          isFollowee = true
      })
      this.followers.forEach(follower => {
        if (user.id === follower.id)
          isFollower = true
      })
      return {id: user.id, status: isFollowee && isFollower ? 'isBoth' : (isFollowee ? 'isFollowee' : (isFollower ? 'isFollower' : 'no'))}
    },
    buildFollowStatusTree () {
      let tree = {}
      this.users.forEach(user => {
        let {id, status} = this.getFollowStatus(user)
        tree[id] = status
      })
      this.followStatusTree = Object.assign({}, this.followStatusTree, tree)
      return tree
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
