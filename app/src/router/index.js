//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';


//使用插件
Vue.use(VueRouter);
//引入路由组件
import DemoIndex from '@/pages/Demo/index.vue'
import AdvancedViewPosition from '@/pages/Demo/AdvancedViewPosition.vue'
import AnimatedGIF from "@/pages/Demo/AnimatedGIF.vue"

//配置路由
export default new VueRouter({
    routes:[
        {
            path:"/AdvancedViewPosition",
            component:AdvancedViewPosition
        },
        {
            path:"/AnimatedGIF",
            component:AnimatedGIF
        },
        {
            path:"/DemoIndex",
            component:DemoIndex
        },
        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'*',
            redirect:DemoIndex,
        }
        
    ],
})
