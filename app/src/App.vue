<template>
  <div id="app" style="height: 100%">
    <el-container style="height: 100%">
      <el-header height="50px">小伙子的WEBGIS展示界面</el-header>
      <el-container style="width: 100%; height: 90%">
        <el-aside width="15%">
          <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <!-- route值为	Vue Router 路径对象 -->
            <el-menu-item route="Demo" index="1">
              <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>OpenlayersDemo</span>
              </template>
              <!-- <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group> -->
              <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            </el-menu-item>
            <el-menu-item route="Nav2" index="2">
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title">石漠化数据服务平台</span>
            </el-menu-item>
            <!-- <el-menu-item index="3" disabled> -->
            <el-menu-item route="Nav3" index="3">
              <!-- <i class="el-icon-document"></i> -->
              <span slot="title">内涝系统</span>
            </el-menu-item>
            <el-menu-item route="Nav4" index="4">
              <!-- <i class="el-icon-setting"></i> -->
              <span slot="title">CesiumDemo</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main width="85%">
          <router-view></router-view>
          <!-- <MapView /> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
//引入ol样式
import "ol/ol.css";
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      data: [
        
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}

.el-header {
  background-color: #000000;
  color: #ffffff;
  text-align: left;
  line-height: 60px;
  position: sticky;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  box-sizing: border-box;
}
.el-aside {
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
}
.el-menu {
  height: 100%;
  width: 100%;
  /* position: absolute; */
}
</style>
