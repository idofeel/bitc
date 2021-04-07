<template>
  <div class="comment_section">
    <h3>
      评论
      <span>（已有 {{ data.length }} 条评论）</span>
    </h3>
    <Comment>
      <template #content>
        <a-form-item class="comment_area ant-col-24">
          <a-textarea :rows="4" v-model:value="commentParams.commentContent" />
        </a-form-item>
        <a-form-item class="submit_btn mt10">
          <a-modal
            v-model:visible="modal2Visible"
            title="请输入验证码"
            centered
            cancelText="取消"
            okText="提交"
            :confirmLoading="addLoading"
            @ok="submitComment"
          >
            <div>
              <a-input
                placeholder="请输入验证码"
                v-model:value="commentParams.code"
                maxlength="4"
              >
                <template #addonAfter>
                  <img :src="imgCode" alt="" @click="setVerCode" />
                </template>
              </a-input>
            </div>
          </a-modal>

          <a-button
            html-type="submit"
            :loading="addLoading"
            type="primary"
            :disabled="!commentParams.commentContent"
            @click="setModal2Visible(true)"
            >发表评论</a-button
          >
        </a-form-item>
      </template>
    </Comment>

    <List
      class="comment-list"
      :header="`${data.length} 条评论`"
      item-layout="horizontal"
      :data-source="data"
    >
      <template #renderItem="{ item }">
        <ListItem>
          <Comment :author="item.nickname" :avatar="item.avatar">
            <template #actions>
              <span v-for="(action, index) in item.actions" :key="index">{{
                action
              }}</span>
            </template>
            <template #content>
              <p>{{ item.commentContent }}</p>
            </template>
            <template #datetime>
              <a-tooltip :title="item.createDate">
                <span>{{ item.createDate }}</span>
              </a-tooltip>
            </template>
          </Comment>
        </ListItem>
      </template>
    </List>
    <div class="more_comment pv10" v-if="false">
      <a-button>更多精彩评论>></a-button>
    </div>
  </div>
</template>

<script>
import {
  Comment,
  List,
  tooltip as ATooltip,
  Modal as AModal,
  message
} from 'ant-design-vue';
import AFormItem from 'ant-design-vue/lib/form/FormItem';
import ListItem from 'ant-design-vue/lib/list';
// import moment from 'moment'
import useComment from '@/views/dataSource/useComment';
import { inject, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
  components: {
    Comment,
    AFormItem,
    List,
    ListItem,
    ATooltip,
    AModal
  },
  setup() {
    const router = useRoute();
    const uid = router.query.id * 1;
    const {
      commentList: data,
      addComment,
      commentParams,
      loading,
      addLoading,
      setVerCode,
      imgCode
    } = useComment(uid);

    const detail = inject('detailData');

    watch(detail, (detail) => {
      if (detail.id === uid) {
        //
        commentParams.title = detail.name;
      }
    });

    const modal2Visible = ref(false);

    const setModal2Visible = (visible) => {
      modal2Visible.value = visible;
      setVerCode();
    };

    const submitComment = async () => {
      if (!commentParams.code || commentParams.code.length !== 4) {
        return message.warning('请输入验证码');
      }
      const res = await addComment();
      if (res) {
        modal2Visible.value = false;
      }
    };
    return {
      data,
      submitComment,
      commentParams,
      loading,
      addLoading,
      setVerCode,
      imgCode,
      modal2Visible,
      setModal2Visible

      //   da2: [
      //     {
      //       actions: ['Reply to'],
      //       author: '张三',
      //       avatar:
      //         'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //       content:
      //         '是飒飒阿斯达啊实打实大声道阿斯达阿斯达阿斯达阿斯达阿斯达，啊实打实大声道，阿斯达阿斯达撒的阿斯达。',
      //       datetime: moment().subtract(1, 'days')
      //     },
      //     {
      //       actions: ['Reply to'],
      //       author: '李四',
      //       avatar:
      //         'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      //       content: '达，啊实打实大声道，阿斯达阿斯达撒的阿斯达。',
      //       datetime: moment().subtract(2, 'days')
      //     }
      //   ]
    };
  }
};
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
