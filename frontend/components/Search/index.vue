<template>
  <div class="sidebar__search">
    <div class="search__block">
      <div class="search__block-item" v-for="(n, i) of inputs" :key="n">
        <GeoInput ref="data" :zIndex="zIndexLimit - i" />
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
    <div class="spacer"></div>
    <button
      class="sidebar__search-btn"
      v-if="user && inputs.length > 1"
      @click="saveRoute"
    >
      Сохарнить маршрут
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import mapboxgl from "mapbox-gl";

import { storeToRefs } from "pinia";
import { useMapStore } from "~/store/map";
import { useGlobalStore } from "~/store/global";

const { toggleSidebar } = useGlobalStore();

const user = useStrapiUser();

const routeMarkers = ref([]);
const zIndexLimit = 1000;

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

  map.value.setLayoutProperty("theRoute", "visibility", "none");
};

const makeRoute = async () => {
  if (data.value.map((el) => el.result)?.length < 2) return;

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
const currentRoute = useState("saveModalRoute");

const saveRoute = () => {
  toggleSidebar();
  currentRoute.value = data.value;
  useToggleSaveModal();
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
          min-width: 100%;
          // max-width: calc(100% - 46px);
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
          background: $green-400;
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

  .spacer {
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background: $green-400;
    display: flex;
    margin: 0 auto 15px;
  }

  &-btn {
    border: none;
    border-radius: 4px;

    width: 100%;
    padding: 8px;

    cursor: pointer;
    transition: all 0.2s;

    &:first-of-type {
      margin-bottom: 15px;
    }

    &:hover {
      // background: rgba(255, 255, 255, 0.2);
      background: $green-400;
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
