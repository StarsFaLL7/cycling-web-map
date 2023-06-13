<template>
  <form class="save-modal" v-if="isOpen" @submit.prevent="addRoute">
    <h1 class="save-modal__title">Новый маршрут</h1>
    <input
        class="save-modal__input"
        required
        type="text"
        placeholder="Название"
        v-model="title"
    />
    <textarea
        class="save-modal__text"
        required
        placeholder="Описание маршрута"
        v-model="description"
    />
    <div class="save-modal__controls">
      <UIButton>Сохранить</UIButton>
      <UIButton type="button" @click="useToggleSaveModal">Закрыть</UIButton>
    </div>
  </form>
</template>

<script setup>
const isOpen = useState("isSaveModalOpen", () => false);
const routeData = useState("saveModalRoute", () => []);
const {create} = useStrapi();

const title = ref("");
const description = ref("");

const addRoute = async () => {
  if (title.value.length && description.value.length) {
    try {
      const {distance, duration, routes} = routeData.value

      console.log(distance, duration)

      const coords = routes.map(feat => {
        const {label: streetName, origin} = feat

        return {
          streetName,
          lng: origin[0],
          lat: origin[1]
        }
      })

      await create("routes", {
        title: title.value,
        description: description.value,
        distance,
        duration,
        coords
      });
      useToggleSaveModal();
    } catch (e) {
    }
  }
};
</script>

<style lang="scss" scoped>
.save-modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 25px;
  background: #202124;
  color: #fff;
  border-radius: 10px;
  width: 400px;

  &__title {
    font-size: 24px;
    margin: 0 0 15px;
    font-weight: normal;
  }

  &__input,
  &__text {
    width: 100% !important;
    border-radius: 10px;
    border: 2px solid $green-300;
    background: transparent;
    color: #fff;

    &:focus {
      outline: none;
    }
  }

  &__input {
    padding: 8px 15px;
    margin-bottom: 15px;
  }

  &__text {
    resize: none;
    padding: 15px;
    min-height: 150px;
    margin-bottom: 15px;
  }

  &__controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .btn {
      color: #fff !important;
    }
  }
}
</style>
