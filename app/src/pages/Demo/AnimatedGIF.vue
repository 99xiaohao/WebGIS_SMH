<template>
  <div id="app">
    <div class="map" id="map"></div>
  </div>
</template>

<script>
import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { Stamen, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import earth from '@/assets/globe.gif';
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapinit();
  },
  methods: {
    mapinit() {
      //创建一个点要素，后面会在这个点的位置上放gif
      const iconFeature = new Feature({
        geometry: new Point([0, 0]),
      });

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      const rasterLayer = new TileLayer({
        //加载Stamen瓦片服务器的图层源
        source: new Stamen({
          layer: 'toner',
        }),
      });

      const map = new Map({
        layers: [rasterLayer, vectorLayer],
        target: document.getElementById('map'),
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      //   const gifUrl = '../../assets/earth.gif';
      const gif = gifler(earth);
      //frames共有三个参数，第一个参数是canvas元素，第二个是一个回调函数用于渲染每一帧
      //第三个参数是可选的为布尔值，如果为真，画布的宽度/高度将设置为加载的GIF的尺寸
      //这里用这个方法是为了控制每一帧的位置在前面创建的点上
      gif.frames(
        document.createElement('canvas'),
        //这个回调有三个参数：ctx是一个canvas的2d绘图上下文(可以在<canvas>元素上调用getContext('2d')查看)，用来渲染GIF帧
        //第二个frame是一个包含GIF帧信息的对象，包括宽度、高度、x坐标、y坐标和像素数据
        //第三个delay是一个表示GIF帧持续时间的数字，单位是毫秒
        //这个回调的作用是在canvas上绘制gif帧
        function (ctx, frame) {
          //要素的样式为空为其添加样式
          if (!iconFeature.getStyle()) {
            debugger;
            iconFeature.setStyle(
              new Style({
                image: new Icon({
                  //这里将绘制的gif帧当作图标来显示，这样就将GIF定位到这个点的位置了
                  img: ctx.canvas,
                  imgSize: [frame.width, frame.height],
                  opacity: 0.8,
                }),
              }),
            );
          }

          //ctx.clearRect()方法是一个用来清除canvas上指定矩形区域的像素的方法。
          //它将矩形区域的像素设置为透明的黑色。它有四个参数：x，y，width和height，分别表示矩形区域的左上角坐标和宽度和高度
          ctx.clearRect(0, 0, frame.width, frame.height);

          //frame.buffer返回一个当前帧的canavs元素
          //console.log('frame.buffer', frame.buffer);
          //ctx.drawImage()方法是一个用来在canvas上绘制图像的方法。drawImage(image, dx, dy)，表示将图像绘制在canvas上的(dx, dy)坐标处。
          ctx.drawImage(frame.buffer, frame.x, frame.y);

          //重新渲染地图，这样就可以在地图上显示GIF动画
          map.render();
        },
        true,
      );
      debugger;
      // change mouse cursor when over icon
      map.on('pointermove', function (e) {
        //获取事件发生的像素位置
        const pixel = map.getEventPixel(e.originalEvent);
        //获取像素位置的要素
        const hit = map.hasFeatureAtPixel(pixel);
        //改变鼠标样式
        map.getTarget().style.cursor = hit ? 'pointer' : '';
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