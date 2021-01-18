// function getImgInfo(url) {
// 	if (!url) return []
// 	return new Promise((resolve, reject) => {
// 		const img = new Image()
// 		img.src = url
// 		const run = () => {
// 			if (img.width > 0 || img.height > 0) {
// 				resolve({
// 					width: img.width,
// 					height: img.height,
// 					src: url
// 				})
// 			} else {
// 				window.requestAnimationFrame(run)
// 			}
// 		}
// 		run()
// 	})
// }

import { onMounted, reactive, ref, nextTick } from 'vue'

export default function(props) {
	const { baseHeight } = props

	const container = ref(null) // 父元素

	let barrelData = reactive([])

	const totalWidth = ref(0)

	function getImgInfo(url) {
		if (!url) return []
		return new Promise((resolve) => {
			const img = new Image()
			img.src = url
			let timer = null
			const run = () => {
				if (img.width > 0 || img.height > 0) {
					window.cancelAnimationFrame(timer)
					resolve({
						width: img.width,
						height: img.height,
						realWidth: img.width,
						realHeight: img.height,
						src: url
					})
				} else {
					timer = window.requestAnimationFrame(run)
				}
			}
			run()
		})
	}

	const getBarrelData = (bdata, CWitdh = container.value.clientWidth) => {
		if (!bdata || !bdata.length) return []
		const tWidth = bdata.reduce((prev, curr) => (prev += curr.width), 0)
		const newHeight = bdata[0].height / (tWidth / CWitdh)
		return mapStandardScle(bdata, newHeight)
	}

	const mapStandardScle = (bdata, newBaseHeight = baseHeight) => {
		return bdata.map((i) => getStandardScale(i, newBaseHeight))
	}

	const getStandardScale = (imgData, newBaseHeight = baseHeight) => {
		const imgRatio = imgData.height / newBaseHeight
		const tofixe2 = (num) => Math.floor(num * 100) / 100
		return {
			...imgData,
			width: tofixe2(imgData.width / imgRatio),
			height: tofixe2(newBaseHeight),
			margin: props.gap * 0
		}
	}

	const getImageData = Promise.all(
		props.data.map(async (item) =>
			getStandardScale(await getImgInfo(item[props.props.url]))
		)
	)

	const setBarrelData = async (CWitdh) => {
		// 初始化数据
		const initData = await getImageData
		let RowWidth = 0
		let tempBarrel = []
		const newBarrelData = []
		initData.forEach((item) => {
			RowWidth += item.width

			if (RowWidth > CWitdh) {
				// 行宽大于容器宽度，以高度差决定是否在当前行展示
				const MaxHeight = (RowWidth / CWitdh) * baseHeight
				const MinHeight =
					((RowWidth - item.width) / CWitdh) * baseHeight

				const MIN_H = baseHeight - MinHeight
				const MAX_H = MaxHeight - baseHeight

				if (MIN_H > MAX_H) {
					// 超出的元素离基础值较近
					tempBarrel.push(item)
					newBarrelData.push(...getBarrelData(tempBarrel, CWitdh))
					RowWidth = 0
					tempBarrel = []
					// return
				} else {
					newBarrelData.push(...getBarrelData(tempBarrel, CWitdh))
					tempBarrel = [item]
					RowWidth = item.width
				}
				return
			}

			tempBarrel.push(item)
		})

		if (RowWidth > 0) {
			newBarrelData.push(...mapStandardScle(tempBarrel))
		}

		barrelData.splice(0, barrelData.length)
		barrelData.push(...newBarrelData)
		// 可能会出现滚动条
		nextTick(initBarrel)
	}

	const initBarrel = () => {
		// barrelData.splice(0, barrelData.length)
		if (container.value.clientWidth !== totalWidth.value) {
			totalWidth.value = container.value.clientWidth
			setBarrelData(totalWidth.value)
		}
	}
	onMounted(() => {
		initBarrel()
		//
		window.addEventListener('resize', debounce(initBarrel))
	})

	return {
		barrelData,
		container
	}
}


function t() {
	for (var t = 0, r = 0, e = arguments.length; r < e; r++)
		t += arguments[r].length
	var n = Array(t),
		o = 0
	for (r = 0; r < e; r++)
		for (var l = arguments[r], u = 0, i = l.length; u < i; u++, o++)
			n[o] = l[u]
	return n
}
const debounce = function(r, e) {
    var n
    return (
        void 0 === e && (e = 300),
        function() {
            for (var o = this, l = [], u = 0; u < arguments.length; u++)
                l[u] = arguments[u]
            n && clearTimeout(n),
                (n = setTimeout(function() {
                    r.call.apply(r, t([o], l)), (n = null)
                }, e))
        }
    )
}