import Vuex from 'vuex';
import { aiRequest } from '@/api/index.js';

const mainStore = {
    namespaced: true,
    state:{
        active: 'home',
        travelDetail: null,
        loading: true,
    },
    actions: {
        doChangeActive(context, value){
            context.commit('changeActive', value);
        },
        createTravel(context, data){
            context.commit('setLoading', true);
            aiRequest({
                url: '/api/plan', 
                method: 'POST', 
                body: data
            }).then(res => {
                const { content } = res?.kwargs || {};
                console.log('content', content);
                try{
                    const travelDetail = JSON.parse(`${content}`);
                    console.log('travelDetail', travelDetail);

                    // localStorage.setItem('travelDetail', content);
                    context.commit('setTravelDetail', travelDetail);
                }catch(err){
                    console.log('travelDetail', err);
                }
                context.commit('setLoading', false);
            });
        },
        doAiChat(context, data){
            aiRequest({
                url: '/api/chat', 
                method: 'POST', 
                body: data
            }).then(res => {
                console.log('res', res);
            });
        }
    },
    mutations:{
        changeActive(state, value){
            state.active = value;
        },
        setTravelDetail(state, value){
            state.travelDetail = value;
        },
        setLoading(state, value){
            state.loading = value;
        }
    },
    getters:{
        getActive(state){
            return state.active;
        }
    }
};

const VuexStore = new Vuex.Store({
    modules: {
        mainStore
    }
});

export default VuexStore
