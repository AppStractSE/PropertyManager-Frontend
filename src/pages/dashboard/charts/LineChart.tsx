import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

interface Props {
  data: any;
  colors?: any;
}

const LineChart: React.FC<Props> = ({ colors, data }: Props) => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 100,
      width: "100%",
      toolbar: {
        show: false, // Hide the chart toolbar
      },
      zoom: {
        enabled: false, // Disable zooming
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 2,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div class="arrow_box">' +
          "<span>" +
          w.globals.labels[dataPointIndex] +
          ": " +
          series[seriesIndex][dataPointIndex] +
          "</span>" +
          "</div>"
        );
      },

      followCursor: true,
    },
    dataLabels: {
      enabled: false, // Hide the data labels
    },
    series: [
      {
        name: "Sales",
        data: data,
      },
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      crosshairs: {
        show: false,
      },
      labels: {
        show: false, // Hide x-axis labels
      },
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      },
      axisBorder: {
        show: false, // Hide y-axis border
      },
      axisTicks: {
        show: false, // Hide y-axis ticks
      },
    },
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    markers: {
      size: 4,
      colors: "var(--bs-secondary)",
      shape: "circle",
      radius: 2,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
  };

  return <Chart options={options} series={options.series} type='line' width={"100%"} height={"100%"} />;
};

export default LineChart;
