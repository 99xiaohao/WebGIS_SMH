<template>
  <div id="app" style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="10%">石漠化数据服务平台</el-header>
      <el-main>
        <AdvancedViewPosition />
      </el-main>
    </el-container>
  </div>
</template>



<script>
import Header from '@/components/Header';
import Main from '@/components/Main';
import MapView from '@/components/common/MapView.vue';
import AdvancedViewPosition from './components/Demo/AdvancedViewPosition.vue';

export default {
  name: 'App',
  components: {
    Header,
    Main,
    MapView,
    AdvancedViewPosition,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

.el-header,
.el-footer {
  background-color: #000000;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
}

.el-main {
  /* background-color: #e9eef3; */

  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
</style>
