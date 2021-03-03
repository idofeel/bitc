import { onBeforeMount, reactive, toRefs, } from 'vue'
import { get, post } from '@/api'
import _interface from '@/api/interface'
export default function (id) {
    const response = reactive({
        commentList: [],
        loading: false
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
        console.log(commentParams);
        try {
            const res = await post(_interface.addComment, commentParams)
            if (res.code === 0) {
                response.commentList = res.data
            }
        } catch (error) {
            console.log(error);
        } finally {
            response.loading = false
        }
    }


    onBeforeMount(getData)

    return {
        addComment,
        commentParams,
        ...toRefs(response),
    }
}