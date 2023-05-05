export const useChartConfig = () => {
  const data = {
    // labels: [
    //   "Январь",
    //   "Февраль",
    //   "Март",
    //   "Апрель",
    //   "Май",
    //   "Июнь",
    //   "Июль",
    //   "Август",
    //   "Сентябрь",
    //   "Октябрь",
    //   "Ноябрь",
    //   "Декабрь",
    // ],
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Пройдено - Км",
        // backgroundColor: "#0E5979",
        data: [
          6, 4, 9, 10, 9, 5, 2, 4, 3, 5, 1, 6, 2, 5, 3, 9, 1, 5, 2, 10, 8, 3, 8,
          10, 1, 3, 1, 4, 3, 1, 10,
        ],
        fill: false,
        borderColor: "#0E5979",
        tension: 0.1,
      },
    ],
  };

  const options = {
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
  };

  return { options, data };
};
