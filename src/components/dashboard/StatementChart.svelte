<script lang="ts">
  import Chart from "chart.js/auto";
  import type { IMoneyInMoneyOut } from "$types/types";

  export let data: IMoneyInMoneyOut[];

  let barChartElement: HTMLCanvasElement | undefined;
  let chartObject: Chart | undefined;

  $: {
    if(barChartElement != undefined) {
      if (chartObject != undefined) {
        chartObject.destroy();
      }
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
      chartObject = new Chart(barChartElement, {
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
    }
  }

</script>

<div>
  <canvas bind:this={barChartElement} />
</div>
