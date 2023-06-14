<template>
  <div>
    <div id="map"></div>
    <Transition name="slide">
      <div class="map-card card" v-if="selectedPlaceData">
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
const { map } = storeToRefs(mapStore);

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
        <img src="${getLocalUrl('/images/park-icon.svg')}" />
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
    background: $green-400;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    img {
      width: 65%;
      height: 65%;
      object-fit: contain;
      object-position: center;
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
