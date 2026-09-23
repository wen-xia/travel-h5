import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex';


const routes = [
    {
        path: '/',
        // 一进入根路径，重定向到home
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/compoment/home.vue')
    },{
        path: '/assistant',
        name: 'assistant',
        component: () => import('@/compoment/assistant.vue')
    },{
        path: '/setting',
        name: 'setting',
        component: () => import('@/compoment/setting.vue')
    },{
        path: '/travelDetail',
        name: 'travelDetail',
        component: () => import('@/compoment/travelDetail.vue'),
        props: (route) => {
            console.log('route', route);
            return route.query.city || '';
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const store = useStore();
    switch (to.name) {
        case 'home':
            break;
        case 'assistant':
            break;
        case 'setting':
            break;
        default:
            break;
    }
    store.commit('mainStore/changeActive', to.name);
    next();
});

export default router