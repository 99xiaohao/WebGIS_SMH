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
import { tile as tileStrategy, bbox as bboxStrategy } from 'ol/loadingstrategy.js';
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

      const style = new Style({
        fill: new Fill(),
        //线条的样式
        stroke: new Stroke({
          color: [0, 0, 0, 1],
          width: 0.5,
        }),
      });

      const vectorSource = new VectorSource({
        //format可以理解为解析器,new EsriJSON()提供读写EsriJSON格式数据
        format: new EsriJSON(),
        //url属性可以是一个返回url的字符串，
        url: function (extent, resolution, projection) {
          //因为ArcGIS Serve只需要投影的ID数字，所以需要截取
          //.getCode返回类似'EPSG:4326'的值，split(/:(?=\d+$)/)将冒号和数字分开，返回一个数组
          //.pop()删除数组的最后一个元素
          const srid = projection
            .getCode()
            .split(/:(?=\d+$)/)
            .pop();

          console.log('@', extent);
          const url =
            serviceUrl +
            layer +
            '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            //extent视图的范围
            encodeURIComponent(` 
          {"xmin":${extent[0]},
          "ymin":${extent[1]},
          "xmax":${extent[2]},
          "ymax":${extent[3]},
          "spatialReference":{"wkid":${srid}}
        }`) +
            '&geometryType=esriGeometryEnvelope&inSR=' +
            srid +
            '&outFields=*' +
            '&outSR=' +
            srid;
          return url;
        },
        //资源加载策略：ol.loadingstrategy有三种策略
        /*
        all:默认的加载策略，会在地图视图范围内加载所有数据
        bbox：会在地图视图范围内加载当前可见区域的数据，可以提高性能。
        tile：会根据瓦片网格加载数据，可以提高性能。
        */
        strategy: tileStrategy(
          createXYZ({
            tileSize: 512,
          }),
        ),
        attributions:
          'University of Leicester (commissioned by the ' +
          '<a href="https://www.arcgis.com/home/item.html?id=' +
          'd5f05b1dc3dd4d76906c421bc1727805">National Trust</a>)',
      });

      const vector = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
          const classify = feature.get('LU_2014');
          const color = fillColors[classify] || [0, 0, 0, 0];
          style.getFill().setColor(color);
          return style;
        },
        opacity: 0.7,
      });

      const raster = new TileLayer({
        source: new XYZ({
          attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        }),
      });

      const map = new Map({
        layers: [raster, vector],
        target: document.getElementById('map'),
        view: new View({
          center: fromLonLat([1.72, 52.4]),
          zoom: 14,
        }),
      });
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