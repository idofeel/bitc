<template>
    <div class="video_container">
        <div class="lg_container">
            <h3>正在播放：{{data.name}}</h3>

            <div class="video_box">
                <video controls :src="data.contentUrl"></video>
            </div>
            <div class="video_intro">
                <h4>{{data.name}}</h4>
                <div class="content_intro">
                    <span class="mr20">
                        内容简介
                        <CaretDownOutlined />
                    </span>
                    <a-tag color="#f50" v-if="data.keywords">{{item.keywords}}</a-tag>
                </div>
                <div>
                    <Descriptions class="video_desc" size="middle">

                        <DescriptionsItem>作者：{{data.author}}</DescriptionsItem>
                        <DescriptionsItem>主题：{{data.theme}}</DescriptionsItem>
                        <DescriptionsItem span="2">简介：{{data.content}}</DescriptionsItem>
                    </Descriptions>
                </div>
            </div>
        </div>
    </div>
    <div class="lg_container">
        <CommentSection />
    </div>
</template>

<script>
import { Descriptions } from 'ant-design-vue'
import { DescriptionsItem } from 'ant-design-vue/lib/descriptions'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useRoute } from "vue-router";
import CommentSection from './CommentSection.vue'
import useDetails  from '@/views/dataSource/useDetails.js'

export default {
    components: {
        Descriptions,
        DescriptionsItem,
        CaretDownOutlined,
        CommentSection
    },
    setup() {
        const router = useRoute();
        const { data } = useDetails(router.query.id)

        return {data}
    }
}
</script>

<style lang="less" scoped>
.lg_container{
    padding: 0 10px;
}
.video_container {
    text-align: left;
    background: #191a20;
    padding: 20px 0;
    h3,
    h4 {
        color: #fff;
    }
    .video_box {
        background: #000;
        text-align: center;
        video {
            max-height: 744px;
            min-width: 100%;
            &:focus {
                outline: none;
            }
        }
    }
    .video_intro {
        color: #fff;
        h4 {
            margin: 0;
            padding: 12px 0;
            font-weight: 600;
            font-size: 18px;
        }
        /deep/.video_desc {
            margin-top: 10px;
            .ant-descriptions-title,
            .ant-descriptions-item-label,
            .ant-descriptions-item-content {
                color: #fff;
            }
        }
    }

    .content_intro {
        padding: 10px 0;
        border-bottom: 1px solid #27272c;
    }
}
</style>