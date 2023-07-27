<template>
  <div id="app">
    <!-- 地图 -->
    <div id="map" class="map" @click.stop>
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
    <!-- 弹窗 -->
    <el-card class="box-card" id="Popup" v-show="ShowPopup" @click.stop>
      <div slot="header" class="clearfix" @click.stop>
        <span id="cityName">信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click.stop="ShowPopupEvent">✖</el-button>
      </div>
      <div class="text item" id="popup-content"></div>
    </el-card>

    <!-- echarts展示区 -->
    <div class="LeftDiv">
      <el-button type="primary" style="position: relative; top: 30%; folat: left" @click="drawer = true" circle
        ><i class="el-icon-caret-left" style="font-size: 20px; font-weight: bold" ref="ElIconLeft"></i
      ></el-button>
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :modal="false" direction="ltr" style="position:absolute" size="30em">
        <span>我来啦!</span>
      </el-drawer>
      <!-- <div class="LeftContainer" v-show="ShowLeftContainer"></div> -->
    </div>
    <div class="RightDiv">
      <el-button type="primary" circle
        ><i class="el-icon-caret-right" style="font-size: 20px; font-weight: bold" ref="ElIconRight"></i
      ></el-button>
    </div>

    <!-- <div ref="Popup" class="ol-popup" id="Popup" v-show="ShowPopup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div class="popup-content" id="popup-content"></div>
    </div> -->
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
import Overlay from 'ol/Overlay.js';
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
      //  使用kvp格式拼写请求url  typeName指geoserver中的图层名
      SMHUrl:
        'http://localhost:8080/geoserver/SMH/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=SMH:shimohua3857&outputFormat=application/json',
      ShowPopup: false,
      ShowLeft: true,
      ShowRight: true,
      ShowLeftContainer: false,
      drawer: false,
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
      //this.$store.commit('_setDefaultSource', source);
      this.$store.commit('_setDefaultMap', map);

      //获取popup的dom对象
      var container = document.getElementById('Popup');
      var content = document.getElementById('popup-content');
      var closer = document.getElementById('popup-closer');
      //创建popup
      var popup = new Overlay({
        element: container,
        //autoPan:true,
        positioning: 'bottom-center',
        //组织地图事件冒泡
        stopEvent: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      map.addOverlay(popup);

      //关闭popup
      // closer.onclick = function () {
      //   popup.setPosition(undefined);
      //   //失去焦点时触发
      //   closer.blur();
      //   this.ShowPopup = false;
      //   return false;
      // };

      //点击弹窗
      map.on('singleclick', (e) => {
        //e是MapBrowserEvent对象
        console.log('e', e);
        //
        let feature = map.forEachFeatureAtPixel(e.pixel, (feature) => {
          //回调返回点击的要素
          return feature;
        });
        console.log('@', feature);
        //判断点击处是否有要素
        //let IFfeature = map.hasFeatureAtPixel(e.pixel)
        //获取点击处的所有所有要素
        //let feature = map.getFeaturesAtPixel(e.pixel);

        if (feature) {
          console.log('feature');
          this.ShowPopup = true;
          //清空html
          content.innerHTML = '';
          //名称
          var cityName = document.getElementById('cityName');
          cityName.innerText = feature.get('name');

          // 省份编码
          var provinceCode = document.createElement('p');
          provinceCode.innerText = '县编码：' + feature.get('admincode');
          content.appendChild(provinceCode);
          // 重度比
          var provinceCode = document.createElement('p');
          provinceCode.innerText = '重度比：' + feature.get('重度比');
          content.appendChild(provinceCode);
          // const coordinate = feature.getGeometry().getCoordinates()
          // console.log('coordinate',coordinate)
          //弹出popup
          popup.setPosition(e.coordinate);
        } else {
          this.ShowPopup = false;
        }
      });

      //鼠标在要素上时改变样式
      // map.on('pointermove', (e) => {
      //   if (map.hasFeatureAtPixel(e.pixel)) {
      //     map.getViewport().style.cursor = 'pointer';
      //   } else {
      //     map.getViewport().style.cursor = 'inherit';
      //   }
      // });
    },

    //切换地图
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

    ShowPopupEvent(e) {
      console.log('e', e);
      this.ShowPopup = false;
      e.stopPropagation();
      e.preventDefault();
    },
    //左侧DIV显示控制
    LeftDivChange(e) {
      if (this.$refs.ElIconLeft.className == 'el-icon-caret-right') {
        this.$refs.ElIconLeft.className = 'el-icon-caret-left';
        console.log('this', this.ShowLeftContainer);
        this.ShowLeftContainer = !this.ShowLeftContainer;
      } else {
        console.log('this', this.ShowLeftContainer);
        this.$refs.ElIconLeft.className = 'el-icon-caret-right';
        this.ShowLeftContainer = !this.ShowLeftContainer;
      }
    },
  },
};
</script>

<style scoped >
#app,
#map {
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
}

/* 地图切换部分样式 */
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

/* 弹窗部分样式 */
.text {
  font-size: 1em;
}

.item {
  margin: 0px;
  background-color: #ffffff;
  border: none;
  text-align: left;
  padding: 5px;
  height: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial,
    sans-serif;
}
.el-card__header {
  padding: 2px;
  font-size: 1.2em;
  line-height: 40px;
}
/* echart */
.LeftDiv {
  position: absolute;
  height: 600px;

  left: 16%;
  top: 20%;
  z-index: 5;
  /* background-color: #eef4fc; */
  /* transition: all 0.5s ease; */
}
.RightDiv {
  position: absolute;
  right: 1%;
  bottom: 40%;
  z-index: 5;
}
.LeftContainer {
  position: relative;
  float: left;
  width: 200px;
  height: 500px;
  background-color: aqua;
  /* display:none; */
  transition: all 0.5s ease;
}
</style>