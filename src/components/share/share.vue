<template>
    <a-modal 
    title="分享至："
    placement="bottom"
    :closable="false"
    v-model:visible="shareVisible"
    @close="toggleShareVisbible(false)"
     style="top: 200px"
    
  >
    <div class="social-share"></div>
  </a-modal >
</template>

<script>
import {  Modal} from 'ant-design-vue'
import useShareData from '@/components/share/useShareData'

export default {
 components: {
    AModal:Modal
  },   
  setup(){
      return {
        ...useShareData()
      }
  }
}
</script>


<style lang="less">
.social-share{
  height:40px
}
  
</style>