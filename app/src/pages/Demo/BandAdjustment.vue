<template>
  <div id="app">
    <div class="controls">
      <select id="red">
        <option value="1" selected>visible red</option>
        <option value="2">visible green</option>
        <option value="3">visible blue</option>
        <option value="4">near infrared(近红外)</option>
      </select>
      <label
        >max
        <input type="range" id="redMax" value="3000" min="2000" max="5000" />
      </label>

      <label for="green">Green channel</label>
      <select id="green">
        <option value="1">visible red</option>
        <option value="2" selected>visible green</option>
        <option value="3">visible blue</option>
        <option value="4">near infrared</option>
      </select>
      <label
        >max
        <input type="range" id="greenMax" value="3000" min="2000" max="5000" />
      </label>

      <label for="blue">Blue channel</label>
      <select id="blue">
        <option value="1">visible red</option>
        <option value="2">visible green</option>
        <option value="3" selected>visible blue</option>
        <option value="4">near infrared</option>
      </select>
      <label
        >max
        <input type="range" id="blueMax" value="3000" min="2000" max="5000" />
      </label>
    </div>
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import GeoTIFF from 'ol/source/GeoTIFF.js';
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import View from 'ol/View.js';
export default {
  mounted() {
    const channels = ['red', 'green', 'blue'];
    for (const channel of channels) {
      const selector = document.getElementById(channel);
      selector.addEventListener('change', update);
      const input = document.getElementById(`${channel}Max`);
      input.addEventListener('input', update);
    }
    function getVariables() {
      const variables = {};
      for (const channel of channels) {
        const selector = document.getElementById(channel);
        console.log('value1', typeof selector.value);
        //将字符串解析为10进制数
        variables[channel] = parseInt(selector.value, 10);
        console.log('value2', typeof variables[channel]);
        const input = document.getElementById(`${channel}Max`);
        variables[`${channel}Max`] = parseInt(input.value, 10);
      }
      console.log('variables', variables);
      return variables;
    }

    const layer = new TileLayer({
      style: {
        variables: getVariables(),
        //style表达式
        //['array', value1, ...valueN]从数字值创建一个颜色数字数组

        color: [
          'array',
          //['/', value1, value2]，表示value1与value2相除，作用是标准化（其实也不太明白）
          //['band', bandIndex, xOffset, yOffset]只能用于瓦片图层。从资源（source）数据的波段（band）的索引（bandIndex）获取像素值。
          //['var', 'varName']从样式变量中获取值
          ['/', ['band', ['var', 'red']], ['var', 'redMax']],
          ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
          ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
          1,
        ],
      },
      source: new GeoTIFF({
        //关闭默认标准化
        normalize: false,
        sources: [
          {
            url: 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif',
          },
        ],
      }),
    });

    function update() {
      layer.updateStyleVariables(getVariables());
      console.log('@', layer);
    }
    const map = new Map({
      target: 'map',
      layers: [layer],
      view: new View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 2,
        maxZoom: 6,
      }),
    });
  },
};
</script>

<style>
#app {
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
}
.map {
  height: 90%;
}
.controls {
  height: 10%;
}
</style>