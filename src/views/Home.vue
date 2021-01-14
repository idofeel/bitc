<template>
	<div class="home">
		<div class="wrap">
			<div v-for="(item, index) in list" :key="index" class="item">
				<img :src="require('@/assets/images/' + item.url)" alt="" />
				<h4>{{ item.title }}</h4>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'

export default {
	name: 'Home',
	setup() {
		
        
        
		const list = ref([
			{ url: '1.jpg', title: '三叶巫女' },
			{ url: '6b03b6d0d1e6b62bd3e159ea701b49c1.jpeg', title: '标题标题' },
			{ url: '6f8b01657e1e6aeaa1f88106ad4eb857.jpeg', title: '标题标题' },
			{ url: '8a7a68a0511145df911720ef33d9d7de.jpeg', title: '标题标题' },
			{ url: '9b5d8133ca266ca9ac6e0f5629c43ead.jpeg', title: '标题标题' }
		])
		return {
			list
		}
    },
}
</script>

<style lang="less" scope>
// @import './home.less';
</style>
