import { reactive, toRefs, ref, onMounted, onBeforeMount, nextTick } from 'vue'
import { debounce } from '@halobear/utils/throttle-debounce'
import WaterFallData from '@/utils/WaterFallData'

export default (itemWidth, data = []) => {
    const state = reactive({
        list: data, // 瀑布流数据源
        containerWidth: '100%',
        containerHeight: 0,
        itemWidth
    })

    const container = ref(null) // 父元素
    let waterfall = null // 瀑布流数据管理
    let colNum = 1

    const handleData = async ({ data, containerHeight }) => {
        // 加载更多谷歌浏览器自动滚动到底部
        const oldScrollY = window.scrollY
        state.list =
            state.list.length > data.length ? [...data, ...state.list.slice(data.length)] : data
        state.containerHeight = containerHeight
        await nextTick()
        window.scrollTo({ top: oldScrollY })
    }

    const initData = (optionData) => {
        if (!waterfall) return
        handleData(waterfall.init(optionData))
    }

    const setContainerWidth = () => {
        if (!container.value) return;
        colNum = Math.floor(container.value.clientWidth / state.itemWidth) || 1
        state.containerWidth = `${colNum * state.itemWidth}px`
    }

    const initWaterFall = () => {
        setContainerWidth()
        waterfall = new WaterFallData(state.itemWidth, colNum)
    }

    const windowResize = debounce(() => {
        if (!waterfall) return
        setContainerWidth()
        handleData(waterfall.resize(state.itemWidth, colNum))
    })

    onMounted(() => {
        initWaterFall()
        window.addEventListener('resize', windowResize)
    })

    onBeforeMount(() => {
        window.removeEventListener('resize', windowResize)
    })

    return {
        ...toRefs(state),
        container,
        initData,
        setState: (list) => {
            state.list = list
            if (list.length === 0) {
                waterfall.data = []
            }
        },
    }
}
