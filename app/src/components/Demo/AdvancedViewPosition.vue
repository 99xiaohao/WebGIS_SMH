<template>
  <div id="app">
    <div id="map" class="map"></div>
    <button @click="ZoomtoSwitzerland">定位到Switzerland</button>
    <button @click="ZoomtoLausanne">定位到Lausanne</button>
    <button @click="cneterLanusanne">以Lanusanne为视图中心</button>
  </div>
</template>

<script>
import GeoJSON from "ol/format/GeoJSON.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
//import * as xxx from 'xxx' 会将 "xxx" 中所有export导出的内容组合成一个对象返回
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
export default {
  data() {
    return{
        
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const source = new VectorSource({
        url: "./Data/switzerland.geojson",
        format: new GeoJSON(),
      });

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
      const view = new View({
        center: [0, 0],
        zoom: 1,
      });
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
    },
  },
};
</script>

<style>
.map {
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>