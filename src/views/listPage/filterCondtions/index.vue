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
                >{{ tag.name }}</a-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        condtions: {
            type: Array,
            default: () => []
        }
    },
    setup() {
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
