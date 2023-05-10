<template>
  <div class="geo-input" ref="el"></div>
</template>

<script setup>
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";

import { storeToRefs } from "pinia";
import { useMapStore } from "~/store/map";

const config = useRuntimeConfig();
const { MAPBOX_ACCESS_TOKEN } = config.public;

const store = useMapStore();

const { addMarker, removeMarker } = store;
const { markers, map } = storeToRefs(store);

const el = ref();

const { zIndex } = defineProps(["zIndex"]);

const geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_ACCESS_TOKEN,
  language: "ru",
  autocomplete: true,
  countries: "ru",
  bbox: [60.1042, 56.6342, 61.0479, 57.0652],
  placeholder: "Введите адрес",
  routing: true,
  worldview: "ru",
  fuzzyMatch: true,
  proximity: {
    longitude: 60.60825,
    latitude: 56.839104,
  },
});

const result = ref();

geocoder.on("result", (e) => {
  console.log(e.result.center);
  removeMarker(result.value?.center);

  const marker = new mapboxgl.Marker({ color: "#62ae45" })
    .setLngLat(e.result.center)
    .addTo(map.value);

  addMarker(marker);
  result.value = e.result;
});

onMounted(() => {
  geocoder.addTo(el.value);
  geocoder.container.style.zIndex = zIndex;
});

defineExpose({
  result,
});
</script>

<style lang="scss">
.mapboxgl-ctrl-geocoder {
  //   min-width: 100%;

  .suggestions {
    // position: relative;
  }
}
</style>
