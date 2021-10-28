<template>
  <div class="comment_section">
    <h3>
      发表评论
      <span>（已有 {{ data.length }} 条评论）</span>
    </h3>
    <Comment v-if="false">
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
                :maxlength="4"
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
     <div class="detail_wbtext_4CRf9" >
        <img  v-for="item in commentEmoji" :key="item.key" :alt="item.title" :title="item.title" :src="item.url" @click="submitComment(item.key)">
        <!-- <img alt="[鼓掌]" title="[鼓掌]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_guzhang_org.png">
        <img alt="[笑cry]" title="[笑cry]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/2018new_xiaoku_thumb.png">
        <img alt="[晕]" title="[晕]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/07/2018new_yun_org.png">
        <img alt="[嘻嘻]" title="[嘻嘻]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/2018new_xixi_org.png">

        <img alt="[鲜花]" title="[鲜花]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/d4/2018new_xianhua_org.png">
        <img alt="[晕]" title="[晕]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/07/2018new_yun_org.png">
        
        <img alt="[可爱]" title="[可爱]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/2018new_keai_org.png">
        <img alt="[汗]" title="[汗]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/28/2018new_han_org.png">
        <img alt="[泪]" title="[泪]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_leimu_org.png">
        <img alt="[鄙视]" title="[鄙视]" src="https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/da/2018new_bishi_org.png">  -->
  </div>
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
              <img v-if="emoji[item.commentContent]" :alt="emoji[item.commentContent].title" :title="emoji[item.commentContent].title" :src="emoji[item.commentContent].url">  
              <p v-else>{{ item.commentContent }}</p>
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
  // message
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
    // 评论
    const {
      commentList: data,
      addComment,
      commentParams,
      loading,
      addLoading,
      setVerCode,
      imgCode,
      commentEmoji
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

    const submitComment = async (content) => {
      commentParams.commentContent = content
      // 暂时不需要验证
      // if (!commentParams.code || commentParams.code.length !== 4) {
      //   return message.warning('请输入验证码');
      // }
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
      setModal2Visible,
      emoji:commentEmoji,
      commentEmoji:Object.values(commentEmoji)

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

  .detail_wbtext_4CRf9{
    img{
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
