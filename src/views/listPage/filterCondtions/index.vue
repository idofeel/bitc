<template>
  <div class="filterContainer">
    <div v-for="(item, index) in condtions" :key="index">
      <a-spin :spinning="item.loading" :indicator="indicator">
        <h3>{{ item.title }}</h3>
        <div class="btns">
          <a-button
            v-for="(tag, idx) in item.tags"
            :key="idx"
            class="btn"
            :type="tag.checked ? 'primary' : 'default'"
            @click="tag.checked = !tag.checked;itemClick(tag, idx, condtions)"
            >{{ tag.name }}</a-button
          >
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { defineComponent, h } from 'vue'
export default defineComponent({
  components: {},
  props: {
    condtions: {
      type: Array,
      default: () => []
    }
  },
  emits: ['itemClick'],
  setup(props, {emit}) {
    const indicator = h(LoadingOutlined, {
      style: {
        fontSize: '24px'
      },
      spin: true
    })

    function itemClick(item, index,condtions){
      emit('itemClick', item, index,condtions)
    }

    return {
      indicator,
      itemClick
    }
  }
})
</script>

<style lang="less" scoped>
.filterContainer {
  text-align: left;
  padding: 0 10px;

  h3 {
    margin-top: 20px;
    font-weight: 600;
  }

  .btns {
    .btn {
      margin: 5px;
    }
  }
}
</style>
