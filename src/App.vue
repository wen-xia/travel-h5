<template>
  <div style="height: 100%;">
    <router-view></router-view>
  
    <van-tabbar v-model="active" router="true" @change="handleChange">
      <van-tabbar-item name='home' icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name='assistant' icon="search" to="/assistant">助手</van-tabbar-item>
      <van-tabbar-item name='setting' icon="friends-o" to="/setting">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: 'App',
    setup() {
      // const active = ref('home');

      const store = useStore();
      const handleChange = (val) => {
        console.log('handleChange', val);
        store.dispatch('mainStore/doChangeActive', val);
      }

      return { handleChange };
    },
    computed: {
      
    },
    updated() {
      // console.log("activeStr: " + this.activeStr);
    }
  };
</script>

<style scoped></style>
