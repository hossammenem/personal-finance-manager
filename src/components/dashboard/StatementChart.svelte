<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import type { IMoneyInMoneyOut } from "$types/types";

  export let data: IMoneyInMoneyOut[];

  let barChartElement: HTMLCanvasElement;

  const chartConfig = {
    labels: data.map(({ date })=> {
      const [_, month, day ] = date.substring(0, date.indexOf(date.match(/[a-zA-Z]/).pop())).split("-");
      return `${month}-${day}`;
    }),
    datasets: [
      {
        label: 'amount',
        data: data.map(({ amount }) => amount),
        borderColor: "black",
        pointBackgroundColor: "black",
        pointBorderColor: "black",
      },
    ],
  };

  onMount(() => {
    new Chart(barChartElement, {
      type: 'line',
      data: chartConfig,
      options: {
        maintainAspectRatio: false, 
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
</script>

<div>
  <canvas bind:this={barChartElement} />
</div>
