<template>
    <div class="video_container">
        <div class="lg_container">
            <h3>正在播放：标题标题</h3>

            <div class="video_box">
                <audio controls src="https://www.w3school.com.cn/i/movie.ogg"></audio>
            </div>
            <div class="video_intro">
                <h4>这是1个标题</h4>
                <div class="content_intro">
                    <span class="mr20">
                        内容简介
                        <CaretDownOutlined />
                    </span>
                    <a-tag color="#f50">标签1</a-tag>
                    <a-tag color="#f50">标签2</a-tag>
                    <a-tag color="#f50">标签3</a-tag>
                    <a-tag color="#f50">标签4</a-tag>
                </div>
                <div>
                    <Descriptions class="video_desc" size="middle">
                        <DescriptionsItem>提名：xx</DescriptionsItem>
                        <DescriptionsItem span="2">责任者：xxx</DescriptionsItem>
                        <DescriptionsItem span="2">简介：嘻嘻嘻嘻嘻嘻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻</DescriptionsItem>
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
import CommentSection from './CommentSection.vue'
export default {
    components: {
        Descriptions,
        DescriptionsItem,
        CaretDownOutlined,
        CommentSection
    },
    setup() {


        return {}
    }
}
</script>

<style lang="less" scoped>
.lg_container{
    padding: 0 10px;
}
.video_container {
    text-align: left;
    padding: 20px 0;
    h3,
    h4 {
        color: #fff;
    }
    .video_box {
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