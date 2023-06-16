<template>
  <div>
    <div id="map"></div>
    <dialog class="place-dialog" ref="dialog" v-show="routesInputData.filter(el => el.origin).length">
      <div class="place-dialog__overflow" @click="dialog.close()"></div>
      <div class="place-dialog__content">
        <h3 class="place-dialog__title">После какого места вы бы хотели посетить парк?</h3>
        <ul class="place-dialog__list">
          <li class="place-dialog__list-item" v-for="(item,i) of routesInputData" :key="i" @click="addPlace(i, selectedPlaceData.origin)">– {{ item.label }}</li>
        </ul>
      </div>
    </dialog>
    <Transition name="slide" mode="out-in">
      <div class="map-card card" v-if="showPlaceCard && selectedPlaceData" :key="selectedPlaceData.title">
        <div class="close" @click="clearPlace">
          <XMarkIcon/>
        </div>
        <img class="map-card__image" :src="selectedPlaceData.imageURL"/>
        <div class="map-card__content">
          <button class="show-btn" @click="flyToPlace([selectedPlaceData.origin.lng, selectedPlaceData.origin.lat])">
            <GlobeEuropeAfricaIcon/>
          </button>
          <h3 class="map-card__title">{{ selectedPlaceData.title }}</h3>
          <p class="map-card__description">
            {{ selectedPlaceData.description }}
          </p>
          <UIButton class="map-card__btn" @click="dialog.showModal()" v-show="routesInputData.filter(el => el.origin).length">Добавить в маршрут</UIButton>
        </div>
      </div>
      <div class="map-card card" v-else-if="showRouteCard && selectedRouteData" :key="selectedRouteData.title">
        <div class="close" @click="clearRoute">
          <XMarkIcon/>
        </div>
        <img class="map-card__image" src="@/assets/images/route-image.png"/>
        <div class="map-card__content">
          <button class="show-btn" @click="flyToPlace(selectedRouteData.coords[0])">
            <GlobeEuropeAfricaIcon/>
          </button>
          <span class="map-card__author" v-if="selectedRouteData.author && selectedRouteData.author.data">Автор: <span>{{
              selectedRouteData.author.data.attributes.username
            }}</span></span>
          <h3 class="map-card__title">{{ selectedRouteData.title }}</h3>
          <p class="map-card__description">
            {{ selectedRouteData.description }}
          </p>
          <h4 class="map-card__suptitle">Маршрут ({{ getDistance(selectedRouteData.distance) }},
            {{ getDuration(selectedRouteData.duration) }})</h4>
          <ul class="map-card__list">
            <li class="map-card__list-item" v-for="(item, i) of selectedRouteData.coords" :key="i">
              – {{ item.streetName }}
            </li>
          </ul>
          <a :href="generateYandexMapsURL(selectedRouteData.coords.map(({lng, lat}) => ([lng, lat])))" target="_blank"
             class="map-card__yandex-btn">
            Открыть в Яндекс Картах
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import {XMarkIcon, GlobeEuropeAfricaIcon, PlusIcon} from "@heroicons/vue/24/solid";
import {v4 as uuidv4} from "uuid";
import {useWindowSize} from '@vueuse/core'

const {width} = useWindowSize()


import {storeToRefs} from "pinia";
import {useGlobalStore} from "~/store/global";
import {useMapStore} from "~/store/map";
import {useState} from "nuxt/app";
import {formatPlaceData, getSearchData} from "../../composables/useMapbox";

const dialog = ref()

const store = useGlobalStore();
const {toggleSidebar} = store;
const {isSidebarOpen} = storeToRefs(store);

const mapStore = useMapStore();
const {setMap, remove, getMarker} = mapStore;
const {map} = storeToRefs(mapStore);


const config = useRuntimeConfig();

const {MAPBOX_ACCESS_TOKEN} = config.public;

const route = useRoute()

const selectedPlaceData = ref(null)
const showPlaceCard = ref(false)

const selectedRouteData = ref(null)
const showRouteCard = ref(false)

const routesInputData = useState('routesInputData')

const flyToPlace = (lngLat) => {
  mapStore.map.flyTo({
    center: lngLat,
    essential: true,
    zoom: 15
  })

  if (width.value < 600) {
    selectedPlaceData.value = null
  }
}

const clearPlace = () => {
  selectedPlaceData.value.el.classList.remove('active')
  selectedPlaceData.value = null
}

const clearRoute = () => {
  showRouteCard.value = false
}

const setRouteData = async () => {
  if (route.query.route) {
    showPlaceCard.value = false

    if (isSidebarOpen.value) {
      toggleSidebar()
    }

    selectedRouteData.value = await getRoute(route.query.route).then(res => res.data).then(el => ({id: el.id, ...el.attributes}))

    routesInputData.value.filter(el => el.origin).map(el => remove(el.id))
    routesInputData.value = selectedRouteData.value.coords.map(({lng, lat}) => {
      return {id: uuidv4(), get: {origin: [lng, lat]}}
    })

    showRouteCard.value = true
    showPlaceCard.value = false
  }
}

const getDistance = (distance) => {
  return (distance / 1000).toFixed(1) + ' ' + 'км'
}
const getDuration = (duration) => {
  return (duration / 60).toFixed(1) + ' ' + 'мин'
}

const addPlace = (i, {lng, lat}) => {
  const routes =  routesInputData.value
  routesInputData.value = [...routes.slice(0, i + 1), {
    id: uuidv4(),
    get: {origin: [lng, lat]}
  } , ...routes.slice(i + 1)]
  dialog.value.close()
}

onMounted(async () => {
  const initialMap = await createMap();
  await setRouteData()

  if (!map.value) {
    setMap(initialMap);
  }

  map.value.on("click", () => {
    if (isSidebarOpen.value) {
      toggleSidebar();
    }
  });

  map.value.once("style.load", () => {
    map.value.resize();
  });
});

async function createMap() {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

  let map = new mapboxgl.Map({
    container: "map",
    // style: "mapbox://styles/shirowayfy/clfzhtq3h002g01p6uubcw8yb",
    style: "mapbox://styles/shirowayfy/clfzhuyc1007m01nx6qedzgaz",
    center: [60.61660358181774, 56.83790908582503],
    zoom: 12,
    maxBounds: [60.1042, 56.6342, 61.0479, 57.0652]
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

  const places = await getPlaces().then(res => res.data.map(el => ({id: el.id, ...el.attributes})))

  for (const place of places) {
    const el = document.createElement('div');
    el.innerHTML = `
    <div class="marker-content">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="var(--icon-color)" d="M289.4 18c-1.2 1.9-1.9 3.91-2.3 5.99-1.4 8.93 4.9 18.7 17.5 26.87-40.4 19.75-61.8 52.14-52.5 79.74 7.7 22.9 35.3 38.4 71.8 40.3-3.1 28.7 14.9 50.2 41 48.8 9.2-.5 18.6-3.9 27.2-9.7 11.7 13.7 25.5 21 39.9 21 15.9 0 31.3-9.1 43.8-25.8 5.9 1.4 12 2.1 18.2 1.9V18H289.4zm132.7 230.2L409.5 493h45l-12.6-244.8c-3.2.5-6.5.8-9.9.8-3.4 0-6.7-.3-9.9-.8zM41 283v62h302v-62H41zm60 80v18h18v-18h-18zm164 0v18h18v-18h-18zM25 399v30h334v-30H25zm32 48v46h30v-46H57zm240 0v46h30v-46h-30z"/></svg>
    </div>
   `
    el.className = 'marker';
    place.el = el

    const {lat, lng} = place.origin
    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

    el.addEventListener('click', (e) => {
      showPlaceCard.value = true
      if (selectedPlaceData.value) clearPlace()

      el.classList.add('active')
      selectedPlaceData.value = place
    })
  }

  return map;
}

watch(() => route.query, async () => {
  await setRouteData()
})
</script>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

#map {
  width: 100vw;
  height: 100vh;
}

.mapboxgl-control-container {
  display: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.marker {
  border-radius: 50%;

  &.active {
    .marker-content {
      transform: scale(1.2);

      &::after {
        opacity: 1;
      }
    }
  }

  &.red {
    .marker-content {
      background: red;
      box-shadow: 0px 0px 10px 9px rgba(255, 0, 0, 0.2);
    }
  }

  &.green {
    .marker-content {
      background: $green-300;
      box-shadow: 0px 0px 10px 8px rgba(74, 156, 54, 0.2);


      .dot {
        background: $green-500;
      }
    }
  }

  &-content {
    transition: all .2s;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $green-200;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0px 0px 8px 0px rgba(74, 156, 54, 0.2);

    .dot {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #fff;
    }

    .text {
      position: absolute;
      bottom: -60%;
      white-space: nowrap;
      font-size: 14px;
      font-weight: bold;
      text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%233D8934FF' stroke-width='2' stroke-dasharray='50%25%2c 13%25' stroke-dashoffset='86' stroke-linecap='butt'/%3e%3c/svg%3e");
      border-radius: 100px;
      animation: rotate 3s infinite linear;
      opacity: 0;
    }

    &:hover {
      transform: scale(1.2);
    }

    svg {
      width: 65%;
      height: 65%;
      --icon-color: #{$green-500};
    }
  }
}

.map-card {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 300px;
  background: #202124;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 0.2);

  @media (max-width: 600px) {
    bottom: 20px;
    top: auto;
  }

  &__btn {
    width: 100%;
    color: #fff !important;
    background: $green-400 !important;
    border: none !important;

    &:hover {
      background: $green-500 !important;
    }
  }

  &__author {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 5px;

    span {
      color: $green-400;
    }
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;

    width: 35px;
    height: 35px;
    cursor: pointer;

    &::after {
      content: "";

      width: 110%;
      height: 110%;

      border-radius: 50%;
      opacity: 0;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(255, 255, 255, 0.1);

      transition: all 0.2s;
    }

    &:hover {
      &::after {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    svg {
      color: #fff;
    }
  }

  .map-card__image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: center;
  }

  &__content {
    padding: 30px 25px 25px;
    color: #fff;
    position: relative;

    .show-btn {
      position: absolute;
      right: 20px;
      top: 0;
      transform: translateY(-50%);

      cursor: pointer;
      transition: all .2s;

      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: $green-400;
      padding: 0;
      border: none;

      svg {
        color: #fff;
        transform: scale(.6);
      }

      &:hover {
        background: $green-500;
      }
    }
  }

  &__title {
    font-size: 20px;
    font-weight: normal;
    margin: 0;
  }

  &__suptitle {
    font-size: 18px;
    font-weight: normal;
    margin: 0 0 10px;
  }

  &__list {
    padding: 0;
    list-style: none;
    margin: 0 0 10px;

    &-item {
      color: #9aa0a6;

      &:not(:last-of-type) {
        margin-bottom: 5px;
      }
    }
  }

  &__yandex-btn {
    color: orangered;
    font-size: 16px;
  }


  &__description {
    color: #9aa0a6;
  }
}

.place-dialog {
  min-width: 100vw;
  min-height: 100vh;
  background: transparent;

  &__overflow {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
  }

  &__title {
    margin: 0 0 20px;
    font-weight: normal;
    font-size: 20px;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;

    &-item {
      padding: 0;
      color: #9aa0a6;
      transition: all .2s;
      cursor: pointer;

      &:hover {
        color: $green-400;
      }

      &:not(:last-of-type) {
        margin-bottom: 10px;
      }
    }
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
    background: #202124;
    color: #fff;
    border-radius: 10px;
    width: 400px;
  }

}
</style>
