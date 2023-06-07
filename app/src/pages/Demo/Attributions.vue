<template>
  <div id="app">
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import { Attribution, defaults as defaultControls } from 'ol/control.js';
export default {
  mounted() {
    this.mapinit();
  },
  methods: {
    mapinit() {
      const attribution = new Attribution({
        //指定attributions是否可以折叠
        collapsible: false,
      });
      const map = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        //defaultControls()函数返回一组控件数组
        controls: defaultControls({ attribution: false }).extend([attribution]),
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      function checkSize() {
        const small = map.getSize()[0] < 600;
        attribution.setCollapsible(small);
        attribution.setCollapsed(small);
      }

      window.addEventListener('resize', checkSize);
      checkSize();
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
/* 复写attribution样式 */
.ol-attribution {
  height: 20px;
}
</style>