import { onBeforeMount, reactive, ref, toRefs } from 'vue'
import { get } from '@/api'
import _interface from '@/api/interface'

export default function (id) {
    const response = reactive({
        data: {},
        commentList: []
    })
    const loading = ref(true)
    const setLoading = bl => loading.value = !!bl

    const getData = async () => {
        if (!id) return;
        getDetailData()
    }
    const getDetailData = async () => {
        setLoading(true)
        try {
            const res = await get(_interface.details + id)
            if (res.code === 0) {
                response.data = res.data
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    onBeforeMount(getData)

    return {
        loading,
        ...toRefs(response),
    }
}