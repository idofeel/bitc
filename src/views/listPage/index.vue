<template>
  <div class="listPage lg_container" ref="listPage">
    <div id="nav">
      <img
        :src="require('@/assets/logo1.png')"
        class="logo lg_container sm-hide"
        alt
      />
      <img
        :src="require('@/assets/logo2.png')"
        class="logo lg_container sm-show"
        alt
      />
      <!-- <router-link to="/">Home</router-link> |
            <router-link to="/list">list</router-link>-->
    </div>
    <a-row>
      <a-col :xs="24" :md="16">
        <div class="header">
          <a-input-search
            v-model:value="params.name"
            placeholder="请输入关键词"
            @search="initData"
            :loading="loading"
            enter-button
          />
          <FilterOutlined
            @click="toggleVisible"
            class="filterIcon ant-btn-link sm-show"
          />
        </div>
        <!-- {{ dataList }} -->
        <WaterfallList @onReady="onReady" :data="dataList" />
        <a-spin :spinning="loading"></a-spin>
        <Empty
          :image="PRESENTED_IMAGE_SIMPLE"
          v-if="dataList.length === 0 && loadEnd"
        />

        <Divider v-if="loadEnd && dataList.length !== 0" class="no_more"
          >没有更多了~</Divider
        >
        <!-- <a-button @click="getData">
					加载更多
                </a-button>-->
      </a-col>
      <a-col :md="8" class="sm-hide">
        <FilterCondtions :condtions="condtions" />
      </a-col>
      <Drawer
        title="筛选条件"
        :visible="drawerVisible"
        placement="right"
        width="320"
        @close="toggleVisible(false)"
      >
        <FilterCondtions :condtions="condtions" />
      </Drawer>
    </a-row>
    <!-- <a-spin size="large" /> -->
  </div>
</template>
/
<script>
import { onMounted, ref, reactive } from 'vue'
import useDataList from '@/views/listPage/dataList'
import { FilterOutlined } from '@ant-design/icons-vue'
import { Drawer, Divider, Empty } from 'ant-design-vue'
import FilterCondtions from './filterCondtions'
import WaterfallList from './waterfallList.vue'

const { PRESENTED_IMAGE_SIMPLE } = Empty

export default {
  components: {
    FilterOutlined,
    Divider,
    Empty,
    WaterfallList,
    Drawer,
    FilterCondtions
  },

  setup() {
    // 列表数据和参数
    const {
      dataList,
      params,
      initData,
      nextPage,
      loading,
      loadEnd
    } = useDataList()

    const listPage = ref(null)

    const condtions = reactive([
      {
        title: '活动专题',
        tags: [
          { name: '抗疫有我 为爱发声', id: 1, checked: false },
          { name: '行读', id: 2, checked: false },
          { name: '经典朗诵', id: 3, checked: false }
        ]
      },
      {
        title: '班级',
        tags: [
          { name: '1826021', id: '1826021', checked: false },
          { name: '1826022', id: '1826022', checked: false },
          { name: '1826051', id: '1826051', checked: false },
          { name: '1826052', id: '1826052', checked: false },
          { name: '1926021', id: '1926021', checked: false },
          { name: '1926051', id: '1926051', checked: false }
        ]
      },
      {
        title: '时间',
        tags: [
          { name: '2018年', id: '2018', checked: false },
          { name: '2019年', id: '2019', checked: false },
          { name: '2020年', id: '2020', checked: false },
          { name: '2021年', id: '2021', checked: false }
        ]
      }
    ])

    const drawerVisible = ref(false)
    function toggleVisible(bl) {
      if (bl === drawerVisible.value) return
      drawerVisible.value = bl === undefined ? !!drawerVisible.value : bl
    }

    const loadFullScreen = async () => {
      let oTop =
        document.body.scrollTop === 0
          ? document.documentElement.scrollTop
          : document.body.scrollTop
      let bottomOfWindow =
        document.documentElement.scrollHeight - (oTop + window.innerHeight) < 20
      if (bottomOfWindow) {
        await nextPage()
      }
    }

    function onReady() {
      loadFullScreen()
    }
    onMounted(() => {
      window.matchMedia('(max-width:768px)').addListener(function() {
        toggleVisible(false)
      })
      loadFullScreen()
      // // 滚动加载
      window.addEventListener('scroll', () => {
        loadFullScreen()
      })
    })
    return {
      loadEnd,
      listPage,
      condtions,
      onReady,
      dataList,
      loading,
      initData,
      params,
      drawerVisible,
      toggleVisible,
      PRESENTED_IMAGE_SIMPLE
    }
  }
}
</script>

<style lang="less" scoped>
.listPage {
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 20px;
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 10px;
    b {
      font-weight: 600;
      line-height: 2;
      padding: 10px;
      font-size: 18px;
    }
    .filterIcon {
      font-size: 24px;
      margin-left: 10px;
    }
    .list_saerch {
      margin-bottom: 10px;
    }

    .ant-input-search {
      padding: 10px 0;
      box-shadow: none !important;
      width: 95%;
      border: none;
      // border-bottom: 1px solid #e4e4e4;
    }
  }
  .no_more {
    padding: 10px 0;
    color: #ccc;
    font-size: 12px;
  }
}
</style>
