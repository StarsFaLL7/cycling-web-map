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

  setMap(map);

  map.on("click", () => {
    if (isSidebarOpen.value) {
      toggleSidebar();
    }
  });

  // map.on("style.load", async () => {
  // const p1 = [60.61869351127328, 56.827530289345844].join(",");
  // const p2 = [60.60498042012503, 56.82589910816674].join(",");
  // const p3 = [60.61437132100471, 56.82953224954301].join(",");
  // const res = await axios.get(
  //   `https://api.mapbox.com/directions/v5/mapbox/cycling/${p1};${p3};${p2}?alternatives=true&geometries=geojson&access_token=pk.eyJ1Ijoic2hpcm93YXlmeSIsImEiOiJjbGZ5M2EwNHIwaXZrM2VwaHVnN3JubjdlIn0.fUViaabp3gXDmKj9RfblVQ`
  // );
  // for (const el of res.data.waypoints) {
  //   new mapboxgl.Marker({ color: "red" }).setLngLat(el.location).addTo(map);
  // }
  // const popup = new mapboxgl.Popup({ closeOnClick: false })
  //   .setLngLat([60.59450399034171, 56.82120551155373])
  //   .setHTML("<h1>Hello World!</h1>")
  //   .addTo(map);
  // map.getSource("theRoute").setData(res.data.routes[0].geometry);
  // });
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
