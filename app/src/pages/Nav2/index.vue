<template>
  <div id="app">
    <div id="map" class="map">
      <div class="map-switch-container">
        <div class="icondiv" @click="BasemapsDivShow = !BasemapsDivShow">
          <span class="tooltiptext">切换底图</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ditu1"></use>
          </svg>
        </div>
        <div class="basemaps" id="basemaps" v-show="BasemapsDivShow">
          <div id="satellite" class="basemap" @click="ChangeMap($event)">
            <img src="./images/satellite.png" alt="卫星影像" title="卫星影像" />
          </div>
          <div id="vector" class="basemap" @click="ChangeMap($event)">
            <img src="./images/vector.png" alt="矢量地图" title="矢量地图" />
          </div>
          <div id="terrain" class="basemap" @click="ChangeMap($event)">
            <img src="./images/terrain.png" alt="地形" title="地形" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import Tile from 'ol/Tile';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector.js';
export default {
  data() {
    return {
      BasemapsDivShow: false,
      SatelliteUrl: 'http://t0.tianditu.com/DataServer?T=img_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      SatelliteLabelUrl:
        'http://t0.tianditu.com/DataServer?T=cia_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      TerrainUrl: 'http://t0.tianditu.com/DataServer?T=ter_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      TerrainLabelUrl:
        'http://t0.tianditu.com/DataServer?T=cta_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      VectorUrl: 'http://t0.tianditu.com/DataServer?T=vec_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      VectorLabelUrl: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=d590c66c56d4cc58784f8159e8aa4ea8&x={x}&y={y}&l={z}',
      SMHUrl:
        'http://localhost:8080/geoserver/SMH/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SMH:shimohua3857&outputFormat=application/json',
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const VectorBaseLayer = new TileLayer({
        title: '天地图矢量',
        source: new XYZ({
          url: this.VectorUrl,
        }),
        visible: true,
      });

      var VectorLabelLayer = new TileLayer({
        title: '标注图层',
        source: new XYZ({
          url: this.VectorLabelUrl,
        }),
        visible: true,
      });
      const SMHLayer = new VectorLayer({
        zIndex: 10,
        source: new VectorSource({
          format: new GeoJSON(),
          //KVP参数格式
          url: this.SMHUrl,
        }),
      });
      const view = new View({
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
      });

      const map = new Map({
        target: 'map', // 地图容器 对应id
        layers: [VectorBaseLayer, VectorLabelLayer], // 图层
        view: view,
      });
      map.addLayer(SMHLayer);
      //将view，source，map存入vuex中
      this.$store.commit('_setDefaultMapView', view);
      //this.$store.commit('_setDefaultSource', source);`````
      this.$store.commit('_setDefaultMap', map);
    },
    ChangeMap(e) {
      const SMHLayer = new VectorLayer({
        zIndex: 10,
        source: new VectorSource({
          format: new GeoJSON(),
          //KVP参数格式
          url: this.SMHUrl,
        }),
      });
      switch (e.target.title) {
        case '矢量地图':
          //清除所有图层
          this.$store.state._defaultMap.getLayers().clear();
          //添加图层
          const VectorLayer = new TileLayer({
            title: '天地图矢量',
            source: new XYZ({
              url: this.VectorUrl,
            }),
            visible: true,
          });
          var VectorLabelLayer = new TileLayer({
            title: '标注图层',
            source: new XYZ({
              url: this.VectorLabelUrl,
            }),
            visible: true,
          });

          this.$store.state._defaultMap.addLayer(SMHLayer);
          this.$store.state._defaultMap.addLayer(VectorLayer);
          this.$store.state._defaultMap.addLayer(VectorLabelLayer);

          break;

        case '卫星影像':
          //清除所有图层
          this.$store.state._defaultMap.getLayers().clear();
          const SatelliteLayer = new TileLayer({
            title: '天地图影像',
            source: new XYZ({
              url: this.SatelliteUrl,
            }),
          });
          const SatelliteLabelLayer = new TileLayer({
            title: '影像标注',
            source: new XYZ({
              url: this.SatelliteLabelUrl,
            }),
          });
          this.$store.state._defaultMap.addLayer(SMHLayer);
          this.$store.state._defaultMap.addLayer(SatelliteLayer);
          this.$store.state._defaultMap.addLayer(SatelliteLabelLayer);
          break;

        case '地形':
          //清除所有图层
          this.$store.state._defaultMap.getLayers().clear();
          const TerrainLayer = new TileLayer({
            title: '地形',
            source: new XYZ({
              url: this.TerrainUrl,
            }),
          });
          const TerrainLabelLayer = new TileLayer({
            title: '地形标注',
            source: new XYZ({
              url: this.TerrainLabelUrl,
            }),
          });
          this.$store.state._defaultMap.addLayer(SMHLayer);
          this.$store.state._defaultMap.addLayer(TerrainLayer);
          this.$store.state._defaultMap.addLayer(TerrainLabelLayer);
          break;
      }
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

.icon {
  width: 1.9em;
  height: 1.9em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.icondiv {
  width: 2em;
  height: 2em;
  z-index: 5;
  background: #fff;
  border-radius: 2px;
  bottom: 40px;
  box-shadow: 0 0 4px 2px hsla(0, 0%, 69%, 0.5);
  padding: 3px;
  position: absolute;
  right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.15em;
}
.tooltiptext {
  font-size: 1em;
  /* 设置高度 */
  line-height: 25px;
  display: none;
  width: 80px;
  background-color: black;
  color: #fff;
  position: absolute;
  text-align: center;
  padding: 3px 0;
  border-radius: 5px;
  /* top: -5px; */
  right: 106%;
}
.icondiv:hover .tooltiptext {
  display: block;
}
.tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 100%; /* 提示工具左侧 */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent black;
}
.basemaps {
  /* visibility: hidden; */
  /* width:200px; */
  height: 70px;
  background-color: #eef4fc80;

  position: absolute;
  right: 60px;
  bottom: 3%;
  z-index: 3;
  display: flex;
  padding: 3px;
  justify-content: space-between;
}
.basemap {
  margin: 3px;
}
</style>