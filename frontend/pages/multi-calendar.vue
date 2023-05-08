<template>
  <div>
    <div style="text-align: center">
      {{ activeDates }}
    </div>
    <div class="calendar">
      <div class="calendar__times">
        <div class="calendar__time"></div>
        <!-- <div
          class="calendar__time"
          v-for="(time, i) of times"
          :key="time"
          :class="{
            active: activeDates.includes(i),
            'all-active': activeDates.includes(i) && activeDates.length === 2,
            filled:
              i < Math.max(...activeDates) && i > Math.min(...activeDates),
          }"
          :data-active="
            i === activeDates[0]
              ? 'first'
              : i === activeDates[1]
              ? 'second'
              : 'none'
          "
          @click="selectDate(i)"
        >
          <span>{{ time }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "empty",
});

const times = ref([
  [0, 3],
  [5, 8],
]);

// const times = ref([]);

// const activeDates = ref([]);

// for (let i = 0; i <= 23; i++) {
//   times.value.push(`${i}:00`);
//   times.value.push(`${i}:30`);
// }

// const selectDate = (i) => {
//   activeDates.value.push(i);

//   if (activeDates.value.length > 2) {
//     const [first, second] = activeDates.value;

//     activeDates.value = [
//       Math.abs(i - first) > Math.abs(i - second) ? first : second,
//       i,
//     ].sort((a, b) => a - b);

//     // activeDates.value = activeDates.value.slice(1);
//   }
// };
</script>

<style lang="scss" scoped>
.calendar {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  &__times {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 600px;
  }

  &__time {
    padding: 10px 30px;
    // border: 1px solid #dadeec;

    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    // transition: background 0.2s;
    cursor: pointer;
    position: relative;
    margin-bottom: 15px;

    &:not(:nth-of-type(4n)) {
      margin-right: 15px;
    }

    &:nth-of-type(1 + 4n) {
      &::after {
        background: #000;
      }
    }

    span {
      position: relative;
      z-index: 20;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      border: 1px solid #dadeec;
      z-index: 10;
      // transition: background 0.2s;
    }

    &.active {
      color: #fff;
      &::after {
        border-color: #32bd1b;
        background: #32bd1b;
      }
    }

    &.active.all-active {
      // border: 1px solid #32bd1b;
      background: #32bd1b;

      &:nth-of-type(4n)[data-active="first"] {
        border-radius: 10px !important;
      }

      &:nth-of-type(4n + 1)[data-active="second"] {
        border-radius: 10px !important;
        // &::after {
        //   border-radius: 10px 0 0 10px !important;
        // }
      }

      &[data-active="first"],
      &[data-active="second"] {
        background: #99df8d;
      }

      &[data-active="first"] {
        border-radius: 10px 0 0 10px;

        margin-right: 0;
      }

      &[data-active="second"] {
        border-radius: 0 10px 10px 0;
      }
    }

    &.filled {
      color: #fff;
      margin-right: 0;
      padding-right: 45px;

      & + .active.all-active {
        border-radius: 0 10px 10px 0;
      }

      &:nth-of-type(4n) {
        &::after {
          border-radius: 0 10px 10px 0 !important;
        }
      }

      &:nth-of-type(4n + 1) {
        &::after {
          border-radius: 10px 0 0 10px !important;
        }
      }

      &::after {
        background: #99df8d;
        border-radius: 0;
        border: none;
      }

      span {
        opacity: 0;
      }
    }

    &:not(.active):not(.filled):hover::after {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
