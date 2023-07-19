interface Props {
  series: any;
  labels: string[];
  hoveredSeries: number | null;
  onLegendItemHover: (index: number | null) => void;
  colors?: string[];
}

const CustomLegend = ({ series, labels, hoveredSeries, onLegendItemHover, colors }: Props) => {
  return (
    <div className='d-flex gap-2 justify-content-center mb-3'>
      {series.map((data, index) => {
        const seriesValue = labels[index];

        const isHovered = hoveredSeries === index;
        const legendItemStyle = isHovered ? { opacity: 1 } : { opacity: 0.5 };

        return (
          <div
            key={index}
            style={legendItemStyle}
            className={`rounded-pill px-3 py-1 fs-7 border bg-success`}
            onMouseEnter={() => onLegendItemHover(index)}
            onMouseLeave={() => onLegendItemHover(null)}
          >
            {seriesValue}
          </div>
        );
      })}
    </div>
  );
};

export default CustomLegend;
