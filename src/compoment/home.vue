<template>
  <van-nav-bar title="旅游助手" />
  <div class="home">
    <header>
        <van-notice-bar
          left-icon="volume-o"
          text="请规划你的旅游旅程吧"
        />
    </header>
    <main>
        <div class="card">
            <h2>规划你的旅程</h2>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="addressField"
                    name="addressField"
                    label="目的地"
                    placeholder="目的地"
                    :rules="[{ required: true, message: '请填写目的地' }]"
                    @click="showAddress = true"
                    is-link
                    readonly
                />
                <van-popup v-model:show="showAddress" destroy-on-close round position="bottom">
                    <van-picker
                        :model-value="address"
                        :columns="columnsAddress"
                        @cancel="showAddress = false"
                        @confirm="onAddressConfirm"
                    />
                </van-popup>
                <van-field
                    v-model="money"
                    type="number"
                    name="money"
                    label="预算"
                    placeholder="预算"
                    :rules="[
                    { required: false, message: '请填写预算' },
                    { pattern: /^(0|[1-9]\d*)$/, message: '预算不能以0开头' }
                    ]"
                />
                <van-field
                    v-model="days"
                    type="number"
                    name="days"
                    label="天数"
                    placeholder="天数"
                    :rules="[
                        { required: true, message: '请填写天数' },
                        { pattern: /^(0|[1-9]\d*)$/, message: '预算不能以0开头' }
                    ]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        开始规划
                    </van-button>
                </div>
                </van-form>
        </div>
        <div class="card">
             <h2>快捷入口</h2>
             <van-grid column-num="2">
                <van-grid-item icon="chat-o" text="AI对话" @click="toAssistant"/>
                <van-grid-item icon="friends-o" text="我的" @click="toSetting"/>
            </van-grid>
        </div>
        <div class="card">
             <h2>热门目的地</h2>
             <van-grid column-num="4">
                <van-grid-item 
                    v-for="(item) in CityData" 
                    :key="item.id" 
                    :text="item.name" 
                    @click="changeCity(item)"
                    :class="activeCity === item.id ? 'activeCity' : ''"
                >
                    {{ item.name }}
                </van-grid-item>
            </van-grid>
        </div>
    </main>
    
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter ,useRoute } from 'vue-router';
import { CityData } from '@/constant/mock';
import { useStore } from 'vuex';
export default {
    name: 'home',
    setup() {
        const router = useRouter();
        const routeInfo = useRoute();
        const address = ref(['1']);
        const addressField = ref('上海');
        const money = ref(2000);
        const days = ref(3);
        const activeCity = ref('1');
        const showAddress = ref(false);
        const store = useStore();
        function onSubmit() {
            router.push({
                path: '/travelDetail',
                query: {
                    city: addressField.value,
                    budget: money.value,
                    days: days.value
                }
            });
            // router.push('/home/travelDetail');
        }

        function toAssistant() {
            console.log('this is assistant',routeInfo)
            router.push('/assistant');
        }

        function toSetting() {
            console.log('this is toSetting',routeInfo)
            router.push('/setting');
        }

        function changeCity(item) {
            activeCity.value = item.id;
            address.value = [item.id];
            addressField.value = item.name;
        }

        function onAddressConfirm(value) {
            activeCity.value = value.selectedValues[0];
            address.value = value.selectedValues;
            addressField.value = value.selectedOptions[0].text;

            showAddress.value = false;
        }

        const columnsAddress = CityData.map(item => ({text: item.name, value: item.id}));

        const active = computed(() => {
            return store.state.mainStore.active;
        })

        return {
            title: 'home',
            address,
            addressField,
            money,
            days,
            onSubmit,
            showAddress,
            toAssistant,
            toSetting,
            changeCity,
            activeCity,
            CityData,
            onAddressConfirm,
            columnsAddress,
            active
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="less">
    .home{
        padding: 10px;

        h2{
            font-size: var(--font-size-16);
            margin-bottom: 10px;
        }

        .card{
            margin: 10px 0px;
            padding: 10px;
            background-color: var(--base-color);
        }

        .van-field{
            :deep(label){
                font-size: var(--font-size-14);
                font-weight: bold;
                color: #000;
            }
        }

        .activeCity{
            color: var(--primary-color);
        }
    }

    .van-nav-bar{
        margin-bottom: 0px;
    }

    

</style>