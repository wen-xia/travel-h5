<template>
  <van-nav-bar 
    :title="route.query.city + '行程'" 
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div v-if="store.state.mainStore.loading" class="loading-container">
    <van-loading>
        加载中...
    </van-loading>
  </div>
  <div class="travel-detail-main" v-else>
    <div class="travel-top">
        <span>{{route.query.city}} * {{ route.query.days }}天行程</span>
        <span>预算 : {{ route.query.budget }}元</span>
    </div>
    <div class="travel-detail">
        <van-collapse v-model="activeNames" v-for="(item, index) in travelDetail.dailyItinerary" :key="index" accordion>
            <van-collapse-item :title="item.date" :name="index">
                <DetailItem :item="item" />
            </van-collapse-item>
        </van-collapse>

        <div class="budget-breakdown">
            <h3>预算明细</h3>
            <van-list
                :loading="store.state.mainStore.loading"
            >
                <van-cell v-for="(value, key, index) of travelDetail.budgetBreakdown" :key="index">
                    <span>{{ getBudgetType(key) }}</span>
                    <span>{{ value }}</span>
                </van-cell>
            </van-list>
            <div class="total-budget">
                <span>总计 : </span>
                <span>{{ getTotalBudget(travelDetail.budgetBreakdown) }}元</span>
            </div>
        </div>

        <div class="budget-tip">
            <h3>温馨提示</h3>
            <van-list
                :loading="store.state.mainStore.loading"
            >
                <van-cell v-for="(value, index) of travelDetail.tips" :key="index">
                    <span>{{ value }}</span>
                </van-cell>
            </van-list>
        </div>
    </div>
  
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import DetailItem from "./common/DetailItem.vue";


const store = useStore();
const route = useRoute();
const router = useRouter();

 onMounted(() => {
    store.dispatch('mainStore/createTravel', {
        ...route.query
    });
 });

 const travelDetail = computed(() => {
    // const localStorageDetail = JSON.parse(localStorage.getItem('travelDetail') || '{}');
    // console.log('localStorageDetail', localStorageDetail);
    return store.state.mainStore.travelDetail;
 });

 function onClickLeft(){
    console.log('route', route);
    router.back();
 }

 const activeNames = ref('1');

 function getTotalBudget(values) {
    console.log('travelDetail.budgetBreakdown', values);
    return Object.values(values).reduce((acc, cur) => acc + cur, 0);
 }

 function getBudgetType(type) {
    switch(type){
        case 'accommodation':
            return '住宿';
        case 'food':
            return '餐饮'
        case 'other':
            return '其他';
        case 'tickets':
            return '门票';
        case 'transportation':
            return '交通';
        default:
            return '未知';
    }
 }

</script>

<style scoped lang="less">
    .travel-top{
        display: flex;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid #f5f5f5;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;

        span{
            font-size: 18px;
            color: #333;

            &:first-child{
                font-weight: 800;
            }

            &:nth-child(2){
                color: #d73030;
            }
        }
    }

    .loading-container{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .budget-breakdown{
        margin-top: 20px;
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;

        .total-budget{
           font-size: 16px;
           margin-top: 10px;
           background-color: #F6F8FA;
           padding: 10px;
           display: flex;
           justify-content: space-between;
           
           span:first-child{
                font-weight: 800;
           }

           & > span:last-child{
                 color: red;
           }
        }
    }

    .budget-tip{
        margin-top: 20px;
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        display: block;

        .van-list :deep(.van-cell .van-cell__value){
             display: block !important;
             text-align: left;
             font-size: 14px!important;
             span:first-child{
                color: #807d7d!important;
            }
        }
    }

    .van-list :deep(.van-cell .van-cell__value){
        display: flex;
        justify-content: space-between;
        font-size: 16px!important;

        span:first-child{
            color: #333;
        }
    }
    
</style>