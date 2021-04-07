<template>
  <div class="list_container" :ref="listDom">
    <a-image-preview-group>
      <waterFall
        v-if="waterfallWidth > 0"
        :gap="gap"
        :width="waterfallWidth"
        :data="data"
        :delay="true"
        @ready="ready"
      >
        <template #default="item">
          <div
            :key="item.id"
            class="item card"
            @click="
              $router.push({
                path: item.type === 1 ? '/audio' : '/video',
                query: { id: item.id, nid: item.nodeId }
              })
            "
          >
            <div class="cover_img">
              <a-image
                class="img"
                :src="item.url"
                placeholder
                :preview="false"
                fallback="data:image/png;base64,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"
              />
            </div>
            <h4>{{ item.title }}</h4>
            <div class="item_tags" v-if="item.tags && item.tags.length">
              <a-tag
                color="blue"
                class="bitc_tag"
                v-for="(tag, index) in item.tags"
                :key="index"
                >{{ tag }}</a-tag
              >
            </div>
            <div class="praise_icons">
              <!-- <div class="like">
                <LikeOutlined color="red" />
                {{ item.praise }}
              </div> -->
              <div class="iconfont">
                <svg
                  v-if="item.type === 1"
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

                <span v-if="item.readNum">{{ item.readNum }}</span>
              </div>
              <ShareAltOutlined @click.stop="shareTo(item)" class="iconfont" />
            </div>
          </div>
        </template>
      </waterFall>
    </a-image-preview-group>
    <Share :ref="shareDom" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getAverage } from '@/utils/util';
import waterFall from '@/components/waterfall/water-fall';
import {
  //   LikeOutlined,
  PlayCircleOutlined,
  ShareAltOutlined
} from '@ant-design/icons-vue';
import Share from '@/components/share/share.vue';
export default {
  components: {
    waterFall,
    PlayCircleOutlined,
    // LikeOutlined,
    ShareAltOutlined,
    Share
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onReady'],
  setup(props, { emit }) {
    const gap = ref(16);
    const waterfallWidth = ref(0);
    let listRef = null;
    const listDom = (el) => {
      listRef = el;
    };
    let share = null;
    const shareDom = (el) => {
      share = el;
    };
    const setWaterfallWith = () => {
      if (listRef) {
        waterfallWidth.value = getAverage(listRef.offsetWidth, 210, gap.value);
      }
    };

    function shareTo(item) {
      console.log(item);
      share.toggleShareVisbible(true, {
        title: item.title,
        url:
          window.location.origin +
          location.pathname +
          `#/${item.type === 1 ? 'audio' : 'video'}?id=${item.id}`,
        image: item.url
      });
    }

    function ready() {
      emit('onReady');
    }
    onMounted(() => {
      setWaterfallWith();
      window.addEventListener('resize', () => {
        setWaterfallWith();
      });
    });
    return {
      gap,
      listDom,
      waterfallWidth,
      ready,
      shareDom,
      shareTo
    };
  }
};
</script>

<style lang="less" scoped>
.list_container {
  width: 100%;
  .card {
    background-color: white;
    border-radius: 3px;
    color: #666;
    line-height: 1.5;
    word-break: break-all;
    box-shadow: 0 0 6px 2px #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
    :deep(& > .ant-image) {
      width: 100%;
    }
    .img {
      width: 100%;
      margin-bottom: 5px;
      cursor: pointer;
    }

    .praise_icons {
      position: relative;
      //   .iconfont {
      //     position: absolute;
      //     right: 0;
      //     top: 0;
      //     background: rgba(0, 0, 0, 0.199);
      //     padding: 3px 8px;
      //     color: #fff;
      //     border-bottom-left-radius: 5px;
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      span {
        margin: 0 2px;
      }
      //   }
    }

    h4 {
      text-align: left;
      padding: 10px;
      margin: 0;
    }
    .item_tags {
      display: flex;
      padding: 0 10px;
      text-align: left;
      .bitc_tag {
        margin-right: 5px;
        margin-bottom: 5px;
        padding: 0 4px;
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .praise_icons {
      padding: 0 10px;
      padding-bottom: 10px;
      text-align: right;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        color: #ccc;
        svg {
          color: #ccc;
          font-size: 16px;
          vertical-align: text-bottom;
        }
      }
      .like {
        color: #ccc;
        cursor: pointer;
      }
    }
  }
}
</style>
