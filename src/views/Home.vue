<template>
	<div class="home">
		<div class="wrap">
			<div>
				<img
					:src="require('@/assets/images/' + item.src)"
					alt=""
					v-for="item in list"
					:key="item"
				/>
			</div>
            
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
// @ is an alias to /src

// import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	setup() {
		const list = ref([
			'1.jpg',
			'6b03b6d0d1e6b62bd3e159ea701b49c1.jpeg',
			'6f8b01657e1e6aeaa1f88106ad4eb857.jpeg',
			'8a7a68a0511145df911720ef33d9d7de.jpeg',
			'9b5d8133ca266ca9ac6e0f5629c43ead.jpeg'
		])
		return {
			list
		}
	}
}
</script>

<style lang="less" scope>
.home {
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
	}
	.wrap img {
		margin: 3px;
		padding: 5px;
		height: 280px;
		background: rgb(243, 243, 243);
		flex-grow: 1;
		object-fit: cover;
		transition: 0.3s;
		cursor: pointer;
	}
	.wrap:after {
		display: block;
		content: '';
		flex-grow: 9999;
	}
	.wrap img:hover {
		transform: scale(1.2);
		box-shadow: 0 0 20px #fff;
		z-index: 9999;
	}
}
</style>
