import { onBeforeMount, reactive, ref } from 'vue'
import { get } from '@/api'
import _interface from '@/api/interface'
export default function() {
    const list = reactive([])
    const loading = ref(true)
    const setLoading = bl => loading.value = !!bl
    const getHomeData = async ()=>{

        try {
            const res = await get(_interface.homePage)

            if(res.code === 0){
                list.push(...res.data.map(item=>{
                    return {
                        url: item.cover,
                        title: item.name
                    }
                }))
                setLoading()
            }
        } catch (error) {
            console.log(error);
        }


    } 

    onBeforeMount(getHomeData)


    return {
        loading,
        list
	}
}