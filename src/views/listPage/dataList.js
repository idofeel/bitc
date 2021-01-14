// 这个文件负责管理数据和逻辑处理

import { onBeforeMount,  reactive } from 'vue'
import request from '@/api'

const { post } = request

export default function() {
	const dataList = reactive([])

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
		const res = await post('/list', requestParams)
		if (res.success) {
            dataList.push(...res.data)
			requestParams.currentPage++
		}
		return dataList
	}

	onBeforeMount(getData)
	// 返回数据

	return {
		dataList,
		getData,
		setReqParams
	}
}
