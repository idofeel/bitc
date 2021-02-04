<template>
	<div class="listPage">
		<div id="nav">
			<img
				:src="require('@/assets/logo1.png')"
				class="logo xs-hide"
				alt=""
			/>
			<img
				:src="require('@/assets/logo2.png')"
				class="logo xs-show"
				alt=""
			/>
			<!-- <router-link to="/">Home</router-link> |
		<router-link to="/list">list</router-link> -->
		</div>
		<a-row>
			<a-col :xs="24" :lg="16" :md="18" :ref="listDom">
				<div class="header">
					<b></b>
					<a-input-search
						v-model:value="value"
						placeholder="请输入关键词"
						@search="onSearch"
					/>
					<span></span>

					<FilterOutlined
						@click="toggleDrawerVis"
						class="filterIcon xs-show"
					/>
				</div>
				<a-image-preview-group>
					<waterFall
						gap="10"
						:width="waterfallWidth"
						:data="dataList"
						:delay="true"
					>
						<template #default="item">
							<div :key="item.id" class="item card">
								<a-image
									class="img"
									:src="
										require('@/assets/images/list/' +
											item.url)
									"
									placeholder
								/>
								<h4>{{ item.title }}</h4>
								<div
									class="item_tags"
									v-if="item.tags && item.tags.length"
								>
									<a-tag
										color="blue"
										class="bitc_tag"
										v-for="(tag, index) in item.tags"
										:key="index"
									>
										{{ tag }}
									</a-tag>
								</div>
								<div class="praise_icons">
									<div class="iconfont ">
										<svg
											t="1610680034604"
											class="icon"
											fill="currentColor"
											viewBox="64 64 896 896"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											p-id="1491"
											width="1em"
											height="1em"
										>
											<path
												d="M660.8 430.4c1.6 0 4.8 0 6.4-1.6 8-3.2 11.2-12.8 8-20.8-4.8-11.2-11.2-22.4-19.2-33.6-4.8-6.4-16-8-22.4-3.2-6.4 4.8-8 16-3.2 22.4 6.4 8 11.2 17.6 16 27.2 3.2 4.8 8 9.6 14.4 9.6zM606.4 332.8c-24-12.8-49.6-19.2-75.2-19.2-36.8 0-72 12.8-99.2 35.2-6.4 4.8-8 16-3.2 22.4 3.2 3.2 8 6.4 12.8 6.4 3.2 0 6.4-1.6 9.6-3.2 40-32 96-36.8 140.8-12.8 8 4.8 17.6 1.6 22.4-6.4 1.6-9.6-1.6-19.2-8-22.4z"
												p-id="1492"
											></path>
											<path
												d="M785.6 510.4v-44.8c0-145.6-118.4-264-264-264S257.6 320 257.6 465.6v44.8c-48 14.4-80 57.6-80 107.2v80c0 62.4 49.6 112 112 112s112-49.6 112-112v-80c0-49.6-32-92.8-80-107.2v-44.8c0-110.4 89.6-200 200-200s200 89.6 200 200v44.8c-48 14.4-80 57.6-80 107.2v80c0 62.4 49.6 112 112 112s112-49.6 112-112v-80c0-49.6-32-92.8-80-107.2z m-448 107.2v80c0 27.2-20.8 48-48 48s-48-20.8-48-48v-80c0-27.2 20.8-48 48-48s48 20.8 48 48z m464 80c0 27.2-20.8 48-48 48s-48-20.8-48-48v-80c0-27.2 20.8-48 48-48s48 20.8 48 48v80z"
												p-id="1493"
											></path>
										</svg>
									</div>
									<div class="like">
										<LikeOutlined color="red" />
										{{ item.praise }}
									</div>
								</div>
							</div>
						</template>
					</waterFall>
				</a-image-preview-group>
				<!-- <a-button @click="getData">
					加载更多
				</a-button> -->
			</a-col>
			<a-col :span="8" class="xs-hide">
				<FilterCondtions />
			</a-col>
			<Drawer
				title="筛选条件"
				:visible="drawerVisible"
				placement="right"
				width="320"
				@close="toggleDrawerVis(false)"
			>
				<FilterCondtions />
			</Drawer>
		</a-row>

		<!-- <a-spin size="large" /> -->
	</div>
</template>
/
<script>
import { onMounted, ref } from 'vue'
import useDataList from '@/views/listPage/dataList'
import { getAverage } from '@/utils/util'
import waterFall from '@/components/waterfall/water-fall'
import { FilterOutlined, LikeOutlined } from '@ant-design/icons-vue'
import { Drawer } from 'ant-design-vue'
import FilterCondtions from './filterCondtions'

export default {
	components: {
		waterFall,
		FilterOutlined,
		Drawer,
		FilterCondtions,
		LikeOutlined
	},

	setup() {
		const { dataList, getData, setReqParams } = useDataList()
		const waterfallWidth = ref(0)
		const value = ref('')

		const drawerVisible = ref(false)
		function toggleDrawerVis(bl) {
			drawerVisible.value = bl === undefined ? !!drawerVisible.value : bl
		}
		let listRef = null
		const listDom = (el) => {
			listRef = el
		}

		onMounted(() => {
			waterfallWidth.value = getAverage(listRef.$el.offsetWidth, 172, 10)
		})

		const startPage = () => {
			setReqParams({})
			getData()
		}
		return {
			dataList,
			listDom,
			waterfallWidth,
			getData,
			startPage,
			value,
			drawerVisible,
			toggleDrawerVis
		}
	}
}
</script>

<style lang="less" scoped>
.listPage {
	max-width: 1200px;
	margin: 0 auto;
	box-sizing: border-box;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		margin-bottom: 10px;
		b {
			font-weight: 600;
			line-height: 2;
			padding: 10px;
			font-size: 18px;
		}
		.filterIcon {
			font-size: 24px;
			color: #666;
		}
		.list_saerch {
			margin-bottom: 10px;
		}

		.ant-input-search {
			box-shadow: none !important;
			width: 90%;
			border: none;
			border-bottom: 1px solid #e4e4e4;
		}
	}
}

.listContent {
	width: 800px;
}

.card {
	background-color: white;
	border-radius: 3px;
	color: #666;
	line-height: 1.5;
	word-break: break-all;
	box-shadow: 0 0 6px 2px #f5f5f5;
	border-radius: 8px;
	overflow: hidden;
	/deep/& > .ant-image {
		width: 100%;
	}
	.img {
		width: 100%;
		margin-bottom: 5px;
		cursor: pointer;
	}

	h4 {
		text-align: left;
		padding: 10px;
		margin: 0;
	}
	.item_tags {
		display: flex;
		padding: 0 10px;
		text-align: left;
		.bitc_tag {
			margin-right: 5px;
			margin-bottom: 5px;
			padding: 0 4px;
			&:last-child {
				margin-right: 0;
			}
		}
	}

	.praise_icons {
		padding: 0 10px;
		padding-bottom: 10px;
		text-align: right;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.iconfont {
			svg {
				color: #ccc;
				font-size: 16px;
				vertical-align: middle;
			}
		}
		.like {
			color: #ccc;
			cursor: pointer;
		}
	}
}
.wrap {
	position: relative;
}
</style>
