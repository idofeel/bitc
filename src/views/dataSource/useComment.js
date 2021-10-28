import { onBeforeMount, reactive, toRefs } from "vue";
import { get, post } from "@/api";
import _interface from "@/api/interface";
import { message } from "ant-design-vue";

export default function(id) {
  const response = reactive({
    commentList: [],
    loading: false,
    addLoading: false,
    imgCode: "",
    countDown: 0,
    recordTime: null
  });

  const commentParams = reactive({
    objectId: null, // 被评论对象ID
    commentContent: "", // 评论
    title: "", // 被评论对象标题
    nickname: "", // 评论者昵称
    code: ""
  });

  const commentEmoji = reactive({
    guzhang: {
      key: "guzhang",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_guzhang_org.png",
      title: "[鼓掌]"
    },
    xiaoku: {
      key: "xiaoku",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/2018new_xiaoku_thumb.png",
      title: "[鼓掌]"
    },
    yun: {
      key: "yun",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/07/2018new_yun_org.png",
      title: "[晕]"
    },
    xixi: {
      key: "xixi",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/33/2018new_xixi_org.png",
      title: "[嘻嘻]"
    },
    xianhua: {
      key: "xianhua",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/d4/2018new_xianhua_org.png",
      title: "[鲜花]"
    },
    keai: {
      key: "keai",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/09/2018new_keai_org.png",
      title: "[可爱]"
    },
    han: {
      key: "han",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/28/2018new_han_org.png",
      title: "[汗]"
    },
    leimu: {
      key: "leimu",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/6e/2018new_leimu_org.png",
      title: "[泪]"
    },
    bishi: {
      key: "bishi",
      url:
        "https://face.t.sinajs.cn/t4/appstyle/expression/ext/normal/da/2018new_bishi_org.png",
      title: "[鄙视]"
    }
  });

  const getData = async () => {
    if (!id) return;
    commentParams.objectId = id;
    getCommentList();
  };
  // 获取评论
  const getCommentList = async () => {
    try {
      response.loading = true;
      commentParams.objectId = id;
      const res = await get(_interface.getComment, {
        objectId: id,
        commentType: 3
      });
      if (res.code === 0) {
        response.commentList = res.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      response.loading = false;
    }
  };

  function toHourMinute(s) {
    //   return Math.floor(minutes / 60) + "小时" + (minutes % 60) + "分";
    // 也可以转换为json，以方便专外部使用属
    return { minute: Math.floor(s / 60), second: s % 60 };
  }

    const getMsg = () => {
        
    const { minute, second } = toHourMinute(response.recordTime - Date.now()/1000);
    let t = "请在";
    if (minute > 0) {
      t += minute + "分钟";
    }
    if (second > 0) {
      t += Math.floor(second) + "秒";
    }
    return t + "后评论";
  };

  // 添加评论
    const addComment = async () => {
    if (response.recordTime && response.recordTime > Date.now() / 1000) {
      return message.warn(getMsg());
    }
    let res;
    try {
      response.addLoading = true;
      res = await post(_interface.addComment, commentParams);
      if (res.code === 0 || res.code === "0") {
        commentParams.commentContent = "";
        getCommentList();
        // message.success("评论已提交，审核后发布");
        message.success("评论成功");
      } else if (res.code === 1 || res.code === "1") {
        response.recordTime = Date.now() / 1000 + res.msg * 1;
        message.warn(getMsg());
      } else {
        throw new Error(res.msg);
      }
      return res;
    } catch (error) {
      message.error(error.message);
      return false;
    } finally {
      response.addLoading = false;
    }
  };

  // 设置验证码
  const setVerCode = function() {
    response.imgCode =
      process.env.VUE_APP_BASE_URL + _interface.getGifCode + "?" + Date.now();
  };

  onBeforeMount(getData);

  return {
    addComment,
    commentParams,
    setVerCode,
    ...toRefs(response),
    commentEmoji
  };
}
