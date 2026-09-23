import { createApp } from 'vue'
import App from './App.vue'
import vant from 'vant'
import router from './router'
import './style/index.less'
import VuexStore from './store/mainStore'


const app = createApp(App);
app.use(vant);
app.use(router);
app.use(VuexStore);
app.mount('#app');
