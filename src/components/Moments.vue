<template>
<div>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <Navbar></Navbar>
  </div>
  <div class="view-contents">

    <scroller class="scroller"
      lock-x use-pullup use-pulldown v-ref:scroller
      @pullup:loading="loadMore"
      @pulldown:loading="refresh"
      :pullup-status.sync="pullupStatus"
      :pulldown-config="pulldownConfig"
      :pullup-config="pullupConfig">

      <Usercover :user="currentUser"></Usercover>
      <Statuslist :status-items="statusItems"></Statuslist>
      <div class="scroller-footer"></div>

      <!--Icon-->
      <div class="moments-icon-wrap" v-el:moments-icon>
        <div class="moments-icon"></div>
      </div>

      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
  <Reply :status-item="replyStatusItem" :show.sync="showReply"></Reply>
</div>

</template>

<script>
import AV from 'leancloud-storage'
import _ from 'lodash'
import { Scroller, Spinner } from 'vux-components'

import Statusbar from './Statusbar'
import Navbar from './MomentsNavbar'
import Usercover from './UserCover'
import Statuslist from './StatusList'
import Reply from './Reply'

export default {
  components: {
    Statusbar,
    Navbar,
    Usercover,
    Statuslist,
    Scroller,
    Spinner,
    Reply
  },
  data () {
    return {
      pullupStatus: 'default',
      pulldownConfig: {
        downContent: '  ',
        upContent: '  ',
        loadingContent: '  '
      },
      pullupConfig: {
        height: 40
      },
      statusItems: [],
      messageId: null,
      replyStatusItem: null,
      showReply: false
    }
  },
  computed: {
    currentUser () {return AV.User.current()}
  },
  events: {
    'show-loading' (uuid) {
      this.$els.momentsIcon.classList.add("show")
      this.$el.querySelector('#vux-scroller-' + uuid)
        .classList.add("fix-scroller-pos")
    },
    'hide-loading' (uuid) {
      this.$els.momentsIcon.classList.remove("show")
      this.$el.querySelector('#vux-scroller-' + uuid)
        .classList.remove("fix-scroller-pos")
    },
    'show-reply' (item) {
      this.replyStatusItem = item
      this.showReply = true
    },
    'update-status-detail' (statusItem) {
      this.$broadcast('status-item-changed', statusItem.id)
    }
  },
  methods: {
    refresh (uuid) {
      this.$emit('show-loading', uuid)
      this.loadStatusItems(true)
        .then(statusItems => {
          this.$nextTick(() => this.$broadcast('pulldown:reset', uuid))
        })
        .finally(() => this.$emit('hide-loading', uuid))
    },
    loadMore (uuid) {
      this.$emit('show-loading', uuid)
      this.loadStatusItems()
        .then(statusItems => {
          this.$nextTick(() => this.$broadcast('pullup:reset', uuid))
        })
        .finally(() => this.$emit('hide-loading', uuid))
    },
    loadStatusItems (shouldReset) {
      let query = AV.Status.inboxQuery(this.currentUser)
      query.include(['source', 'source.avatar', 'images', 'detail', 'detail.likes', 'detail.comments'])
      if (this.messageId)
        query.sinceId(this.messageId)
      return query.find()
        .then(statusItems => {
          if (!statusItems.length)
            return

          if (shouldReset)
            this.statusItems.splice(0, this.statusItems.length)
          this.statusItems = this.statusItems.concat(statusItems)
          this.messageId = _.maxBy(statusItems, 'messageId').messageId
        })
        .catch(err => {
          console.error('Failed to load status items, err: ', err)
        })
    }
  },
  ready () {
    this.loadStatusItems()
  }
}
</script>

<style lang="scss" scoped>
  .rotate {
    display: inline-block;
    transform: rotate(-180deg);
  }
  .pullup-arrow {
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
  .moments-icon-wrap {
    position: absolute;
    top: 30px;
    left: 22px;
    animation: pullup 1s 1 ease-out forwards;

    &.show {
      animation: dropdown 1s 1 ease-out;
    }

    > .moments-icon {
      width: 26px;
      height: 26px;
      animation: spin 1s infinite linear;
      background: url(../assets/moments-icon@2x.png) no-repeat;
      background-size: cover;
    }
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }

  @keyframes dropdown {
    from {transform:translate3d(0, -300px, 0);}
    to {transform:translate3d(0, 0, 0);}
  }

  @keyframes pullup {
    from {transform:translate3d(0, 0, 0);}
    to {transform:translate3d(0, -300px, 0);}
  }

  .fix-scroller-pos {
    transform:translate(0, -60px);
  }
  .scroller {
    overflow: auto !important;
  }
  .scroller-footer {
    width: 100%;
    height: 20px;
  }
</style>
