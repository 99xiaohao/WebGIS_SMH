<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const TDsource = new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      });
      const TileLayer_TD = new TileLayer({
        title: '天地图',
        source: TDsource,
      });
      var sourceMark = new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      });
      var tileMark = new TileLayer({
        title: '标注图层',
        source: sourceMark,
      });
      const map = new Map({
        target: 'map', // 地图容器 对应id
        layers: [TileLayer_TD, tileMark], // 图层
        view: new View({
          // 视图
          //projection: 'EPSG:4326', // 坐标系
          // 初始化地图中心 可以去地图坐标拾取网站获取想要的坐标 转换一下点的坐标系
          center: transform([107.6, 27, 4], 'EPSG:4326', 'EPSG:3857'),
          // 缩放
          zoom: 7,
          // 最大缩放
          maxZoom: 18,
          // 最小缩放
          minZoom: 1,
        }),
        // 地图自带控件，这里我们不需要，后续自己做类似功能
        // controls: new Defaults({
        //   zoom: false,
        //   rotate: false,
        // }),
      });
    },
  },
};
</script>

<style>
#app,
#map {
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>