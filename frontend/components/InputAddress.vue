<template>
  <Multiselect ref="selectElement" @select="select" class="search-select" @search-change="debouncedHandler" searchable
               v-model="data" :options="result"
               close-on-select placeholder="Введите запрос" noOptionsText="Нет Результатов">
    <template v-slot:option="{ option }">
      <div class="search-select__option">
        <h4>{{ option.label }}</h4>
        <span v-if="option.address">{{ option.address }}</span>
      </div>
    </template>
  </Multiselect>
</template>

<script setup>
import debounce from "lodash.debounce";
import Multiselect from '@vueform/multiselect'
import {storeToRefs} from "pinia";
import {useMapStore} from "../store/map";
import {formatPlaceData, getSearchData} from "../composables/useMapbox";

const store = useMapStore();

const {add, remove} = store;
const {markers, map} = storeToRefs(store);

const params = {
  language: 'ru',
  routing: 'true',
  bbox: [60.1042, 56.6342, 61.0479, 57.0652].join(',')
}

const selectElement = ref()

const emits = defineEmits(['selected', 'dragend', 'drag'])

const select = () => {
  emits('selected', data.value)
  // const marker = markers.value[props.uuid]
  //
  // marker.on('dragend', async () => {
  //   const {lng, lat} = marker.getLngLat()
  //
  //   const result = await getSearchData(`${lng},${lat}`, params).then(res => formatPlaceData(res.data.features[0]))
  //   selectElement.value.select(result)
  //   emits('dragend')
  // })
  //
  // marker.on('dragstart', () => emits('drag'))
}

const props = defineProps({
  uuid: String,
  origin: Array
})

const result = ref([])
const data = ref()

const removeDuplicatesByObjKeys = (arr, keys) => {
  const uniqueObj = {};
  arr.forEach((obj) => {
    let objKey = '';
    keys.forEach((key) => {
      objKey += obj[key];
    });
    if (!uniqueObj.hasOwnProperty(objKey)) {
      uniqueObj[objKey] = obj;
    }
  });
  return Object.values(uniqueObj);
};

const debouncedHandler = debounce(async query => {
  const res = await getSearchData(query, params).then(res => res.data.features)
  const data = res.map(formatPlaceData)

  result.value = removeDuplicatesByObjKeys(data, ['label', 'address'])
}, 300);

const updateOrigin = async () => {
  if (props.origin) {
    const response = await getSearchData(props.origin.join(','), params).then(res => formatPlaceData(res.data.features[0]))
    selectElement.value.select(response)
  }
}

onMounted(async () => {
  await updateOrigin()
})

watch(() => props.origin, async () => {
  await updateOrigin()
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
.search-select {
  &__option {
    h4 {
      margin: 0;
    }
  }
}
</style>