<template>
  <div class="status-item clearfix">
    <div class="left"><div class="avatar" :style="{'background-image': `url(${avatarUrl})`}"></div></div>

    <div class="right">
      <div class="nickname" v-text="nickname"></div>
      <div class="text" v-if="text" v-text="text"></div>
      <div class="images" v-if="imageUrls" :class="imagesClass">
        <div class="item" v-for="url in imageUrls">
          <img :src="url">
        </div>
      </div>

      <div class="footer clearfix">
        <div class="time-ago" v-text="timeAgo"></div>
        <div class="reply-btn-wrap">
          <div class="reply-btn" @click.stop="toggleTooltip">
            <img src="../assets/reply@2x.png" class="retina">
          </div>
          <div class="reply-tooltip" v-show="showTooltip" transition="expand">
            <div class="left" @click="like">
              <div class="content">
                <img src="../assets/like@2x.png" style="width: 1.5rem" class="retina"> 赞
              </div>
            </div>
            <div class="right" @click="comment">
              <div class="content">
                <img src="../assets/comment@2x.png" style="width: 1.3rem" class="retina"> 评论
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reactions-panel" v-if="(likes && likes.length) || commentsData.length">
        <div class="likes-container" v-if="likes && likes.length">
          <img src="../assets/user_like@2x.png">
          <div class="likes">
            <div class="like" v-for="like in likes" track-by="id">{{like.get('nickname')}}</div>
          </div>
        </div>
        <div class="reactions-panel-divider" v-show="likes && likes.length && commentsData && commentsData.length"></div>
        <div class="comments" v-if="commentsData && commentsData.length">
          <div class="comment" v-for="comment in commentsData" track-by="id">
            <span class="comment-nickname" v-text="comment.fromUser"></span>:
            <span class="comment-text" v-text="comment.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import _ from 'lodash'
import moment from 'moment'

import {Comment} from '../lib/models'

export default {
  components: {
  },
  props: {
    item: Object
  },
  ready () {
    this.buildCommentData()
  },
  data () {
    return {
      showTooltip: false,
      commentsData: []
    }
  },
  events: {
    'status-item-changed' (statusItemId) {
      if (statusItemId !== this.item.id)
        return
      
      this.detail.fetch({include: 'likes,comments'}, {})
        .then(detail => {
          // TODO 用户缓存
          return Promise.all(detail.get('comments').map(comment => comment.get('user').fetch()))
          .then(users => {
            this.buildCommentData()
          })
        })
        .catch(err => {
          console.error('error: ', err)
        })
    }
  },
  computed: {
    data () {return this.item.data},
    nickname () {return this.data.source.get('nickname')},
    text () {return this.data.text || null},
    detail () {return this.item.data.detail},
    likes () {return this.detail.get('likes')},
    imageUrls () {
      if (this.data.images)
        return this.data.images.map(image => image.get('url'))
    },
    imagesClass () {
      if (this.imageUrls.length === 1)
        return ['one']
      else if  (this.imageUrls.length > 1)
        return ['two-col-grid']
    },
    avatarUrl () {
      return this.data.source.get('avatar').get('url')
    },
    timeAgo () {return moment(this.item.createdAt).fromNow()}
  },
  methods: {
    like (e) {
      if (!e.isTrusted) return

      let currentUser = AV.User.current()

      this.showTooltip = false
      let likes = this.detail.get('likes')
      if (!likes) {
        this.detail.set('likes', [])
        likes = this.detail.get('likes')
      }
      if (_.find(likes, like => like.getObjectId() === currentUser.getObjectId()))
        this.detail.remove('likes', currentUser)
      else
        this.detail.addUnique('likes', currentUser)

      this.detail.save()
        .then(detail => {
          return detail.fetch({include:'likes'}, {})
        })
        .then(detail => {
          this.detail.set('likes', detail.get('likes'))
        })
        .catch(err => {
          console.error('error: ', err)
        })
    },
    comment (e) {
      if (!e.isTrusted) return
      this.showTooltip = false
      this.$dispatch('show-reply', this.item)
    },
    toggleTooltip (e) {
      // workaround: click trigger twice..
      if (!e.isTrusted) return 
      this.showTooltip = !this.showTooltip
    },
    buildCommentData () {
      if (!this.detail.get('comments'))
        return
      
      // TODO 用户缓存
      Promise.all(this.detail.get('comments')
      .map(comment => comment.get('user').fetch()))
      .then(() => {
        let commentsData = this.detail.get('comments').map(comment => {
          return {
            id: comment.getObjectId(),
            fromUser: comment.get('user').get('nickname'),
            text: comment.get('text')
          }
        })
        this.commentsData.splice(0, commentsData.length)
        this.commentsData = this.commentsData.concat(commentsData)
      })
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
    background-color: #D8D8D8;
    background-size: cover;
  }

  .nickname {
    font-family: PingFangSC-Medium;
    font-size: 1.5rem;
    color: #5273A4;
  }
  .text {
    font-family: PingFangSC-Regular;
    font-size: 1.5rem;
    color: #111;
  }
  .images {
    display: flex;
    margin-top: 5px;
    
    &.one {
      > .item {
        max-width: 22rem;
        min-width: 7.9rem;
        min-height: 7.9rem;
        > img {
          max-width: 100%;
        }
      }
    }

    &.two-col-grid {
      
      > .item {
        margin: 0 10px 0 0;

        > img {
          object-fit: cover;
          width: 7.9rem;
          height: 7.9rem;
        }
      }
    }
  }
  .time-ago {
    font-family: PingFangSC-Regular;
    font-size: 1.2rem;
    color: #707070;
    float: left;
  }
  .reply-btn-wrap {
    position: relative;
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
    z-index: 10;

    position: absolute;
    right: 30px;
    bottom: -29px;

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

  .reactions-panel {
    background: #F3F3F5;
    position: relative;
    margin-top: 3px;

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      top: -4px;
      left: 14px;
      border-width: 0 6px 4px 6px;
      border-color: transparent transparent #F3F3F5 transparent;
    }
  }

  .likes-container {
    display: flex;
    margin: 8px 14px 0px;
    padding: 2px 0;
    > img {
      margin: 6px 8px 0 0;
      width: 12px;
      height: 10px;
    }
  }

  .likes {
    display: flex;
  }
  .like {
    padding: 0 8px 0 0;
    font-family: HelveticaNeue-Medium;
    font-size: 14px;
    color: #5E6B8D;
    letter-spacing: 0.6px;
  }

  .comments {
    padding: 4px 1px;
  }
  .comment {
    margin-left: 10px;
    font-size: 14px;
  }
  .comment-nickname {
    color: #5E6B8D;
  }
  .comment-text {
    color: #000002;
  }
  .reactions-panel-divider {
    height: 1px;
    width: 100%;
	  background: #e0e0e0;
  }
</style>
