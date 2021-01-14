<template>
	<div class="listPage">
		<!-- <div class="wrap">
			<div v-for="(item, index) in dataList" :key="index" class="item">
				<img :src="item.url" alt="" />
				<h4>{{ item.title }}</h4>
			</div>
		</div> -->
		<a-row>
			<a-col :span="16">
				<waterFall
					gap="10px"
					width="172px"
					class="container"
					:data="dataList"
					:delay="true"
				>
					<template #default="item">
						<div :key="item.id" class="item card">
							<img class="img" :src="item.url" alt="" />
							<h4>{{ item.title }}</h4>
						</div>
					</template>
				</waterFall>
			</a-col>
			<a-col :span="8"> {{ dataList }}</a-col>
		</a-row>
		<!-- 
		<div class="listContent" :ref="listContent">
		
		</div> -->

		<a-button @click="getData">
			加载更多
		</a-button>
		<a-spin size="large" />
	</div>
</template>
/
<script>
import useDataList from '@/views/listPage/dataList'

import { onMounted,ref } from 'vue'

import waterFall from '@/components/waterfall/water-fall'

export default {
	components: {
		waterFall
	},

	setup() {
		const pageNum = ref(0)
		const { dataList, getData, setReqParams } = useDataList()

		onMounted(() => {})

		const startPage = () => {
			setReqParams({ currentPage: pageNum })
			getData()
		}

		return {
			dataList,
			getData,
			startPage,
			pageNum
		}
	}
}
</script>

<style lang="less" scoped>
.listPage {
	max-width: 1200px;
	margin: 0 auto;
}

.listContent {
	width: 800px;
}
.container {
}

.card {
	padding: 10px;
	background-color: white;
	border-radius: 3px;
	color: #666;
	line-height: 1.5;
	word-break: break-all;
	.img {
		width: 100%;
		margin-bottom: 5px;
		cursor: pointer;
	}
}
.wrap {
	// columns: 4;
	// column-gap: 30px;
	position: relative;
}

// .item {
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// }

.item {
	// width: 100%;
	// break-inside: avoid;
	// img{
	//     width: 100%;
	//     max-height: 200px;
	// }
}
// .wrap {
// 	display: flex;
// 	flex-flow: column wrap;
// 	height: auto;
// 	width: 100%;
// }
// .item {
// 	margin: 10px;
// 	width: calc(100% / 8 - 20px);
// }
// .item img {
// 	width: 100%;
// }
</style>
