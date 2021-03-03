<template>
  <div class="comment_section">
    <h3>
      评论
      <span>（已有 123123 条评论）</span>
    </h3>
    <Comment>
      <template #content>
        <a-form-item class="comment_area ant-col-24">
          <a-textarea :rows="4" v-model:value="commentParams.commentContent" />
        </a-form-item>
        <a-form-item class="submit_btn mt10">
          <a-button
            html-type="submit"
            :loading="submitting"
            type="primary"
            @click="addComment"
            >发表评论</a-button
          >
        </a-form-item>
      </template>
    </Comment>

    <List
      class="comment-list"
      :header="`${data.length} replies`"
      item-layout="horizontal"
      :data-source="data"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <Comment :author="item.author" :avatar="item.avatar">
            <template #actions>
              <span v-for="(action, index) in item.actions" :key="index">{{
                action
              }}</span>
            </template>
            <template #content>
              <p>{{ item.content }}</p>
            </template>
            <template #datetime>
              <a-tooltip :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ item.datetime.fromNow() }}</span>
              </a-tooltip>
            </template>
          </Comment>
        </ListItem>
      </template>
    </List>
    <div class="more_comment pv10">
      <a-button>更多精彩评论>></a-button>
    </div>

    <div class="more_comment pv10">
      <h3>更多推荐</h3>
      <WaterfallList :data="dataList" />
    </div>
  </div>
</template>

<script>
import { Comment, List, tooltip as ATooltip } from 'ant-design-vue'
import AFormItem from 'ant-design-vue/lib/form/FormItem'
import ListItem from 'ant-design-vue/lib/list'
import moment from 'moment'
import WaterfallList from '../listPage/waterfallList.vue'
import useDataList from '@/views/listPage/dataList'
import useComment from '@/views/dataSource/useComment'
import { inject, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: { Comment, AFormItem, List, ListItem, ATooltip, WaterfallList },
  setup() {
    const router = useRoute()
    const uid = router.query.id * 1
    const { dataList } = useDataList()
    const { commentList: data, addComment, commentParams } = useComment(uid)

    const detail = inject('detailData')

    watch(detail, (detail) => {
      if (detail.id === uid) {
        //
        commentParams.title = detail.name
      }
    })

    return {
      dataList,
      data,
      addComment,
      commentParams,
      da2: [
        {
          actions: ['Reply to'],
          author: '张三',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content:
            '是飒飒阿斯达啊实打实大声道阿斯达阿斯达阿斯达阿斯达阿斯达，啊实打实大声道，阿斯达阿斯达撒的阿斯达。',
          datetime: moment().subtract(1, 'days')
        },
        {
          actions: ['Reply to'],
          author: '李四',
          avatar:
            'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: '达，啊实打实大声道，阿斯达阿斯达撒的阿斯达。',
          datetime: moment().subtract(2, 'days')
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.comment_section {
  text-align: left;
  h3 {
    margin: 0;
    margin-top: 20px;
    font-weight: 600;
    font-size: 18px;
    & > span {
      font-size: 12px;
      font-weight: 400;
      color: #ccc;
    }
  }

  :deep(.ant-comment-inner) {
    padding: 10px 0;
  }

  :deep(.submit_btn) {
    .ant-col {
      margin-left: auto;
    }
  }

  .more_comment {
    text-align: center;
  }
}
</style>
