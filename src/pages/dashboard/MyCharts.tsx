import Chart from 'react-apexcharts';

const MyCharts = () => {
  const options = {
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const donutOptions = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    colors: ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff'],
    legend: {
      show: true,
      position: 'bottom'
    }
  };

  const donutSeries = [44, 55, 13, 43, 22];

  const series = [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 80, 75, 90],
      color: '#ff0000' // red
    },
    {
      name: 'Series 2',
      data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
      color: '#0000ff' // blue
    },
    {
      name: 'Series 3',
      data: [20, 45, 30, 80, 70, 55, 90, 110, 80, 75, 60, 45],
      color: '#00ff00' // green
    }
  ];

  const histogramSeries = [
    {
      name: 'Series 1',
      data: [21, 22, 10, 28, 16, 21, 13, 30, 18, 29, 22, 12]
    },
    {
      name: 'Series 2',
      data: [10, 15, 8, 12, 19, 6, 7, 13, 10, 24, 8, 10]
    }
  ];

  const histogramOptions = {
    chart: {
      type: 'histogram'
    },
    plotOptions: {
      histogram: {
        bins: 7
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: 'Data',
        data: [21, 22, 10, 28, 16, 21, 13, 30, 18, 29, 22, 12]
      }
    ]
  };

  const pieOptions = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    legend: {
      show: true,
      position: 'bottom'
    }
  };
  const pieSeries = [44, 55, 13, 43, 22];


  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
      <Chart options={options} series={series} type="area" height={350} />
      <Chart options={options} series={series} type="bar" height={350} />
      <Chart options={donutOptions} series={donutSeries} type="donut" height={350} />
      <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
      <Chart options={histogramOptions} series={histogramSeries} type="histogram" height={350} />
      {/*
      <Chart options={options} series={series} type="radialBar" height={350} />
      <Chart options={options} series={series} type="scatter" height={350} />
      <Chart options={options} series={series} type="bubble" height={350} />
      <Chart options={options} series={series} type="heatmap" height={350} />
      <Chart options={options} series={series} type="radar" height={350} />
      <Chart options={options} series={series} type="polarArea" height={350} />
      <Chart options={options} series={series} type="rangeBar" height={350} />
      <Chart options={options} series={series} type="candlestick" height={350} />
      <Chart options={options} series={series} type="boxPlot" height={350} />
      <Chart options={options} series={series} type="treemap" height={350} /> */}
    </div>
  );
};

export default MyCharts;
