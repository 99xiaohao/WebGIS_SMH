<template>
  <div id="app">
    <div id="map" class="map"></div>
    <div id="cluster-distance">
      <label>聚合距离</label>
      <input type="range" min="0" max="200" step="1" value="40" />
      <small>聚合距离，再这个距离范围内的Features会聚合再一起</small>
    </div>
    <div id="min-distance">
      <label>最小距离</label>
      <input type="range" min="0" max="200" step="1" value="20" />
      <small> 聚合对象的最小距离，不能大于配置的距离 </small>
    </div>
  </div>
</template>

<script>
import Feature from 'ol/Fature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { boundingExtent } from 'ol/exten.js';
export default {
  mounted() {
    const distanceInput = document.getElementById('Cluster-distance');
    const minDistanceInput = document.getElementById('min-distance');
    const count = 20000;
    const features = new Array(count);
  },
};
</script>

<style>
</style>