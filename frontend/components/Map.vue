<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import mapboxgl from "mapbox-gl";

import { storeToRefs } from "pinia";
import { useGlobalStore } from "~/store/global";
import { useMapStore } from "~/store/map";

const store = useGlobalStore();
const { toggleSidebar } = store;
const { isSidebarOpen } = storeToRefs(store);

const mapStore = useMapStore();
const { setMap } = mapStore;

const config = useRuntimeConfig();

const { MAPBOX_ACCESS_TOKEN } = config.public;

onMounted(async () => {
  const map = await createMap();

  if (!mapStore.map) {
    setMap(map);
  }

  map.on("click", () => {
    if (isSidebarOpen.value) {
      toggleSidebar();
    }
  });

  map.once("style.load", () => {
    map.resize();
  });
});

async function createMap() {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  let map = new mapboxgl.Map({
    container: "map",
    // style: "mapbox://styles/shirowayfy/clfzhtq3h002g01p6uubcw8yb",
    style: "mapbox://styles/shirowayfy/clfzhuyc1007m01nx6qedzgaz",
    center: [60.61660358181774, 56.83790908582503],
    zoom: 10,
  });

  map.on("style.load", (e) => {
    map.addSource("theRoute", {
      type: "geojson",
      data: {
        type: "Feature",
      },
    });

    map.addLayer({
      id: "theRoute",
      type: "line",
      source: "theRoute",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "red",
        "line-opacity": 0.8,
        "line-width": 5,
        "line-blur": 0.5,
      },
    });
  });
  return map;
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
