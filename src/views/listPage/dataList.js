// 这个文件负责管理数据和逻辑处理

import { onBeforeMount, reactive } from 'vue'
// import request from '@/api'

// // const { post } = request

export default function() {
	let dataList = reactive([])

	let requestParams = reactive({
		currentPage: 1,
		pageSize: 10
	})

	const setReqParams = (parmams) => {
		requestParams = {
			...requestParams,
			...parmams
		}
	}

	const getData = async () => {
		// const res = await post('/list', requestParams)
		// if (res.success) {
		// 	dataList.push(...res.data)
		// 	requestParams.currentPage++
		// }
		const formatterData = (url) => {
            const name = url.replace(/(.jpg|.jpeg|.png)$/, '').split(' ')
			return {
				url,
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
	// 返回数据

	return {
		dataList,
		getData,
		setReqParams,
		filterData
	}
}
