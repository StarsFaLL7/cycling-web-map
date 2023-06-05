<template>
  <Multiselect @select="select" class="search-select" @search-change="debouncedHandler" searchable v-model="data" :options="result"
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
import axios from 'axios'
import Multiselect from '@vueform/multiselect'

const emits = defineEmits(['selected'])
const select = () => {
  emits('selected', data.value)
}

const config = useRuntimeConfig();
const {MAPBOX_ACCESS_TOKEN} = config.public;

const bbox = [60.1042, 56.6342, 61.0479, 57.0652]

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
  const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=ru&routing=true&bbox=${bbox.join(',')}`).then(res => res.data.features)

  const data = res.map(el => {
    const sub = el.address ? ' ' + el.address : ''
    const place = el.context.filter(el => el.id.includes('place'))[0]

    return {
      label: el.text_ru + sub,
      address: el.properties?.address + place ? ' ' + place.text_ru : '',
      value: {
        label: el.text_ru + sub,
        address: el.properties?.address + place ? ' ' + place.text_ru : '',
        origin: el.center
      }
    }
  })

  result.value = removeDuplicatesByObjKeys(data, ['label', 'address'])
}, 300);
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