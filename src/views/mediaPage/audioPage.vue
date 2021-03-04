<template>
  <div class="audio_container ">
    <div class="lg_container">
      <h3>正在播放：{{ data.name }}</h3>
      <div class="audioContent">
        <div class="audio_box">
          <img :src="data.cover" />
          <p v-for="item in data.fe_lrc" :key="item.start">
            {{ item.lrc }}
          </p>
          <audio :ref="audioRef" controls :src="data.contentUrl"></audio>
        </div>
        <div class="audio_intro">
          <h4>{{ data.name }}</h4>
          <div class="content_intro">
            <span class="mr20">
              内容简介
              <CaretDownOutlined />
            </span>
            <a-tag color="#f50" v-if="data.keywords">{{ item.keywords }}</a-tag>
          </div>
          <div>
            <Descriptions class="audio_desc" size="middle">
              <DescriptionsItem>作者：{{ data.author }}</DescriptionsItem>
              <DescriptionsItem>主题：{{ data.theme }}</DescriptionsItem>
              <DescriptionsItem span="2"
                >简介：{{ data.content }}</DescriptionsItem
              >
            </Descriptions>
          </div>
        </div>
      </div>
      <div class="commentSection">
        <CommentSection />
      </div>
      <div class="more_comment  pv10">
        <h3>更多推荐</h3>
        <WaterfallList :data="dataList" @onReady="loadFullScreen" />
        <a-spin :spinning="loading"></a-spin>
        <Empty
          :image="PRESENTED_IMAGE_SIMPLE"
          v-if="dataList.length === 0 && loadEnd"
        />
        <Divider v-if="loadEnd && dataList.length !== 0" class="no_more"
          >没有更多了~</Divider
        >
      </div>
    </div>
  </div>
</template>

<script>
import { provide, onMounted } from 'vue'
import { Descriptions, Divider, Empty } from 'ant-design-vue'
import { DescriptionsItem } from 'ant-design-vue/lib/descriptions'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import CommentSection from './CommentSection.vue'
import useDetails from '@/views/dataSource/useDetails.js'
import WaterfallList from '../listPage/waterfallList.vue'
import useDataList from '@/views/listPage/dataList'

export default {
  components: {
    Descriptions,
    DescriptionsItem,
    CaretDownOutlined,
    CommentSection,
    Divider,
    Empty,
    WaterfallList
  },
  setup() {
    const {
      dataList,
      params,
      initData,
      nextPage,
      loading,
      loadEnd
    } = useDataList()
    const router = useRoute()
    const { data } = useDetails(router.query.id)
    let AUDIO = null

    const audioRef = (el) => (AUDIO = el)

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

    provide('detailData', data)

    onMounted(() => {
      console.log(AUDIO)
      AUDIO.addEventListener('timeupdate', () => {})
      loadFullScreen()
      // // 滚动加载
      window.addEventListener('scroll', () => {
        loadFullScreen()
      })
    })

    return {
      audioRef,
      dataList,
      params,
      initData,
      nextPage,
      loading,
      loadEnd,
      loadFullScreen,
      data
    }
  }
}
</script>

<style lang="less" scoped>
.lg_container {
  padding: 0 10px;
  text-align: left;
}
.audio_container {
  text-align: left;
  padding: 20px 0;
  h3,
  h4 {
    color: #000;
  }
  .audioContent {
    background: rgba(147, 156, 167, 0.2);
    padding: 20px;
    border-radius: 10px;
  }
  .audio_box {
    text-align: center;
    audio {
      max-height: 744px;
      min-width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .audio_intro {
    color: #333;
    h4 {
      margin: 0;
      padding: 12px 0;
      font-weight: 600;
      font-size: 18px;
    }
    :deep(.audio_desc) {
      margin-top: 10px;
      .ant-descriptions-title,
      .ant-descriptions-item-label,
      .ant-descriptions-item-content {
        color: #333;
      }
    }
  }

  .content_intro {
    padding: 10px 0;
    border-bottom: 1px solid rgb(147, 156, 167);
  }
}
.more_comment {
  padding-bottom: 20px;
  h3 {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    text-align: center;
    font-size: 18px;
    padding-bottom: 20px;
    & > span {
      font-size: 12px;
      font-weight: 400;
      color: #ccc;
    }
  }
  .no_more {
    padding: 10px 0;
    color: #ccc;
    font-size: 12px;
  }
}
</style>
