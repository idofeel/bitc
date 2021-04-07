<template>
  <div class="video_container">
    <div class="lg_container">
      <h3 style="text-align:center;">{{ data.name }}</h3>

      <div class="video_box">
        <video controls :src="data.contentUrl"></video>
      </div>
      <div class="video_intro">
        <h4>{{ data.name }}</h4>
        <div class="content_intro">
          <span class="mr20">
            内容简介
            <CaretDownOutlined />
          </span>
          <a-tag color="#f50" v-if="data.keywords">{{ item.keywords }}</a-tag>
        </div>
        <div>
          <Descriptions class="video_desc" size="middle">
            <DescriptionsItem>作者：{{ data.author }}</DescriptionsItem>
            <DescriptionsItem>主题：{{ data.theme }}</DescriptionsItem>
            <DescriptionsItem>学院：{{ data.college }}</DescriptionsItem>
            <DescriptionsItem
              >类型：{{ data.type === 0 ? '视频' : '音频' }}</DescriptionsItem
            >
            <DescriptionsItem
              >资源类型：{{ data.resourceType }}</DescriptionsItem
            >
            <DescriptionsItem span="2"
              >简介：{{ data.content }}</DescriptionsItem
            >
          </Descriptions>
        </div>
      </div>
    </div>
  </div>
  <div class="lg_container">
    <CommentSection />
  </div>
  <div class="more_comment lg_container pv10">
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
</template>

<script>
import { provide, onMounted } from 'vue';
import { Descriptions, Divider, Empty } from 'ant-design-vue';
import { DescriptionsItem } from 'ant-design-vue/lib/descriptions';
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import CommentSection from './CommentSection.vue';
import useDetails from '@/views/dataSource/useDetails.js';
import WaterfallList from '../listPage/waterfallList.vue';
import useDataList from '@/views/listPage/dataList';

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
    } = useDataList();
    const router = useRoute();
    const { data } = useDetails(router.query.id);

    const loadFullScreen = async () => {
      let oTop =
        document.body.scrollTop === 0
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      let bottomOfWindow =
        document.documentElement.scrollHeight - (oTop + window.innerHeight) <
        20;
      if (bottomOfWindow) {
        await nextPage();
      }
    };

    provide('detailData', data);

    onMounted(() => {
      loadFullScreen();
      // // 滚动加载
      window.addEventListener('scroll', () => {
        loadFullScreen();
      });
    });
    return {
      dataList,
      params,
      initData,
      nextPage,
      loading,
      loadEnd,
      loadFullScreen,
      data
    };
  }
};
</script>

<style lang="less" scoped>
.lg_container {
  padding: 0 10px;
}
.video_container {
  text-align: left;
  background: #191a20;
  padding: 20px 0;
  h3,
  h4 {
    color: #fff;
  }
  .video_box {
    background: #000;
    text-align: center;
    video {
      max-height: 744px;
      min-width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .video_intro {
    color: #fff;
    h4 {
      margin: 0;
      padding: 12px 0;
      font-weight: 600;
      font-size: 18px;
    }
    :deep(.video_desc) {
      margin-top: 10px;
      .ant-descriptions-title,
      .ant-descriptions-item-label,
      .ant-descriptions-item-content {
        color: #fff;
      }
    }
  }

  .content_intro {
    padding: 10px 0;
    border-bottom: 1px solid #27272c;
  }
}
.more_comment {
  padding-bottom: 20px;
  h3 {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
    padding-bottom: 20px;
    & > span {
      font-size: 12px;
      font-weight: 400;
      color: #ccc;
    }
  }
}
</style>
