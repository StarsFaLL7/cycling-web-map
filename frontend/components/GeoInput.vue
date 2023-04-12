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

const geocoder = new MapboxGeocoder({
  accessToken: MAPBOX_ACCESS_TOKEN,
  language: "ru",
  placeholder: "Введите адрес",
  types: "country,region,place,postcode,locality,neighborhood,address",
});

const result = ref();

geocoder.on("result", (e) => {
  removeMarker(result.value?.center);

  const marker = new mapboxgl.Marker()
    .setLngLat(e.result.center)
    .addTo(map.value);

  addMarker(marker);
  result.value = e.result;
});

onMounted(() => {
  geocoder.addTo(el.value);
});

defineExpose({
  result,
});
</script>

<style lang="scss">
.mapboxgl-ctrl-geocoder {
  min-width: 100%;

  .suggestions {
    position: relative;
  }
}
</style>
