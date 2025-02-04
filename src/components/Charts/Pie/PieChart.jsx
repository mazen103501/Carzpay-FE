import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function PieChart() {
  const [state, setState] = useState({
    series: [12, 33],

    options: {
      chart: {
        type: "donut",
      },
      labels: ["Blink", "Capital Bank"],
      dataLabels: {
        formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
        />
      </div>
    </div>
  );
}

export default PieChart;
