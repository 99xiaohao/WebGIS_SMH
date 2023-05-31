<template>
  <div class="container">
    <div class="card">
      <router-link to="" active-class="active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <br />
          <el-link :underline="false">描述</el-link>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="" active-class="active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <br />
          <el-link :underline="false">描述</el-link>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="" active-class="active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <br />
          <el-link :underline="false">描述</el-link>
        </el-link>
      </router-link>
    </div>
    <div class="card">
      <router-link to="" active-class="active">
        <el-link type="primary"
          ><strong>AdvancedViewPosition</strong>
          <br />
          <el-link :underline="false">描述</el-link>
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
  margin: 15px;
}
.card {
  box-sizing: border-box;
  width: 33.33333%;
  /* background-color: #f8f9fa; */
  line-height: 25px;
  height: 120px;
  padding: 0 15px;
}
.active {
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