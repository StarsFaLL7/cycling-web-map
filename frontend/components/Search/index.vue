<template>
  <div class="sidebar__search">
    <div class="search__block">
      <div class="search__block-item" v-for="(item, i) of inputData" :key="item.id">
        <InputAddress @selected="onSelect($event, i)" :uuid="item.id" @drag="removeRoute" />
        <button
          v-if="!inputData[i]?.label || i !== inputData.length - 1"
          @click="removeField(i)"
          class="search__block-btn remove"
        >
          <span class="material-symbols-outlined">
            remove
          </span>
        </button>
        <button
            @click="addField(i)"
            class="search__block-btn add"
            v-else
        >
          <span class="material-symbols-outlined">
            add
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
      v-if="user && inputData.length > 1"
      @click="saveRoute"
    >
      Сохарнить маршрут
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { v4 as uuidv4 } from "uuid";

import { storeToRefs } from "pinia";
import { useMapStore } from "~/store/map";
import { useGlobalStore } from "~/store/global";
import InputAddress from "../InputAddress";
import {getRouteData} from "../../composables/useMapbox";

const { toggleSidebar } = useGlobalStore();

const user = useStrapiUser();

const routeMarkers = ref([]);

const store = useMapStore();

const { add, remove } = store;
const { markers, map } = storeToRefs(store);

const inputData = ref([{
  id: uuidv4()
}])

const addField = (i) => {
  if (!inputData.value[i]?.label) return
  inputData.value.push({
    id: uuidv4()
  })
}

const removeField = (i) => {
  if (i === 0 && inputData.value.length === 1) return
  remove(inputData.value[i].id)
  inputData.value.splice(i, 1)
}

const onSelect = (data, i) => {
  inputData.value[i] = {id: inputData.value[i].id, ...data}

  const marker = new mapboxgl.Marker({ color: "#3d8934", draggable: true }).setLngLat(data.origin)
  add(inputData.value[i].id, marker)
}

const makeRoute = async () => {
  if (inputData.value.filter(el => el?.label?.length).length < 2 ) return;

  const markersQuery = Object.values(markers.value)
    .map((m) => getMarkerCoords(m).join(","))
    .join(";");

  const res = await getRouteData(markersQuery)

  for (const el of res.data.waypoints) {
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(el.location)
      .addTo(map.value);

    routeMarkers.value.push(marker);
  }

  map.value.setLayoutProperty("theRoute", "visibility", "visible");
  map.value.getSource("theRoute").setData(res.data.routes[0].geometry);
};

const getMarkerCoords = (marker) => {
  const { lng, lat } = marker._lngLat;
  return [lng, lat];
};

const currentRoute = useState("saveModalRoute");

const removeRoute =() => {
    routeMarkers.value.map((m) => m.remove());
    routeMarkers.value = [];

    map.value.setLayoutProperty("theRoute", "visibility", "none");
}

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
      gap: 10px;

      margin-bottom: 10px;
    }

    &-btn {
      border: none;
      border-radius: 4px;
      cursor: pointer;

      padding: 0;
      aspect-ratio: 1;
      flex-shrink: 0;
      flex-grow: 1;
      width: 45px;

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
