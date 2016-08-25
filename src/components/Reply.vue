<template>
  <div class="input-wrap" v-show="show">
    <div class="blackdrop" @click.stop="show=false"></div>
    <div class="text-input" v-el:text-input>
      <input type="text" placeholder="评论" v-model="replyText">
      <div class="publish-comment-btn" :style="{opacity: replyText ? 1 : 0.5}" @click="publish">发表</div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import {Comment} from '../lib/models'

export default {
  components: {
  },
  props: {
    statusItem: Object,
    show: Boolean
  },
  watch: {
    show (val) {
      if (val) {
        document.documentElement.classList.add('stop-scrolling')
      } else {
        document.documentElement.classList.remove('stop-scrolling')
      }
    }
  },
  data () {
    return {
      replyText: ''
    }
  },
  methods: {
    publish () {
      if (!this.replyText)
        return
      
      new Comment({text: this.replyText, user: AV.User.current()})
        .save()
        .then(comment => {
          let detail = this.statusItem.data.detail
          let comments = detail.get('comments')
          if (!comments)
            detail.set('comments', [])
          detail.addUnique('comments', comment)
          return detail.save()
        })
        .then(() => {
          this.$dispatch('update-status-detail', this.statusItem)
          this.show = false
          this.replyText = ''
        })
        .catch(err => {
          console.error('Failed to save comment, err: ', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .blackdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 999;
    height: 2000px;
  }

  .text-input {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 45px;
    z-index: 1000;
    background: #FAFAFA;
    /*border: 1px solid #D3CDCD;*/
    padding: 8px 0;
    display: flex;
    align-items: center;

    > input {
      background: #FCFCFC;
      border: 1px solid #E4E4E4;
      border-radius: 4px;
      height: 27px;
      padding: 2px 9px;
      margin-left: 9px;
      color: #020202;
      font-size: 1.4rem;
      outline: none;
      flex: 1;

      &::-webkit-input-placeholder {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #B4B4B4;
        letter-spacing: 0px;
      }
    }

    > .publish-comment-btn {
      cursor: pointer;
      text-align: center;
      width: 60px;
      font-size: 15px;
      color: #3e3b3b;
    }
  }
</style>
