import { onBeforeMount, reactive, toRefs, } from 'vue'
import { get, post } from '@/api'
import _interface from '@/api/interface'
import { message } from 'ant-design-vue';

export default function (id) {
    const response = reactive({
        commentList: [],
        loading: false,
        addLoading: false
    })

    const commentParams = reactive({
        objectId: null, // 被评论对象ID
        commentContent: '', // 评论
        title: '', // 被评论对象标题
        nickname: '', // 评论者昵称
    })



    const getData = async () => {
        if (!id) return;
        commentParams.objectId = id
        getCommentList()
    }
    const getCommentList = async () => {
        try {
            response.loading = true
            commentParams.objectId = id
            const res = await get(_interface.getComment, { objectId: id })
            if (res.code === 0) {
                response.commentList = res.data
            }
        } catch (error) {
            console.log(error);
        } finally {
            response.loading = false
        }
    }

    const addComment = async () => {
        try {
            response.addLoading = true
            const res = await post(_interface.addComment, commentParams)
            if (res.code === 0 || res.code === '0') {
                commentParams.commentContent = ''
                getCommentList()
                message.success('评论成功，审核通过后可见')
            } else {
                throw new Error(res)
            }
        } catch (error) {
            message.error(error.msg || error)
        } finally {
            response.addLoading = false
        }
    }


    onBeforeMount(getData)

    return {
        addComment,
        commentParams,
        ...toRefs(response),
    }
}