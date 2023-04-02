<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import mapboxgl from "mapbox-gl";

const config = useRuntimeConfig();

const { MAPBOX_ACCESS_TOKEN } = config.public;

onMounted(() => {
  createMap();
});

function createMap() {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
  let map = new mapboxgl.Map({
    container: "map",
    // style: "mapbox://styles/shirowayfy/clfzhtq3h002g01p6uubcw8yb",
    style: "mapbox://styles/shirowayfy/clfzhuyc1007m01nx6qedzgaz",
    center: [60.61660358181774, 56.83790908582503],
    zoom: 10,
  });

  map.on("click", (e) => console.log(e));
}
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
}
.mapboxgl-control-container {
  display: none;
}
</style>
