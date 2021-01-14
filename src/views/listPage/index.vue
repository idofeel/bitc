<template>
	<div class="listPage">
		<a-row>
			<a-col :lg="16" :xs="24">
				<div class="header">
					<b> 栏目</b>

					<a-col :sm="0">
						<FilterOutlined @click="toggleDrawerVis" />
					</a-col>
				</div>
				<a-image-preview-group>
					<waterFall
						gap="10"
						width="172px"
						:data="dataList"
						:delay="true"
					>
						<template #default="item">
							<div :key="item.id" class="item card">
								<a-image
									class="img"
									:src="item.url"
									placeholder
								/>
								<h4>{{ item.title }}</h4>
								<div class="item_tags">
									<a-tag
										color="blue"
										v-for="(tag, index) in item.tags"
										:key="index"
									>
										{{ tag }}
									</a-tag>
								</div>
                                <div class="praise_icons">
                                    <div class="like">
                                        <LikeOutlined color="red"/> {{item.praise}}
                                    </div>
                                </div>
							</div>
						</template>
					</waterFall>
				</a-image-preview-group>
				<a-button @click="getData">
					加载更多
				</a-button>
			</a-col>
			<a-col :span="8" :xs="0">
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
import waterFall from '@/components/waterfall/water-fall'
import { FilterOutlined, LikeOutlined} from '@ant-design/icons-vue'
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

		const drawerVisible = ref(false)
		function toggleDrawerVis(bl) {
			console.log(
				'🚀 ~ file: index.vue ~ line 54 ~ toggleDrawerVis ~ bl',
				bl
			)
			drawerVisible.value = bl === undefined ? !!drawerVisible.value : bl
		}
		onMounted(() => {})

		const startPage = () => {
			setReqParams({})
			getData()
		}

		return {
			dataList,
			getData,
			startPage,
			drawerVisible,
			toggleDrawerVis
		}
	}
}
</script>

<style lang="less" scoped>
.listPage {
	max-width: 1200px;
	padding: 0 10px;
	margin: 0 auto;
	box-sizing: border-box;

	.header {
		display: flex;
		justify-content: space-between;
		vertical-align: middle;
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

    .item_tags{
        margin-bottom: 20px;
    }

    .praise_icons{

    }
}
.wrap {
	position: relative;
}
</style>
