//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';


//使用插件
Vue.use(VueRouter);
//引入路由组件
import Demo from '@/pages/Demo/index.vue'
import Nav2 from '@/pages/Nav2'
import Nav3 from '@/pages/Nav3'
import Nav4 from '@/pages/Nav4'
import AdvancedViewPosition from '@/pages/Demo/AdvancedViewPosition.vue'
import AnimatedGIF from "@/pages/Demo/AnimatedGIF.vue"
import ArcGISRestFeature from '@/pages/Demo/ArcGISRestFeature.vue'
import Attributions from '@/pages/Demo/Attributions.vue'
//配置路由
export default new VueRouter({
    routes:[
       
        {
            path:"/Demo",
            component:Demo,

        },
       
        {
            path:'/nav2',
            component:Nav2
        },
        {
            path:'/nav3',
            component:Nav3
        },
        {
            path:'/nav4',
            component:Nav4
        },
        {
            path:"/AdvancedViewPosition",
            component:AdvancedViewPosition
        },
        {
            path:"/AnimatedGIF",
            component:AnimatedGIF
        },
        {
            path:"/ArcGISRestFeature",
            component:ArcGISRestFeature
        },
        {
            path:"/Attributions",
            component:Attributions
        },
        //重定向,访问时直接展示的页面
        {
             path:'*',
             redirect:'/Demo',
        }
        
    ],
})
