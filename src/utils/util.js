export function finMinIndex(arr) {
	let min = 0
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[min]) min = i
	}
	return min
}

export function getDefaultArr(colNum = 1, initail = () => 0, arr = []) {
	if (arr.length < colNum) {
		arr.push(initail())
		return getDefaultArr(colNum, initail, arr)
	}
	return arr
}

export function autoUnit(unit) {
	return /^\d*$/.test(unit) ? `${unit}px` : unit
}

export function mergeData(newData = [], oldData = []) {
	newData.forEach((item, i) => {
		const oldItem = oldData[i] || {}
		oldItem.id === item.id && (newData[i] = oldItem)
	})
	return newData
}

export function getAverage(total, baseNum, gap = 0) {
	let maxCount = Math.round(total / baseNum)

	const space = ((maxCount + 1) * gap) / 2

	return Math.floor((total - space) / maxCount)
}

var sqls = [
	window.matchMedia('(max-width:418px)'), //和CSS一样，也要注意顺序！
	window.matchMedia('(max-width:768px)'),
	window.matchMedia('(max-width:992px)'),
	window.matchMedia('(max-width:1200px)')
]

export function mediaMatches() {
	if (sqls[0].matches) {
		console.log('<=418') //do something...
	} else if (sqls[1].matches) {
		console.log('>418 & <=768') // do something...
	} else if (sqls[2].matches) {
		console.log('>768 & <=992') // do something...
	} else if (sqls[3].matches) {
		console.log('> 992 & <=1200') // do something...
	} else {
		console.log('>1200')
	}
}
mediaMatches() //页面首次加载

for (var i = 0; i < sqls.length; i++) {
	sqls[i].addListener(mediaMatches)
}

