<template>
  <a-modal
    title="分享至："
    placement="bottom"
    v-model:visible="shareVisible"
    @close="toggleShareVisbible(false)"
    :footer="null"
    centered
  >
    <div class="social-share"></div>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import useShareData from '@/components/share/useShareData';

export default {
  components: {
    AModal: Modal
  },
  setup(props) {
    return {
      ...useShareData(props)
    };
  }
};
</script>

<style lang="less">
.social-share {
  height: 40px;
}
.social-share.share-component {
  display: flex;
  justify-content: space-around;
}
</style>
