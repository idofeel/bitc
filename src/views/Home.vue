<template>
	<div class="home" :ref="listDom">
		<Vue3Barrel
			:data="list"
			:baseHeight="320"
			gap="20"
			class="barrelLayout xs-hide"
		>
			<template #default="item">
				<div
					:style="
						`width:${item.width}px;height:${
							item.height
						}px;padding:${item.margin / 2}px`
					"
					@click="$router.push('/list')"
				>
					<img :src="item.src" alt="" />
				</div>
			</template>
		</Vue3Barrel>

        <!-- ass -->
		<waterFall
            v-if="waterfallWidth > 0"
			gap="10"
			:width="waterfallWidth"
			:data="list"
			:delay="true"
			class="waterFallLayout xs-show"
		>
			<template #default="item">
				<div :key="item.id" class="item card">
					<img :src="item.url" alt="" />
				</div>
			</template>
		</waterFall>
	</div>
</template>
<script>
import { onMounted, ref } from 'vue'
import Vue3Barrel from 'vue3-barrel'
import { mediaMatches, getAverage } from '@/utils/util'


import waterFall from '@/components/waterfall/water-fall'
mediaMatches()
export default {
	name: 'Home',
	components: {
		Vue3Barrel,
		waterFall
	},
	setup() {
		const waterfallWidth = ref(0)
		let listRef = null
		const listDom = (el) => {
			listRef = el
		}
		const list = ref([
			{
				url: require('@/assets/images/有声数据库.jpeg'),
				title: '标题标题'
			},
			{
				url: require('@/assets/images/抗疫有我为爱发声.jpeg'),
				title: '三叶巫女'
			},
			{
				url: require('@/assets/images/经典诵读.jpeg'),
				title: '标题标题'
			},
			{ url: require('@/assets/images/行读.jpeg'), title: '标题标题' },

			{
				url: require('@/assets/images/敬请期待.jpeg'),
				title: '标题标题'
			}
		])
		function layoutResize() {
            if (!listRef.offsetWidth) return
            // 设置瀑布流单个的宽度
			waterfallWidth.value = getAverage(listRef.offsetWidth, 172, 20)
		}
		onMounted(() => {
            layoutResize()
			window.addEventListener('resize', layoutResize)
		})

		return {
			list,
			waterfallWidth,
			listDom
		}
	}
}
</script>

<style lang="less" scope>
@media screen and(min-width:768px) {
	.barrelLayout {
		max-width: 1200px;
		margin: 0 auto;
		text-align: left;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
		.wrap {
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			& > div {
				position: relative;
				margin: 10px;
				&:hover {
					box-shadow: 0 0 20px #fff;
					z-index: 9999;
				}
			}
			& img {
				height: 300px;
				background: rgb(248, 248, 248);
				flex-grow: 1;
				object-fit: cover;
				transition: 0.3s;
				cursor: pointer;
			}
			&:after {
				display: block;
				content: '';
				flex-grow: 9999;
			}

			h4 {
				text-align: left;
				position: absolute;
				bottom: 0;
				padding: 10px 20px;
				color: #fff;
				background: rgba(0, 0, 0, 0.199);
				width: 100%;
				margin-bottom: 0;
				box-sizing: border-box;
			}
		}
	}
}

.waterFallLayout {
	img {
		width: 100%;
		height: 100%;
	}
}

@media screen and( max-width:768px) {
	.barrelLayout {
		.wrap {
			display: flex;
			flex-flow: column wrap;
			flex-direction: column;
			height: 600px;
		}
		.item {
			margin: 10px;
			width: calc(100% / 2 - 20px);
			box-shadow: 0 0 6px 2px #f5f5f5;
			border-radius: 8px;
		}
		.item img {
			width: 100%;
			background: #fff;
		}
		h4 {
			text-align: left;
			padding: 10px;
			margin-bottom: 0;
		}
	}
}

.ant-btn {
	border-radius: 6px;
}
</style>
