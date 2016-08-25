<template>
  
  <div>
      <status-item :item="item" v-for="item in statusItems" track-by="id"></status-item>
  </div>
</template>

<script>
import {XHeader, Actionsheet, Toast} from 'vux-components'
import StatusItem from './StatusItem'

export default {
  components: {
    StatusItem
  },
  props: {
    statusItems: Array
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
