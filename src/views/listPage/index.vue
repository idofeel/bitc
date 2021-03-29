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
        <FilterCondtions :condtions="condtions" @itemClick="itemClick" />
        <div class="drawer_footer">
          <Divider />
          <a-button style="margin-right: 8px" @click="toggleVisible(false)"
            >取消</a-button
          >
          <a-button
            type="primary"
            :loading="loading"
            @click="toggleVisible(false), initData()"
            >筛选</a-button
          >
        </div>
      </a-col>
      <Drawer
        title="筛选条件"
        wrapClassName="drawer_fc"
        :visible="drawerVisible"
        placement="right"
        width="320"
        @close="toggleVisible(false)"
      >
        <FilterCondtions :condtions="condtions" @itemClick="itemClick" />
        <div class="drawer_footer">
          <a-button style="margin-right: 8px" @click="toggleVisible(false)"
            >取消</a-button
          >
          <a-button
            :loading="loading"
            type="primary"
            @click="toggleVisible(false), initData()"
            >筛选
            </a-button
          >
        </div>
      </Drawer>
    </a-row>
    <!-- <a-spin size="large" /> -->
  </div>
</template>
/
<script>
import { onMounted, ref } from 'vue'
import useDataList from '@/views/listPage/dataList'
import { FilterOutlined } from '@ant-design/icons-vue'
import { Drawer, Divider, Empty } from 'ant-design-vue'
import FilterCondtions from './filterCondtions'
import WaterfallList from './waterfallList.vue'
import useCateData from '@/views/dataSource/useCateData'


const { PRESENTED_IMAGE_SIMPLE } = Empty

export default {
  components: {
    FilterOutlined,
    Divider,
    Empty,
    WaterfallList,
    Drawer,
    FilterCondtions,
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

    const { getChecked, condtions } = useCateData()

    function itemClick() {
      const getCheckedName = () => {
        const cnames = getChecked().map((i) => i.map((j) => j.name).join('_'))
        return cnames
      }
      const [theme, grade, college] = getCheckedName()
      params.theme = theme
      params.grade = grade
      params.college = college
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
      condtions,
      itemClick,
      loadEnd,
      listPage,
      onReady,
      dataList,
      loading,
      initData,
      params,
      drawerVisible,
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

<style lang="less">
// 外围容器
.drawer_fc {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }
  .ant-drawer-body {
    height: calc(100% - 55px - 55px);
    overflow: auto;
    padding: 10px;
  }
  .drawer_footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 4px 4px;
  }
}
</style>
