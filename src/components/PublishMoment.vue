<template>
<div>
  <div class="fixed-header">
    <Statusbar></Statusbar>
    <x-header :left-options="{showBack: false}">
      <a slot="left" class="nav-button" @click="back" style="color: #FFFFFF;">取消</a>
      <a slot="right" class="nav-button" @click="send" style="color: #35C941;" :style="{opacity: (text || images.length) ? 1 : 0.5}">发送</a>
    </x-header>
  </div>
  <div class="view-contents">
    <div>
      <textarea class="text-input" v-model="text" placeholder="这一刻的想法..."></textarea>
      <div class="images">
        <div class="item" v-for="image in images" :style="{'background-image': getImageUrl(image)}">
      </div>
      <label class="add-image-btn">
        <input type="file" id="image" accept="image/*" @change="addImage" v-el:image>
      </label>
    </div>
    <toast :show.sync="showSuccessPublishMsg">发布成功</toast>
    <toast type="cancel" :show.sync="showFailedPublishMsg">发布失败..</toast>
    <loading :show="showPublishingMsg" :text="'发布中'"></loading>
  </div>
</div>

</template>

<script>
import AV from 'leancloud-storage'
import {XHeader, Actionsheet, Toast, Loading} from 'vux-components'
import {StatusDetail} from '../lib/models'
import Statusbar from './Statusbar'
import Push from '../lib/push'

export default {
  components: {
    Statusbar,
    XHeader,
    Loading,
    Toast
  },
  data () {
    return {
      text: '',
      images: [],
      showSuccessPublishMsg: false,
      showFailedPublishMsg: false,
      showPublishingMsg: false
    }
  },
  events: {
  },
  methods: {
    addImage (e) {
      e.preventDefault()
      let files = this.$els.image.files
      console.log(files)
      Array.prototype.slice.call(files, 0).map(this.uploadFile)
    },
    uploadFile (file, i) {
      new AV.File(file.name, file)
        .save()
        .then(file => {
          console.log('file uploaded', file.get('url'))
          this.images.push(file)
        })
        .catch(err => {
          console.error('failed to upload image, file: ', file, err)
        })
    },
    getImageUrl (image) {
      if (image)
        return `url(${image.get('url')})`
    },
    back () {
      history.back()
    },
    send () {
      if (!this.text && !this.images.length) {
        console.warn('publish what?')
        return
      }
      
      let statusDetail = new StatusDetail()
      statusDetail.save()
        .then(detail => {
          let status = new AV.Status({
            text: this.text,
            images: this.images,
            detail
          })
          this.showPublishingMsg = true
          return AV.Status.sendStatusToFollowers(status)
        })
        .then(status => {
          console.log('publish success, status: ', status)
          this.showSuccessPublishMsg = true
          setTimeout(() => {
            this.$router.go('/view/moments')
          }, 1000)
          
          // push message
          Push.send(['new-status'], {itemId: status.id, publisherId: AV.User.current().id})
        })
        .catch(err => {
          console.error('publish failed, err: ', err)
          this.showFailedPublishMsg = true
        })
        .finally(() => {
          this.showPublishingMsg = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-button {
    font-size: 1.6rem;
    cursor: pointer;
  }
  .images {
    display: flex;
    margin: 5px;
    > * {
      margin: 5px;
    }

    > .item {
      width: 79px;
      height: 79px;
      background-size: cover;
    }
  }

  .add-image-btn {
    height: 79px;
    width: 79px;
    background: url(../assets/add-image-btn@2x.png) no-repeat;
    background-size: cover;
    display: block;
    cursor: pointer;

    > input[type="file"] {
        display: none;
    }
  }

  .text-input {
    height: 190px;
    width: 100%;
    font-size: 1.6rem;
    padding: 12px 18px;
    border: none;
    border-bottom: 1px solid rgb(236, 236, 236);
    resize: none;
    outline: none;

    &::-webkit-input-placeholder {
      font-size: 16px;
      color: #A9A9A9;
    }
  }

</style>
