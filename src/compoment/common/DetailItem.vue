<template>
    <div>
        <div><van-tag round type="primary" size="large" color="#FAF7EC" text-color="#E29147">上午</van-tag></div>
        <h3>{{ item.morning.spot }}</h3>
        <div>
        <div><van-icon name="underway-o" /> {{ item.morning.duration }}小时 {{ item.morning.ticket }}元 {{ item.morning.transportation }} </div>
        <p>{{ item.morning.description }}</p>
        </div>
    </div>
    <div>
        <div><van-tag round type="primary" size="large" color="#E7F6FF" text-color="#6290DD">下午</van-tag></div>
        <h3>{{ item.afternoon.spot }}</h3>
        <div>
        <div><van-icon name="underway-o" /> {{ item.afternoon.duration }}小时 {{ item.afternoon.ticket }}元 {{ item.afternoon.transportation }} </div>
        <p>{{ item.afternoon.description }}</p>
        </div>
    </div>
    <div>
        <div><van-tag round type="primary" size="large" color="#E4FFE2" text-color="#88C354">晚上</van-tag></div>
        <h3>{{ item.evening.spot }}</h3>
        <div>
        <div><van-icon name="underway-o" /> {{ item.evening.duration }}小时 {{ item.evening.ticket }}元 {{ item.evening.transportation }} </div>
        <p>{{ item.evening.description }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        item: {
            type: Object,
            default: () => ({})
        }
    })
</script>

<style lang="less">

    .travel-detail-main{
        padding: 10px;
        height: calc(100% - 100px);
        overflow: auto;

        :deep(.van-collapse-item .van-cell__title span){
            font-size: 15px!important;
        }

        .van-tag{
            margin-bottom: 10px;
            font-size: 16px;
        }

        h3{
            font-size: 16px;
            font-weight: 900;
            color: #333;
            margin-bottom: 10px;
        }
    }

    .travel-detail {
        // padding-bottom: 60px;
        .van-collapse-item__content div{
            margin-bottom: 10px;
        }
    }
</style>