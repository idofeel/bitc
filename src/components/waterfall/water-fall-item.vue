<template>
  <div class="water-fall-item" ref="container">
    <slot></slot>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getImgInfo } from '@/utils/loadImages';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    delay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['load'],
  setup(props, { emit }) {
    const container = ref();
    const getItemData = () => ({
      ...props.item,
      height: container.value ? container.value.clientHeight : 200
    });
    const delayLoad = async () => {
      let res = {};
      try {
        res = await getImgInfo(props.item.url);
      } catch (error) {
        console.log(error);
        res.load;
      }
      // console.log('delayLoad,',res,container.value.clientHeight);
      // res.height = Math.floor(res.originHeight / res.originWidth * container.value.clientWidth *100 ) / 100
      // emit('load', {...props.item, ...res})
      setTimeout(() => {
        res.height = container.value ? container.value.clientHeight : 200;
        // emit('load', res)
        emit('load', { ...props.item, ...res, el: container.value });
      }, 150);
    };

    const load = () => {
      emit('load', getItemData());
    };

    onMounted(props.delay ? delayLoad : load);

    return { container };
  }
};
</script>
