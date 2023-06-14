<template>
  <div>
    <div id="map"></div>
    <Transition name="slide" mode="out-in">
      <div class="map-card card" v-if="selectedPlaceData" :key="selectedPlaceData.title">
        <div class="close" @click="selectedPlaceData = null">
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
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import {XMarkIcon, GlobeEuropeAfricaIcon} from "@heroicons/vue/24/solid";


import {storeToRefs} from "pinia";
import {useGlobalStore} from "~/store/global";
import {useMapStore} from "~/store/map";

const store = useGlobalStore();
const {toggleSidebar} = store;
const {isSidebarOpen} = storeToRefs(store);

const mapStore = useMapStore();
const {setMap} = mapStore;
const {map} = storeToRefs(mapStore);

const config = useRuntimeConfig();

const {MAPBOX_ACCESS_TOKEN} = config.public;

const selectedPlaceData = ref(null)

const flyToPlace = (lngLat) => {
  console.log(mapStore.map)
  mapStore.map.flyTo({
    center: lngLat,
    essential: true,
    zoom: 14
  })
}

onMounted(async () => {
  const initialMap = await createMap();

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
    zoom: 10,
    maxBounds: [60.1042, 56.6342, 61.0479, 57.0652]
  });


  map.on("style.load", (e) => {
    console.log('LOADED')
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

    const {lat, lng} = place.origin
    new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

    el.addEventListener('click', (e) => {
      console.log('???', place)
      selectedPlaceData.value = place
    })
  }

  return map;
}
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

.marker {
  border-radius: 50%;

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
    padding: 25px;
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

  &__description {
    color: #9aa0a6;
  }


}
</style>
