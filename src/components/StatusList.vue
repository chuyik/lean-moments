<template>
  
  <div>
      <status-item></status-item>
      <status-item></status-item>
  </div>
</template>

<script>
import {XHeader, Actionsheet, Toast} from 'vux-components'
import StatusItem from './StatusItem'

export default {
  components: {
    StatusItem
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
