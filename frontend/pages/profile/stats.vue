<template>
  <div class="profile__stats">
    <div class="profile__stats-text">Активность 1 мая 2023 - 31 мая 2023</div>
    <div class="profile__stats-chart" :key="datasetHidden">
      <div class="chart">
        <client-only>
          <Line :data="data" :options="options" />
        </client-only>
      </div>
      <div class="chart__controls">
        <button
          @click="showAllDatasets"
          :class="{ active: datasetHidden === null }"
        >
          Все
        </button>
        <button
          @click="hideDataset(0)"
          :class="{ active: datasetHidden === 0 }"
        >
          Время
        </button>
        <button
          @click="hideDataset(1)"
          :class="{ active: datasetHidden === 1 }"
        >
          Дистанция
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "vue-chartjs";

// const chartConfig = useChartConfig();

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "109 км | 67 ч 34 м",
    },
    legend: {
      display: false,
      fullSize: true,
      labels: {
        boxWidth: 0,
      },
    },
  },
  scales: {
    x: {
      // display: false,
      title: {
        text: "День",
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Км / Часы",
      },
      suggestedMin: 0,
      suggestedMax: 10,
    },
  },
});

onMounted(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
});

const datasetHidden = ref(null);

const distance = ref([
  6, 4, 9, 10, 9, 5, 2, 4, 3, 5, 1, 6, 2, 5, 3, 9, 1, 5, 2, 10, 8, 3, 8, 10, 1,
  3, 1, 4, 3, 1, 10,
]);

const time = ref([
  10, 8, 3, 8, 10, 1, 3, 1, 4, 3, 1, 10, 6, 4, 9, 10, 9, 5, 2, 4, 3, 5, 1, 6, 2,
  5, 3, 9, 1, 5, 2,
]);

const data = ref({
  labels: Array.from({ length: 31 }, (_, i) => i + 1),
  datasets: [
    {
      label: "Пройдено - Км",
      // backgroundColor: "#0E5979",
      data: distance.value,
      fill: false,
      borderColor: "#0E5979",
      tension: 0.1,
    },
    {
      label: "Длительность - Часы",
      // backgroundColor: "#0E5979",
      data: time.value,
      fill: false,
      borderColor: "#84CDEE",
      tension: 0.1,
    },
  ],
});

const showAllDatasets = () => {
  data.value.datasets[0].hidden = false;
  data.value.datasets[1].hidden = false;
  options.value.scales.y.title.text = "Км / Часы";

  datasetHidden.value = null;
};

const hideDataset = (i) => {
  data.value.datasets[1 - i].hidden = false;
  data.value.datasets[i].hidden = true;

  options.value.scales.y.title.text = i === 1 ? "Км" : "Часы";

  datasetHidden.value = i;
  console.log(datasetHidden.value);
};
</script>

<style lang="scss" scoped>
.profile__stats {
  &-text {
    font-weight: 700;
    font-size: 18px;
    line-height: 33px;
  }

  &-chart {
    .chart {
      height: 300px;
    }

    .chart__controls {
      display: flex;
      // justify-content: center;
      gap: 20px;
      margin-top: 15px;

      button {
        width: 200px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: rgba(132, 205, 238, 0.1);
        border: 1px solid #84cdee;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: rgba(14, 89, 121, 0.8);
        transition: all 0.2s;
        cursor: pointer;

        &.active,
        &:hover {
          background: #84cdee;
        }
      }
    }
  }
}
</style>
