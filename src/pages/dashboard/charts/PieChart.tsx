import { ApexOptions } from "apexcharts";
import { useState } from "react";
import Chart from "react-apexcharts";
import CustomLegend from "./CustomLegend";
interface Props {
  data?: number[];
  labels?: string[];
}

const PieChart: React.FC<Props> = ({ data, labels }: Props) => {
  const [hoveredSeriesIndex, setHoveredSeriesIndex] = useState(null);
  const handleLegendItemHover = (index) => {
    setHoveredSeriesIndex(index);
  };

  const colorPalette = ["#1fbd00", "#006ec2", "#fe2119"];
  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: "100%",
      width: "100%",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
        donut: {
          size: "75%",
        },
      },
    },
    colors: colorPalette,
    labels: labels ? labels : ["No data", "No data", "No data"],
    legend: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.8,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
  };

  if (hoveredSeriesIndex !== null) {
    const newColors = colorPalette.map((color, index) =>
      index === hoveredSeriesIndex ? color : "#e0e0e0",
    );

    options.colors = newColors;
  }

  return (
    <>
      <div className='d-flex flex-column'>
          <Chart
            series={data ? data : [0, 0, 0]}
            options={options}
            type='donut'
            width={"100%"}
            height={"100%"}
          />
        <div className='flex-fill'>
          <CustomLegend
            hoveredSeries={hoveredSeriesIndex}
            onLegendItemHover={handleLegendItemHover}
            labels={labels ? labels : [""]}
            series={data}
          />
        </div>
      </div>
    </>
  );
};

export default PieChart;
