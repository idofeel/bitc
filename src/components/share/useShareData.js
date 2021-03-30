
import { ref, reactive, nextTick, onMounted } from 'vue'


import '@/assets/social-share/js/social-share.js'



export default function (props) {
    const shareVisible = ref(false)
    const config = reactive({
        sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban'],
    })

    function toggleShareVisbible (bl, shareConfig) {

        shareVisible.value = !!bl

        nextTick(() => {
            console.log(props);
            if (bl) window.socialShare('.social-share', { ...config, ...shareConfig });
        })
    }



    onMounted(() => {
        window.socialShare('.social-share', config);
    })

    return {
        shareVisible,
        toggleShareVisbible,
    }
}