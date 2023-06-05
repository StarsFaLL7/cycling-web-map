import { defineStore } from "pinia";

export const useMapStore = defineStore({
  id: "map-store",
  state: () => {
    return {
      markers: {},
      map: null,
    };
  },
  actions: {
    add(id, marker) {
      if (this.markers[id]) this.markers[id].remove()

      this.markers[id] = marker;
      marker.addTo(this.map)
    },
    remove(id) {
      // if (coords?.length === 2) {
      //   this.$patch({
      //     markers: this.markers.filter((el) => {
      //       const { lng, lat } = el._lngLat;
      //
      //       const isRemove = coords[0] === lng && coords[1] === lat;
      //
      //       if (isRemove) {
      //         el.remove();
      //       }
      //
      //       return !isRemove;
      //     }),
      //   });
      // }
      this.markers[id].remove()
      delete this.markers[id]
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
