<template>
  <div class="sidebar__search">
    <div class="search__block">
      <div class="search__block-item" v-for="(n, i) of inputs" :key="n">
        <GeoInput ref="data" />
        <button
          class="search__block-btn"
          :class="{
            remove: i < inputs.length - 1,
            add: i === inputs.length - 1,
          }"
          @click="i < inputs.length - 1 ? decrement(i) : increment()"
        >
          <span class="material-symbols-outlined" v-if="data && data[i]">
            {{ i < inputs.length - 1 ? "close" : "add" }}
          </span>
        </button>
      </div>
    </div>
    <button class="sidebar__search-btn" @click="makeRoute">
      Построить маршрут
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import mapboxgl from "mapbox-gl";

import { storeToRefs } from "pinia";
import { useMapStore } from "~/store/map";

const routeMarkers = ref([]);

const store = useMapStore();

const { removeMarker } = store;
const { markers, map } = storeToRefs(store);

const data = ref();
const inputs = ref([0]);

const increment = () => {
  if (data.value[data.value.length - 1].result) {
    inputs.value.push(inputs.value[inputs.value.length - 1] + 1);
  }
};

const decrement = (i) => {
  inputs.value = inputs.value.filter((_, k) => k !== i);

  removeMarker(data.value[i].result.center);
  routeMarkers.value.map((m) => m.remove());
  routeMarkers.value = [];

  map.value.setLayoutProperty("theRoute", "visibility", "hidden");
};

const makeRoute = async () => {
  const markersQuery = markers.value
    .map((m) => getMarkerCoords(m).join(","))
    .join(";");

  const res = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${markersQuery}?alternatives=true&geometries=geojson&access_token=pk.eyJ1Ijoic2hpcm93YXlmeSIsImEiOiJjbGZ5M2EwNHIwaXZrM2VwaHVnN3JubjdlIn0.fUViaabp3gXDmKj9RfblVQ`
  );

  for (const el of res.data.waypoints) {
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(el.location)
      .addTo(map.value);

    routeMarkers.value.push(marker);
  }

  // const popup = new mapboxgl.Popup({ closeOnClick: false })
  //   .setLngLat([60.59450399034171, 56.82120551155373])
  //   .setHTML("<h1>Hello World!</h1>")
  //   .addTo(map);

  map.value.setLayoutProperty("theRoute", "visibility", "visible");
  map.value.getSource("theRoute").setData(res.data.routes[0].geometry);
};

const getMarkerCoords = (marker) => {
  const { lng, lat } = marker._lngLat;
  return [lng, lat];
};
</script>

<style lang="scss">
.sidebar__search {
  .search__block {
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;

      margin-bottom: 10px;
      & .geo-input {
        width: 100%;

        .mapboxgl-ctrl-geocoder {
          max-width: calc(100% - 46px);
          width: 100%;
        }
      }
    }

    &-btn {
      border: none;
      border-radius: 4px;
      cursor: pointer;

      padding: 0;

      min-width: 36px;
      min-height: 36px;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: all 0.2s;

      &.add {
        &:hover {
          background: green;
          color: #fff;
        }
      }

      &.remove {
        &:hover {
          background: red;
          color: #fff;
        }
      }
    }
  }

  &-btn {
    border: none;
    border-radius: 4px;

    width: 100%;
    padding: 8px;

    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
