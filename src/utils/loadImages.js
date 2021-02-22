function preload(img) {
	if (img.complete) return Promise.resolve(true)
	return new Promise((resolve) => {
		img.onload = resolve
		img.onerror = resolve
	})
}

export default (images) => {
	return Promise.all([...images].map((img) => preload(img)))
}

export function getImgInfo(url) {
	if (!url) return []
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = url
		const run = () => {
			if (img.width > 0 || img.height > 0) {
				resolve({
					originWidth: img.width,
                    originHeight: img.height,
                    url
				})
			} else {
				window.requestAnimationFrame(run)
			}
		}
        img.onerror = reject
		run()
	})
}
