import { onBeforeMount, onMounted, ref, reactive } from 'vue'

import { get } from '@/api'
import _interface from '@/api/interface'
import { useRouter } from 'vue-router'
export default function () {
    let dataList = reactive([])

    const loading = ref(false)
    const loadEnd = ref(false)

    const setLoading = bl => loading.value = !!bl;
    const setloadEnd = bl => loadEnd.value = !!bl;

    const { currentRoute } = useRouter()
    let requestParams = reactive({
        nodeId: currentRoute.value.query.nid,
        name: '',
        college: '',
        grade: '',
        theme: '',
        page: 1, // 第几页
        limit: 20 // 每页条数
    })

    const setReqParams = (params) => {
        requestParams = Object.assign(requestParams, params)
    }

    const initData = async () => {
        setLoading(false)
        setloadEnd(false)
        dataList.splice(0, dataList.length);
        setReqParams({
            page: 1, // 第几页
        })
        await nextPage()
    }

    const nextPage = async () => {
        if (loading.value || loadEnd.value) return
        setLoading(true)
        // 加载中 和 已加载完毕
        const res = await get(_interface.listPageData, requestParams)

        if (res.code === 0) {
            const formatterResData = (item) => {
                return {
                    ...item,
                    id: item.id,
                    title: item.name,
                    url: item.cover,
                    readNum: item.readNum,
                    praise: item.showNumber,
                    type: item.type,
                }
            }
            const resData = res.data.map(formatterResData)

            dataList.push(...resData)

            if (res.data.length < requestParams.limit) {
                setloadEnd(true)
            } else {
                requestParams.page++
            }
            setLoading()
            return
        } else {
            dataList = []
            // dataList.splice(0, dataList.length)
            setloadEnd(true)
            setLoading(false)
        }

        // const formatterData = (url) => {
        // 	const name = url.replace(/(.jpg|.jpeg|.png)$/, '').split(' ')
        // 	return {
        // 		url: require('@/assets/images/list/' + url),
        // 		title: name[1] + '_' + name[0],
        // 		praise: null
        // 	}
        // }

        // const imgs = [
        // 	'1826021 关烁鹏.jpg',
        // 	'1826021 王梓骏.jpg',
        // 	'1826022 王宝柱.jpg',
        // 	'1826051 陈高思雨.jpg',
        // 	'1826051 董鑫.jpg',
        // 	'1826051 耿丽雅.jpeg',
        // 	'1826052 刘硕.jpg',
        // 	'1826052 荣燚.jpg',
        // 	'1926021 高云鹏.jpg',
        // 	'1926051 马万旭.jpg',
        // 	'1926051 邬睿奇.jpeg',
        // 	'1926501 张从儒.jpg',
        // ].map(formatterData)

        // dataList.push(...imgs)
    }

    const filterData = (ids = []) => {
        dataList = dataList.filter((i) => ids.includes(i.id))
    }

    onBeforeMount(initData)

    onMounted(() => {
        // window.addEventListener('scroll', () => {
        // 	let bottomOfWindow = document.body.scrollTop  + window.innerHeight === document.documentElement.offsetHeight;
        // 	console.log(document.body.scrollTop);
        // 	if (bottomOfWindow) {
        // 		// Do something, anything!
        // 		console.log('bottomOfWindow');
        // 	}
        // })
    })
    // 返回数据

    return {
        loading,
        loadEnd,
        dataList, // 当前数据源
        nextPage, // 获取数据
        initData,
        setloadEnd,
        setReqParams,
        params: requestParams,
        filterData
    }
}
