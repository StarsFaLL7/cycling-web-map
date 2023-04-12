import { defineStore } from "pinia";

export const useMapStore = defineStore({
  id: "map-store",
  state: () => {
    return {
      markers: [],
      map: null,
    };
  },
  actions: {
    addMarker(marker) {
      this.markers.push(marker);
    },
    removeMarker(coords: number[]) {
      if (coords?.length === 2) {
        this.$patch({
          markers: this.markers.filter((el) => {
            const { lng, lat } = el._lngLat;

            const isRemove = coords[0] === lng && coords[1] === lat;

            if (isRemove) {
              el.remove();
            }

            return !isRemove;
          }),
        });
      }
    },
    setMap(map) {
      this.$patch({
        map,
      });
    },
  },
  getters: {
    allMarkers: (state) => state.markers,
  },
});
