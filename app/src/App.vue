<template>
  <div id="app" style="height:100%">
    <el-container style="height:100%">
      <el-header height="15%">石漠化数据服务平台</el-header>
      <el-main>
        <AdvancedViewPosition></AdvancedViewPosition>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>



<script>
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import AdvancedViewPosition from '@/components/Demo/AdvancedViewPosition.vue'


export default {
  name: "App",
  components: {
    Header,
    Footer,
    Main,
    AdvancedViewPosition
  },
};
</script>

<style>
html,body{
 margin:0;
 height:100%;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
}


.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height:  60px;
  padding:0;
}


</style>
