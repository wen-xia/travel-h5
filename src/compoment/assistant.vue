<template>
  <div class="assistant">
       <van-nav-bar 
            title="行程助手" 
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="chat-list">
            <div class="chat-list-content">
                <div v-for="item in chatList" :key="item.id" :class="item.role === 'user' ? 'user-msg' : 'assistant-msg'"> 
                    <van-loading v-if="item.loading" >正在思考中...</van-loading>
                    <span v-else-if="item.role === 'user'">
                        {{ item.content }}
                    </span>
                    <span v-else-if="item.role === 'assistant'">
                        <MarkdownRender mode="chat" :content="item.content" :final="isDone"/>
                    </span>
                </div>
            </div>
        </div>

        <div class="user-input">
            <van-search 
                v-model="userInputValue" 
                placeholder="请输入问题"
                @search="onSearch" 
                left-icon=""
                shape="round"
            />
        </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRaw } from 'vue';
import { useStore } from 'vuex';
import { aiChat } from '@/api/index.js';
import { useRouter } from 'vue-router'
import MarkdownRender from 'markstream-vue'
import 'markstream-vue/index.css'
import { scrBottom } from '@/utils/index'

export default {
    name: 'assistant',
    components:{
        MarkdownRender
    },
    setup() {
        const chatList = reactive([]);
        const store = useStore();
        const router = useRouter();
        const userInputValue = ref('');
        const isDone = ref(false);
        
        onMounted(() => {

        })

        function doChat(userMsg){
              isDone.value = false;
              aiChat(userMsg).then( async res => {
                // console.log('res', res);
                if(!res.body){
                  return;
                }
                let msg = '';
                const render = res.body.getReader();
                const decoder = new TextDecoder('utf-8');
                while(true){
                    const { done, value } = await render.read();
                    if(chatList[chatList.length - 1].loading){
                        chatList[chatList.length - 1].loading = false;
                    }

                    if(done){
                        break;
                    }
                    let buffer = decoder.decode(value, {stream: true});

                    let index;
                    while((index = buffer.indexOf('\n\n')) !== -1){
                        const msgStr = buffer.slice(0, index);
                        buffer = buffer.slice(index + 2);

                        if(!msgStr.trim()){
                            continue;
                        }
                        const jsonStr = msgStr.replace('data: ', '').trim();

                        const data = JSON.parse(jsonStr);

                        if(jsonStr === '[START]' || jsonStr === '[DONE]'){
                            continue;
                        }

                        // console.log('data', data);

                        msg += data.content;
                    }
                    console.log('msg', msg);
                    chatList[chatList.length - 1].content = msg;
                    scrBottom('chat-list', 'chat-list-content');
                }

                isDone.value = true;
            });
        }

        function onClickLeft(){
            router.back();
        }

        function onSearch(){
            if(!userInputValue.value){
                return;
            }

            console.log('userInputValue.value', userInputValue.value);
            chatList.push({
                id: Date.now().toString(),
                role: 'user',
                content: userInputValue.value
            });

            chatList.push({
                id: Date.now().toString() + '1',
                role: 'assistant',
                content: '',
                loading: true
            });

            userInputValue.value = '';

            const allMag = chatList.slice(0,chatList.length - 1);

            console.log('allMag', JSON.stringify(toRaw(allMag)));

            doChat({historyMsg: allMag});
        }

        
        return {
            chatList,
            onClickLeft,
            userInputValue,
            onSearch,
            MarkdownRender,
            isDone
        }
    }
}
</script>

<style scoped lang="less">
    .assistant{
        height: 100%;
        width: 100%;
        background-color: #fff;
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }

    .chat-list{
        flex: 1;
        padding: 10px 10px 10px 0px;
        background-color: #fff;
        max-height: calc(100% - 100px);
        overflow: auto;

        .user-msg{
            color: #000;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            span{
                padding: 10px 15px;
                border: solid 1px #F5F5F5;
                border-radius: 15px;
                background: #F5F5F5;
            }
        }

        .assistant-msg{
            color: #e57a79;
            padding: 10px 15px;
            margin-bottom: 10px;
            width: calc(100% - 80px);

            span{
                padding: 10px 15px;
                border: solid 1px #F5F5F5;
                border-radius: 15px;
                background: #F5F5F5;
                line-height: 30px;
                display: inline-block;
            }
        }
    }

    .user-input{
        // position: absolute;
        // bottom: 0;
        width: 100%;

        .van-search__field{
            height: 50px;
        }
    }
</style>