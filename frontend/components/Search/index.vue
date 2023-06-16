<template>
  <div class="sidebar__search">
    <div class="search__block">
      <div class="search__block-item" v-for="(item, i) of inputData" :key="item.id">
        <InputAddress @selected="onSelect($event, item.id)" :uuid="item.id" @drag="hideRoute" @dragend="updateRoute"
                      :origin="item?.get?.origin"/>
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
    <div class="spacer"></div>
    <button
        class="sidebar__search-btn"
        v-if="user && !saveDisabled"
        @click="saveRoute"
    >
      Сохарнить маршрут
    </button>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import {v4 as uuidv4} from "uuid";

import {storeToRefs} from "pinia";
import {useMapStore} from "~/store/map";
import {useGlobalStore} from "~/store/global";
import InputAddress from "../InputAddress";
import {formatPlaceData, getSearchData} from "../../composables/useMapbox";

const {toggleSidebar} = useGlobalStore();

const user = useStrapiUser();

const route = useRoute()

const routeMarkers = ref([]);
const routeData = ref({
  distance: 0,
  duration: 0
})

const store = useMapStore();

const {add, remove, getMarker} = store;
const {markers, map} = storeToRefs(store);

const inputData = useState('routesInputData', () => [{
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

const onSelect = (data, id) => {
  inputData.value = inputData.value.map(obj => {
    if (obj.id === id) {
      return {id, ...data};
    }
    return obj;
  });

  const element = document.createElement('div');

  element.className = 'marker red';
  element.setAttribute('data-id', id)
  element.innerHTML = `
    <div class="marker-content">
        <div class="dot"></div>
        <div class="text">${data.label}</div>
    </div>
   `

  const marker = new mapboxgl.Marker({element, draggable: true})
      .setLngLat(data.origin)


  marker.on('dragend', async () => {
    const {lng, lat} = marker.getLngLat()

    inputData.value = inputData.value.map(obj => {
      if (obj.id === id) {
        return {
          ...obj, get: {
            origin: [lng, lat]
          }
        };
      }
      return obj;
    });

    await updateRoute()
  })

  marker.on('dragstart', () => hideRoute())

  add(id, marker)
}

const saveDisabled = computed(() => (inputData.value.filter(el => el.origin).length !== inputData.value.length) || inputData.value.length < 2)

const makeRoute = async () => {
  if (saveDisabled.value) return;
  map.value.setLayoutProperty("theRoute", "visibility", "none");

  const markersQuery = inputData.value.map(el => el?.origin.join(','))?.join(';')

  const res = await getRouteData(markersQuery)
  const routes = res.data.routes

  for (let i = 0; i < (routes.length > 1 ? routes.length - 1 : routes.length); i++) {
    routeData.value.duration += routes[i].duration
    routeData.value.distance += routes[i].distance
  }

  for (let i = 0; i < res.data.waypoints.length; i++) {
    const el = res.data.waypoints[i]

    const id = inputData.value[i].id

    const element = document.querySelector(`[data-id="${id}"]`)
    element.classList.add('red')

    const text = element.querySelector('.text')
    text.textContent = inputData.value[i].label

    const marker = getMarker(id)
    marker.setLngLat(el.location)
  }

  map.value.getSource("theRoute").setData(res.data.routes[0].geometry);
  map.value.setLayoutProperty("theRoute", "visibility", "visible");
};

const getMarkerCoords = (marker) => {
  const {lng, lat} = marker._lngLat;
  return [lng, lat];
};

const currentRoute = useState("saveModalRoute");

const updateRoute = async () => {
  if (inputData.value.filter(el => el.origin).length > 1) {
    await makeRoute()
  }
}

const hideRoute = () => {
  map.value.setLayoutProperty("theRoute", "visibility", "none");
}

const saveRoute = () => {
  toggleSidebar();

  currentRoute.value = {
    ...routeData.value,
    routes: inputData.value
  };

  useToggleSaveModal();
};

watch(inputData, async () => {
  await makeRoute()
})
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
