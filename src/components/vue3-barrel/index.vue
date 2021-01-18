<template>
	<div ref="container">
		<img
			v-for="(item, index) in barrelData"
			:src="item.src"
			alt=""
			:key="index"
			:style="`width:${item.width}px;height:${item.height}px;margin:${item.margin}px`"
		/>
	</div>
</template>

<script>
import userBarrel from './useBarrel'

export default {
	props: {
		data: {
			type: Array,
			default: () => []
		},
		props: {
			type: Object,
			default: () => ({
				url: 'url'
			})
		},
		baseHeight: {
			type: Number,
			default: 250
        },
        gap: {
			type: Number,
			default: 10
        },
	},
	setup(props) {
		const { barrelData, container } = userBarrel({
			...props,
			data: props.data.map((i) => {
				i.url = require('@/assets/images/' + i.url)
				return i
			})
		})

		//    const data =  await getImgInfo(require('@/assets/images/敬请期待.jpeg'))

		return {
			barrelData,
			container
		}
	}
}
</script>

<style lang="scss" scoped></style>
