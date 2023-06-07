<template>
  <div class="container">
    <div class="card">
      <!-- class类名后面就加个active就行可以应用样式了 -->
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AnimatedGIF" class="item active">
        <el-link type="primary"
          ><strong>AnimatedGIF</strong>
          <p style="color: black">加载GIF动画</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/ArcGISRestFeature" class="item active">
        <el-link type="primary"
          ><strong>ArcGIS REST Feature服务</strong>
          <p style="color: black">加载ArcGIS REST Feature 服务图层</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/Attributions" class="item active">
        <el-link type="primary"
          ><strong>Attributions</strong>
          <p style="color: black">版权信息控件控制</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="/AdvancedViewPosition" class="item active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <p style="color: black">描述</p>
        </el-link>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  width: 100%;
  display: flex;
  /* 水平排列方向从左到右 */
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0px;
}
.card {
  display: block;
  box-sizing: border-box;
  width: 33.33333%;
  /* background-color: #f8f9fa; */
  line-height: 25px;
  padding: 0 15px;
}
.item {
  display: block;
  width: 100%;
  height: 140px;
  margin: 10.4px 0;
  padding: 10.4px 0;
  border: 0.8px solid #dee2e6;
  border-radius: 3px;
  background-color: #f8f9fa;
}
</style>