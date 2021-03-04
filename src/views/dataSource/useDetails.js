import { onBeforeMount, reactive, ref, toRefs } from 'vue'
import request, { get } from '@/api'
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

    const formatterTime = (time) => {
        const arr = time.split(':')
        let t = 1;
        return arr.reverse().reduce((total, current) => {
            total += (current * t)
            t *= 60
            return Math.round(total * 100) / 100
        }, 0)
    }

    function formatterLrc (txt) {
        const txtList = txt.split(/[(\r\n)\r\n]+/).reduce((total, item, currentIndex) => {
            console.log(item);
            const prev = total[currentIndex - 1]
            const arr = item.split(/^\[(.*?)\]\s/).filter(i => i)

            total.push({
                start: prev ? prev.end : 0,
                end: formatterTime(arr[0]),
                endstr: arr[0],
                lrc: arr[1]
            })
            return total
        }, [])
        console.log(txtList);


        return txtList
    }
    const getDetailData = async () => {
        setLoading(true)
        try {
            const res = await get(_interface.details + id)
            if (res.code === 0) {
                response.data = res.data
                response.data.fe_lrc = formatterLrc(await request.get(res.data.captions))
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