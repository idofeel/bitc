<template>
  <div class="audio_container ">
    <div class="lg_container">
      <h3 style="text-align:center;">{{ data.name }}</h3>
      <div class="audioContent">
        <div class="audio_box">
          <div class="audio_cotnent">
            <div class="audio_cover">
              <img :src="data.cover" />
            </div>
            <div class="audioLrc" :ref="audioContainerRef">
              <div class="empty" v-if="lrc.length === 0">暂无数据</div>
              <p
                v-for="(item, index) in lrc"
                :key="item.start"
                :class="currLine === index ? 'playLine' : ''"
                class="sentence"
                @dblclick="setCurrentTime(item.start, index)"
              >
                {{ item.lrc }}
              </p>
            </div>
          </div>
          <audio :ref="audioRef" controls :src="data.contentUrl"></audio>
        </div>
        <div class="audio_intro">
          <h4>{{ data.name }}</h4>
          <div class="content_intro">
            <span class="mr20">
              内容简介
              <CaretDownOutlined />
            </span>
            <span v-if="data.readNum" class="iconfont">
              <svg
                v-if="data.type === 1"
                t="1610680034604"
                class="icon"
                fill="currentColor"
                viewBox="64 64 896 896"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1491"
                width="1em"
                height="1em"
              >
                <path
                  d="M660.8 430.4c1.6 0 4.8 0 6.4-1.6 8-3.2 11.2-12.8 8-20.8-4.8-11.2-11.2-22.4-19.2-33.6-4.8-6.4-16-8-22.4-3.2-6.4 4.8-8 16-3.2 22.4 6.4 8 11.2 17.6 16 27.2 3.2 4.8 8 9.6 14.4 9.6zM606.4 332.8c-24-12.8-49.6-19.2-75.2-19.2-36.8 0-72 12.8-99.2 35.2-6.4 4.8-8 16-3.2 22.4 3.2 3.2 8 6.4 12.8 6.4 3.2 0 6.4-1.6 9.6-3.2 40-32 96-36.8 140.8-12.8 8 4.8 17.6 1.6 22.4-6.4 1.6-9.6-1.6-19.2-8-22.4z"
                  p-id="1492"
                />
                <path
                  d="M785.6 510.4v-44.8c0-145.6-118.4-264-264-264S257.6 320 257.6 465.6v44.8c-48 14.4-80 57.6-80 107.2v80c0 62.4 49.6 112 112 112s112-49.6 112-112v-80c0-49.6-32-92.8-80-107.2v-44.8c0-110.4 89.6-200 200-200s200 89.6 200 200v44.8c-48 14.4-80 57.6-80 107.2v80c0 62.4 49.6 112 112 112s112-49.6 112-112v-80c0-49.6-32-92.8-80-107.2z m-448 107.2v80c0 27.2-20.8 48-48 48s-48-20.8-48-48v-80c0-27.2 20.8-48 48-48s48 20.8 48 48z m464 80c0 27.2-20.8 48-48 48s-48-20.8-48-48v-80c0-27.2 20.8-48 48-48s48 20.8 48 48v80z"
                  p-id="1493"
                />
              </svg>
              <PlayCircleOutlined v-else />

              {{ data.readNum }} 次播放
            </span>
            <span @click.stop="shareTo(data)" class="mh10 shareBox">
              <ShareAltOutlined />
              分享
            </span>
            <a-tag color="#f50" v-if="data.keywords">{{ item.keywords }}</a-tag>
          </div>
          <div>
            <Descriptions class="audio_desc" size="middle">
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
  <Share :ref="shareDom" />
</template>

<script>
import { provide, onMounted, ref, watch } from 'vue';
import { Descriptions, Divider, Empty } from 'ant-design-vue';
import { DescriptionsItem } from 'ant-design-vue/lib/descriptions';
import {
  CaretDownOutlined,
  ShareAltOutlined,
  PlayCircleOutlined
} from '@ant-design/icons-vue';
import { useRoute } from 'vue-router';
import CommentSection from './CommentSection.vue';
import useDetails from '@/views/dataSource/useDetails.js';
import WaterfallList from '../listPage/waterfallList.vue';
import useDataList from '@/views/listPage/dataList';
import Share from '@/components/share/share.vue';

export default {
  components: {
    Descriptions,
    DescriptionsItem,
    CaretDownOutlined,
    CommentSection,
    Divider,
    Empty,
    WaterfallList,
    ShareAltOutlined,
    PlayCircleOutlined,
    Share
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
    const { data, lrc } = useDetails(router.query.id);

    let AUDIO = null;
    const currLine = ref(null);
    const audioRef = (el) => (AUDIO = el);

    let audioContainer = null;
    const audioContainerRef = (el) => (audioContainer = el);

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

    function setCurrentTime(ctime, index) {
      currLine.value = index;
      AUDIO.currentTime = ctime;
      AUDIO.play();
    }

    watch(currLine, () => {
      wheel = false;
    });

    let timer = null;
    let start = 0;
    let wheel = false;
    let speed = 1;

    function scrollLrc() {
      if (wheel) return;
      const boxCenterHeight = audioContainer.clientHeight / 2;
      const scrollHeight = audioContainer.scrollHeight;

      const currentPlayDom = audioContainer.children[currLine.value];
      // 当前距离顶部的高度 - 初始的高度
      const scrollTop = currentPlayDom.offsetTop - audioContainer.offsetTop;

      const currentScroll =
        scrollTop > boxCenterHeight ? scrollTop - boxCenterHeight : 0;
      //   if (audioContainer.clientHeight >= audioContainer.clientHeight) {
      //     cancelAnimationFrame(timer)
      //     console.log('滚不动了')
      //   }

      function updateScroll() {
        if (scrollHeight - audioContainer.clientHeight <= start) {
          start = 0;
          return cancelAnimationFrame(timer);
        }
        const count = speed / 20;

        if (currentScroll < audioContainer.scrollTop) {
          // 向上滚动 audioContainer.scrollTop - currentScroll

          start = audioContainer.scrollTop - count;
        } else {
          // 向下滚动 audioContainer.scrollTop - currentScroll
          start = audioContainer.scrollTop + count;
        }
        if (start > currentScroll) {
          start = currentScroll;
        }
        if (start === currentScroll) {
          cancelAnimationFrame(timer);
        } else {
          timer = requestAnimationFrame(updateScroll);
        }
        audioContainer.scrollTop = start;
      }

      if (audioContainer.scrollTop !== currentScroll) {
        wheel = true;
        speed = currentScroll - audioContainer.scrollTop;
        updateScroll();
      }
    }

    let share = null;
    const shareDom = (el) => {
      share = el;
    };
    function shareTo(item) {
      console.log(item);
      share.toggleShareVisbible(true, {
        title: item.name,
        url:
          window.location.origin +
          location.pathname +
          `#/${item.type === 1 ? 'audio' : 'video'}?id=${item.id}&nid=${
            item.nodeId
          }`,
        image: item.cover
      });
    }

    provide('detailData', data);

    onMounted(() => {
      AUDIO.addEventListener('timeupdate', () => {
        const ctime = AUDIO.currentTime;
        lrc.value.some((item, index) => {
          const next = ctime > item.start && ctime < item.end;
          if (next) {
            currLine.value = index;
            scrollLrc();
          }
          return next;
        });
      });

      window.addEventListener('wheel', () => {
        wheel = true;
      });
      window.addEventListener('touchmove', () => {
        wheel = true;
      });
      loadFullScreen();
      // // 滚动加载
      window.addEventListener('scroll', () => {
        loadFullScreen();
      });
    });

    return {
      audioRef,
      audioContainerRef,
      dataList,
      currLine,
      params,
      initData,
      nextPage,
      loading,
      loadEnd,
      loadFullScreen,
      data,
      lrc,
      setCurrentTime,
      shareDom,
      shareTo
    };
  }
};
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
    .sentence {
      cursor: pointer;
    }
    .playLine {
      color: red;
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
.audio_cotnent {
  display: flex;
  margin-bottom: 20px;
  .audio_cover {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .audioLrc {
    overflow: auto;
    height: 300px;
    width: 100%;
    .empty {
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ccc;
    }
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

.shareBox {
  cursor: pointer;
}
// 当屏幕小于768
@media screen and (max-width: 769px) {
  .audio_cotnent {
    flex-direction: column;

    .audio_cover {
      overflow: hidden;
      img {
        max-height: 200px;
      }
    }
  }
}
</style>
