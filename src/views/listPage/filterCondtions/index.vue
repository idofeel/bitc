<template>
	<div class="filterContainer">
		<div v-for="(item, index) in condtions" :key="index">
			<h3>{{ item.title }}</h3>
			<div class="btns">
				<a-button
					v-for="(tag, idx) in item.tags"
					:key="idx"
					class="btn"
					:type="tag.checked ? 'primary' : 'default'"
					@click="tag.checked = !tag.checked"
				>
					{{ tag.name }}
				</a-button>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue'
export default {
	components: {},
	setup() {
		const condtions = reactive([
			{
				title: '活动专题',
				tags: [
                    { name: '抗疫有我 为爱发声', id: 1, checked: false },
                    { name: '行读', id: 2, checked: false },
                    { name: '经典朗诵', id: 3, checked: false },
                ]
            },
            {
				title: '班级',
				tags: [
                    { name: '1826021', id: '1826021', checked: false },
                    { name: '1826022', id: '1826022', checked: false },
                    { name: '1826051', id: '1826051', checked: false },
                    { name: '1826052', id: '1826052', checked: false },
                    { name: '1926021', id: '1926021', checked: false },
                    { name: '1926051', id: '1926051', checked: false },
                ]
			},
            {
				title: '时间',
				tags: [
                    { name: '2018年', id: '2018', checked: false },
                    { name: '2019年', id: '2019', checked: false },
                    { name: '2020年', id: '2020', checked: false },
                    { name: '2021年', id: '2021', checked: false },
                ]
			}
		])

		return { condtions }
	}
}
</script>

<style lang="less" scoped>
.filterContainer {
	text-align: left;
	padding: 0 10px;

	h3 {
        margin-top: 20px;
		font-weight: 600;
	}

	.btns {
		.btn {
			margin: 5px;
        }
	}
}
</style>
