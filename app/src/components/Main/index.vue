<template>
  <div id="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import View from "ol/View.js";
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
    const map =   new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      console.log("@", map);
    },
  },
};
</script>

<style>
.map {
  position: relative;
  margin:0;
  width: 100%;
  height: 100%;
}
</style>