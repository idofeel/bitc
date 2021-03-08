<template>
  <div class="home" :ref="listDom" v-loading="loading">
    <a-spin :spinning="loading">
      <Vue3Barrel
        v-if="list.length > 0"
        :data="list"
        :baseHeight="320"
        gap="20"
        class="barrelLayout sm-hide"
      >
        <template #default="item">
          <div
            :style="
              `width:${item.width}px;height:${
                item.height
              }px;padding:${item.margin / 2}px`
            "
            @click="$router.push('/list')"
          >
            <img :src="item.src" alt />
          </div>
        </template>
      </Vue3Barrel>

      <!-- ass -->
      <waterFall
        v-if="waterfallWidth > 0"
        gap="10"
        :width="waterfallWidth"
        :data="list"
        :delay="true"
        class="waterFallLayout sm-show"
      >
        <template #default="item">
          <div :key="item.id" class="item card" @click="$router.push('/list')">
            <img :src="item.url" alt />
          </div>
        </template>
      </waterFall>
    </a-spin>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import Vue3Barrel from 'vue3-barrel'
import { mediaMatches, getAverage } from '@/utils/util'
import waterFall from '@/components/waterfall/water-fall'
import useHomeData from '@/views/dataSource/useHomeData'

mediaMatches()
export default {
  name: 'Home',
  components: {
    Vue3Barrel,
    waterFall
  },
  setup() {
    const waterfallWidth = ref(0)
    const { list, loading } = useHomeData()

    let listRef = null
    const listDom = (el) => {
      listRef = el
    }

    function layoutResize() {
      if (!listRef || !listRef.offsetWidth) return
      // 设置瀑布流单个的宽度
      waterfallWidth.value = getAverage(listRef.offsetWidth, 400, 20)
    }
    onMounted(() => {
      layoutResize()
      window.addEventListener('resize', layoutResize)
    })

    return {
      loading,
      list,
      waterfallWidth,
      listDom
    }
  }
}
</script>

<style lang="less" scope>
@media screen and(min-width:768px) {
  .barrelLayout {
    max-width: 1200px;
    margin: 0 auto;
    text-align: left;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
    .wrap {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      & > div {
        position: relative;
        margin: 10px;
        &:hover {
          box-shadow: 0 0 20px #fff;
          z-index: 9999;
        }
      }
      & img {
        height: 300px;
        background: rgb(248, 248, 248);
        flex-grow: 1;
        object-fit: cover;
        transition: 0.3s;
        cursor: pointer;
      }
      &:after {
        display: block;
        content: '';
        flex-grow: 9999;
      }

      h4 {
        text-align: left;
        position: absolute;
        bottom: 0;
        padding: 10px 20px;
        color: #fff;
        background: rgba(0, 0, 0, 0.199);
        width: 100%;
        margin-bottom: 0;
        box-sizing: border-box;
      }
    }
  }
}

.waterFallLayout {
  img {
    width: 100%;
    height: 100%;
  }
}

@media screen and( max-width:768px) {
  .barrelLayout {
    .wrap {
      display: flex;
      flex-flow: column wrap;
      flex-direction: column;
      height: 600px;
    }
    .item {
      margin: 10px;
      width: calc(100% / 2 - 20px);
      box-shadow: 0 0 6px 2px #f5f5f5;
      border-radius: 8px;
    }
    .item img {
      width: 100%;
      background: #fff;
    }
    h4 {
      text-align: left;
      padding: 10px;
      margin-bottom: 0;
    }
  }
}

.ant-btn {
  border-radius: 6px;
}
</style>
