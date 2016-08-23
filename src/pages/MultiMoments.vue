<template>
  <div>
    <div class="views">
      <div class="view">
        <Statusbar></Statusbar>
        <iframe src="/moments" frameborder="0"></iframe>
      </div>
      <div class="view">
        <Statusbar></Statusbar>
        <iframe src="/moments" frameborder="0"></iframe>
      </div>
      <div class="view">
        <Statusbar></Statusbar>
        <iframe src="/moments" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import Statusbar from 'components/Statusbar'

export default {
  components: {
    Statusbar
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style lang="scss" scoped>
  .views {
    display: flex;
    align-items: center;
    justify-content: center;

    > .view {
      width: 375px;
      height: 677px;
      border: 1px solid red;

      > iframe {
        width: 100%;
        height:100%;
      }
    } 
  }
</style>