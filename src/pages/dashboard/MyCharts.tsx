import Chart from 'react-apexcharts';

const MyCharts = () => {
  const options = {
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    theme: {
      mode: 'light',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'dark',
        shadeIntensity: 0.65
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#F55555', '#6078ea', '#6094ea'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100],
      },
    },
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

  const columnOptions = {
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands"
      }
    }
  }
  };

  const columnSeries = [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }];



  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
      <Chart options={options} series={series} type="area" height={350} />
      <Chart options={options} series={series} type="bar" height={350} />
      <Chart options={columnOptions} series={columnSeries} type="bar" height={350} />
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
