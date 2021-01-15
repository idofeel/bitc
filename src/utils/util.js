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

    let maxCount = Math.floor(total / baseNum)
    
    const space = (maxCount + 1) * gap / 2
    
	return  Math.floor((total - space ) / maxCount)
}
