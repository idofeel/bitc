import { onBeforeMount, reactive,toRefs } from 'vue'
import { get } from '@/api'
import _interface from '@/api/interface'

export default function(id) {
    const response = reactive({
        commentList: [],
        loading: false
    })

    const getData = async ()=>{
        if (!id) return;
        getCommentList()
    }
    const getCommentList = async () => {
        try {
            response.loading = true

        const res = await get(_interface.getComment, {objectId: id})
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
        const res = await get(_interface.getComment, {objectId: id})
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
        ...toRefs(response),
	}
}