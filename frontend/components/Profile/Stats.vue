<template>
  <div class="chart">
    <client-only>
      <Line :data="data" :options="options" />
    </client-only>
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
        text: "Км",
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
      borderColor: "#3d8934",
      tension: 0.1,
    },
    // {
    //   label: "Длительность - Часы",
    //   // backgroundColor: "#0E5979",
    //   data: time.value,
    //   fill: false,
    //   borderColor: "#3d8934",
    //   tension: 0.1,
    // },
  ],
});
</script>

<style lang="scss" scoped>
.chart {
  height: 300px;
  min-width: 600px;
  overflow: auto;
  padding: 0 20px;
}
</style>
