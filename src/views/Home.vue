<template>
	<div class="home">

		<Vue3Barrel :data="list">
            
			<template #default="item">
				<div
					:style="
						`width:${item.width}px;height:${
							item.height
						}px;margin:${item.margin / 2}px`
					"
				>
					<img :src="item.src" alt="" style="width:100%" />
				</div>
			</template>
            
		</Vue3Barrel>

		<!-- <div class="wrap" @click="$router.push('/list')">
			<div v-for="(item, index) in list" :key="index" class="item">
				<img :src="require('@/assets/images/' + item.url)" alt="" />
				<h4>{{ item.url.split('.jpeg')[0] }}</h4>
			</div>
		</div> -->
	</div>
</template>

<script>
import { ref } from 'vue'
import Vue3Barrel from 'barrel-vue3'


export default {
	name: 'Home',
	components: {
		Vue3Barrel
	},
	setup() {
		const list = ref([
			// { url: '抗疫有我为爱发声.jpeg', title: '三叶巫女' },
			// { url: '经典诵读.jpeg', title: '标题标题' },
			// { url: '行读.jpeg', title: '标题标题' },
			// { url: '有声数据库.jpeg', title: '标题标题' },
			// { url: '敬请期待.jpeg', title: '标题标题' },
			{
				url:
					'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
				title: '标题标题'
			},
			{
				url:
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa2.att.hudong.com%2F27%2F81%2F01200000194677136358818023076.jpg&refer=http%3A%2F%2Fa2.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613554112&t=4fecf12e0fbca98667b9565f6489962d',
				title: '标题标题'
			},
			{
				url:
					'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1089874897,1268118658&fm=26&gp=0.jpg',
				title: '标题标题'
			},
			{
				url:
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2853553659,1775735885&fm=26&gp=0.jpg',
				title: '标题标题'
			},
			{
				url:
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs9.sinaimg.cn%2Fbmiddle%2F5ceba31bg5d6503750788&refer=http%3A%2F%2Fs9.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613554112&t=afcba622f562489529f07a7cbc68879c',
				title: '标题标题'
			},
			{
				url:
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fa3.att.hudong.com%2F02%2F38%2F01300000237560123245382609951.jpg&refer=http%3A%2F%2Fa3.att.hudong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613554112&t=5a671def53664b0718a65f8a526dcccb',
				title: '标题标题'
			},
			{
				url:
					'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/5366d0160924ab18c1375d8835fae6cd7b890b6f.jpg',
				title: '标题标题'
			}
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
			// { url: '', title: '标题标题' },
		])
		return {
			list
		}
	}
}
</script>

<style lang="less" scope>
@media screen and(min-width:768px) {
	.home {
		// max-width: 1200px;
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

@media screen and( max-width:768px) {
	.home {
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
