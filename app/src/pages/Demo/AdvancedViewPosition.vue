<template>
  <div id="app">
    <div id="map" class="map"></div>
    <div class="buttondiv">
      <el-button type="primary" @click="ZoomtoSwitzerland">定位到Switzerland</el-button>
      <el-button type="primary" @click="ZoomtoLausanne">定位到Lausanne</el-button>
      <el-button type="primary" @click="cneterLanusanne">以Lanusanne为视图中心</el-button>
    </div>
  </div>
</template>

<script>
import GeoJSON from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
//import * as xxx from 'xxx' 会将 "xxx" 中所有export导出的内容组合成一个对象返回
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const source = new VectorSource({
        //把静态资源放在public里面，填写绝对路径就不需要带public前缀
        url: 'Data/switzerland.geojson',
        format: new GeoJSON(),
      });

      //新建矢量图层
      const vectorLayer = new VectorLayer({
        source: source,
        style: {
          'fill-color': 'rgba(255, 255, 255, 0.6)',
          'stroke-width': 1,
          'stroke-color': '#319FD3',
          'circle-radius': 5,
          'circle-fill-color': 'rgba(255, 255, 255, 0.6)',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#319FD3',
        },
      });

      //新建视图
      const view = new View({
        center: [0, 0],
        zoom: 1,
      });
      //新建map当作容器
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        target: 'map',
        view: view,
      });
      //将view，source，map存入vuex中
      this.$store.commit('_setDefaultMapView', view);
      this.$store.commit('_setDefaultSource', source);
      this.$store.commit('_setDefaultMap', map);
    },
    ZoomtoSwitzerland() {
      console.log(this.$store);
      const feature = this.$store.state._defaultSource.getFeatures()[0];
      const polygon = feature.getGeometry();
      this.$store.state._defaultMapView.fit(polygon, { padding: [170, 50, 30, 150] });
    },
    ZoomtoLausanne() {
      const feature = this.$store.state._defaultSource.getFeatures()[1];
      const point = feature.getGeometry();
      this.$store.state._defaultMapView.fit(point, { padding: [170, 50, 30, 150], minResolution: 50 });
    },
    cneterLanusanne() {
      const feature = this.$store.state._defaultSource.getFeatures()[1];
      const point = feature.getGeometry();
      //获取map的大小（长宽）以像素为单位，
      const size = this.$store.state._defaultMap.getSize();
      console.log(size);
      this.$store.state._defaultMapView.centerOn(point.getCoordinates(), size, [570, 500]);
    },
  },
};
</script>

<style>
#app,
.map {
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
}
.buttondiv {
  position: absolute;
  bottom: 40px;
  left: 100px;
  z-index: 10;
}
</style>