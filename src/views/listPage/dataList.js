// 这个文件负责管理数据和逻辑处理

import { onBeforeMount, onMounted,ref, reactive } from 'vue'
import {get} from '@/api'
import _interface from '@/api/interface'

export default function() {
	let dataList = reactive([])
    const loading = ref(false)
    const setLoading = bl => loading.value = !!bl;
	let requestParams = reactive({
        name: '',
		page: 1, // 第几页
		limit: 10 // 每页条数
	})

	const setReqParams = (params) => {
		requestParams = {
			...requestParams,
            ...params,
            nodeId: 1
		}
	}

	const getData = async () => {
        setLoading(true)
        const res = await get(_interface.listPageData, requestParams)
		if (res.code === 0) {
            const formatterResData = (item) => {
                return {
                    title: item.name,
                    url: item.cover,
                    readNum: item.readNum,
                    praise: item.showNumber
                }
            }
			dataList.push(...res.data.map(formatterResData))
			requestParams.page++
            setLoading()
            return
        }

      
		const formatterData = (url) => {
            const name = url.replace(/(.jpg|.jpeg|.png)$/, '').split(' ')
			return {
				url: require('@/assets/images/list/' + url),
				title: name[1]+'_'+name[0],
				praise: null
			}
		}

		const imgs = [
			'1826021 关烁鹏.jpg',
			'1826021 王梓骏.jpg',
			'1826022 王宝柱.jpg',
			'1826051 陈高思雨.jpg',
			'1826051 董鑫.jpg',
            '1826051 耿丽雅.jpeg',
            '1826052 刘硕.jpg',
            '1826052 荣燚.jpg',
            '1926021 高云鹏.jpg',
            '1926051 马万旭.jpg',
            '1926051 邬睿奇.jpeg',
            '1926501 张从儒.jpg',
        ].map(formatterData)
        
		dataList.push(...imgs)
	}

	const filterData = (ids = []) => {
		dataList = dataList.filter((i) => ids.includes(i.id))
	}

	onBeforeMount(getData)


    onMounted(() => {
            window.addEventListener('scroll',()=>{
                
            })
    })
	// 返回数据

	return {
		dataList, // 当前数据源
		getData, // 获取数据
        loading,
		setReqParams,
        params: requestParams,
		filterData
	}
}
