import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Props {
  data: any;
  colors?: any;
}

const LineChart: React.FC<Props> = ({ colors, data }) => {
  const options: ApexOptions = {
    chart: {
          type: 'area',
          offsetX: -23,
          offsetY: 23,
          height: '100%',
      width: "100%",
      toolbar: {
        show: false, // Hide the chart toolbar
      },
      },
      dataLabels: {
        enabled: false
      },
    series: [
      {
        name: 'Sales',
        data: data,
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      labels: {
        show: false, // Hide x-axis labels
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
      show: false, // Hide y-axis grid lines
    },
    legend: {
      show: false, // Hide the legend
    },
  };

  return <Chart options={options} series={options.series} type="area" width={"100%"} height="100%" />;
};

export default LineChart;
