<template>
  <div id="map" class="map"></div>
</template>
<script type="text/javascript" src='../../assets/Data/switzerland.geojson'></script>
<script>
import GeoJSON from "ol/format/GeoJSON.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    mapInit() {
      //source用于存放数据
      const source = new VectorSource({
        //要把静态资源放在pulic文件夹下，不然会包404错误
        url: '../../../Data/switzerland.geojson',
        format: new GeoJSON(),
      });
      //layer用于展示数据
      const vectorLayer = new VectorLayer({
        source: source,
        style: {
          "fill-color": "rgba(255, 255, 255, 0.6)",
          "stroke-width": 1,
          "stroke-color": "#319FD3",
          "circle-radius": 5,
          "circle-fill-color": "rgba(255, 255, 255, 0.6)",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#319FD3",
        },
      });
     // view用于管理视图
      const view = new View({
        center: [0, 0],
        zoom: 1,
      });
      //map提供容器
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        target: "map",
        view: view,
      });
      this.$store.commit('_setDefaultMapView',view)
      console.log(source)
    },
  },
};
</script>

<style>
</style>