import { onBeforeMount, reactive, toRefs } from 'vue'
import { get } from '@/api'
import _interface from '@/api/interface'
export default function () {
    const condtions = reactive([{
        title: '活动专题',
        tags: [
            // { name: '抗疫有我 为爱发声', id: 1, checked: false },
            // { name: '行读', id: 2, checked: false },
            // { name: '经典朗诵', id: 3, checked: false }
        ]
    },
    {
        title: '班级',
        tags: [
            // { name: '1826021', id: '1826021', checked: false },
            // { name: '1826022', id: '1826022', checked: false },
            // { name: '1826051', id: '1826051', checked: false },
            // { name: '1826052', id: '1826052', checked: false },
            // { name: '1926021', id: '1926021', checked: false },
            // { name: '1926051', id: '1926051', checked: false }
        ]
    },
    {
        title: '院系',
        tags: [
            // { name: '2018年', id: '2018', checked: false },
            // { name: '2019年', id: '2019', checked: false },
            // { name: '2020年', id: '2020', checked: false },
            // { name: '2021年', id: '2021', checked: false }
        ]
    }])

    const loading = reactive({
        themeLoading: false,
        gradeLoading: false,
        collegeLoading: false,
    })

    const formatterData = (data, index) => {
        return {
            name: data,
            id: data + index,
            checked: false
        }
    }

    const getThemeData = async () => {
        try {
            condtions[0].loading = true
            const res = await get(_interface.theme)

            if (res.code === 0) {
                condtions[0].tags = res.data.map(formatterData)
                // 
            }
        } catch (error) {
            console.log(error);
        } finally {
            condtions[0].loading = false
        }
    }
    const getGradeData = async () => {
        try {
            condtions[1].loading = true

            const res = await get(_interface.grade)

            if (res.code === 0) {
                condtions[1].tags = res.data.map(formatterData)
                // 
            }
        } catch (error) {
            console.log(error);
        } finally {
            condtions[1].loading = false
        }
    }
    const getCollegeData = async () => {
        try {
            condtions[2].loading = true
            const res = await get(_interface.college)

            if (res.code === 0) {
                condtions[2].tags = res.data.map(formatterData)
                // 
            }
        } catch (error) {
            console.log(error);
        } finally {
            condtions[2].loading = false
        }
    }



    function getData () {
        getThemeData()
        getGradeData()
        getCollegeData()

    }


    onBeforeMount(getData)


    return {
        ...toRefs(loading),
        condtions
    }
}