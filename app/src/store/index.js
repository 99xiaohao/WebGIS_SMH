import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
//准备actions用于相应组件中的动作
//const actions={}
//准备mutations用于操作数据
const mutations = {
    _setDefaultMapView(state, value) {
        state._defaultMapView = value
    },
    _setDefaultSource(state,value){
        state._defaultSource=value
    },
    _setDefaultMap(state,value){
        state._defaultMap=value
    }

}
//准备state用于存储数据
const state = {

    _defaultMapView: '',
    _defaultSource:'',
    _defaultMap:'',
}
const getters = {
    _getDfaultMapView() {
        return state._defaultMapView
    },
    _getDfaultSource(){
        return state._defaultSource
    },
    _getDfaultMap(){
        return state._defaultMap
    }
}
//创建并暴露Store
export default new Vuex.Store({
    getters,
    mutations,
    state,
})
