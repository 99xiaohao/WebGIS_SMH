<template>
  <div id="app">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import EsriJSON from 'ol/format/EsriJSON.js';
import Map from 'ol/Map.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';
import XYZ from 'ol/source/XYZ.js';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { createXYZ } from 'ol/tilegrid.js';
import { fromLonLat } from 'ol/proj.js';
import { tile as tileStrategy } from 'ol/loadingstrategy.js';
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapinit();
  },
  methods: {
    mapinit() {
      const serviceUrl =
        'https://services-eu1.arcgis.com/NPIbx47lsIiu2pqz/ArcGIS/rest/services/' +
        'Neptune_Coastline_Campaign_Open_Data_Land_Use_2014/FeatureServer/';
      const layer = '0';
      //rgb颜色配置最后一个数字是透明度
      const fillColors = {
        'Lost To Sea Since 1965': [0, 0, 0, 1],
        'Urban/Built-up': [104, 104, 104, 1],
        Shacks: [115, 76, 0, 1],
        Industry: [230, 0, 0, 1],
        Wasteland: [230, 0, 0, 1],
        Caravans: [0, 112, 255, 0.5],
        Defence: [230, 152, 0, 0.5],
        Transport: [230, 152, 0, 1],
        'Open Countryside': [255, 255, 115, 1],
        Woodland: [38, 115, 0, 1],
        'Managed Recreation/Sport': [85, 255, 0, 1],
        'Amenity Water': [0, 112, 255, 1],
        'Inland Water': [0, 38, 115, 1],
      };

      const style = new Style({});
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
</style>