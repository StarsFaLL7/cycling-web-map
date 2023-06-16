import axios from "axios";
import queryString from 'query-string';

export const getSearchData = async (query, params) => {
    const config = useRuntimeConfig();
    const {MAPBOX_ACCESS_TOKEN} = config.public;

    const paramsString = queryString.stringify(params);
    return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_ACCESS_TOKEN}&${paramsString}`)
}

export const formatPlaceData = (feat) => {
    const sub = feat.address ? ' ' + feat.address : ''
    const place = feat.context.filter(feat => feat.id.includes('place'))[0]

    const label = (feat.text_ru + sub).trim()
    const address = (feat.properties?.address + place ? ' ' + place.text_ru : '').trim()

    return {
        label,
        address,
        value: {
            label,
            address,
            origin: feat.center
        }
    }
}

export const getRouteData = async (query) => {
    const config = useRuntimeConfig();
    const {MAPBOX_ACCESS_TOKEN} = config.public;

    return await axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${query}?alternatives=true&geometries=geojson&annotations=duration,distance&access_token=${MAPBOX_ACCESS_TOKEN}`)
}


export const generateYandexMapsURL = (points) => {
    return `https://maps.yandex.ru/?mode=routes&rtt=bc&rtext=${points.map(el => el.reverse().join(',')).join('~')}`
}