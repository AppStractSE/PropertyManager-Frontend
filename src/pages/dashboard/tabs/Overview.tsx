import { useState } from "react";
import Chart from "react-apexcharts";
import { Button } from "react-bootstrap";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();
  const [periodic, setPeriodic] = useState(0);
  const options = {
    series: [44, 55, 12],
    labels: ["Påbörjade", "Klara", "Ej påbörjade"],
    chart: {
      type: "donut",
      width: 100,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
      },
    },
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    reponsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <div className='p-3 my-2 border-1 border-bottom'>
        <div className='h1 mb-0'>Översikt</div>
      </div>
      <div className='p-3'>
        <div>
          <Button
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => navigate("/report/create")}
          >
            <HiOutlineDocumentReport size={18} />
            <div>Skapa rapport</div>
          </Button>
        </div>

        <div className='row'>
          <div className='col-12 col-md-6 my-4'>
            <div className='p-3 rounded border' style={{ background: "#fcfcfc" }}>
              <div className='h4 mb-4'>Sysslor</div>
              <div style={{ maxHeight: 150, overflow: "hidden" }}>
                <Chart series={options.series} options={options} type='donut' />
              </div>
            </div>
          </div>

          <div className='col-12 col-md-6 my-4'>
            <div className='p-3 rounded border' style={{ background: "#fcfcfc" }}>
              <div className='h4 mb-4'>Sysslor</div>
              <div style={{ maxHeight: 150, overflow: "hidden" }}>
                <Chart series={options.series} options={options} type='donut' />
              </div>
            </div>
          </div>

          <div className='col-12 my-4'>
            <div className='p-3 rounded border' style={{ background: "#fcfcfc" }}>
              <div className='h4 mb-4'>Sysslor</div>
              <Chart series={options.series} options={options} type='donut' width={"50%"} />
            </div>
          </div>
        </div>

        <div className='my-4 border rounded p-3'>
          <div className='h3 mb-4'>Sysslor</div>
          <div className='d-flex gap-2'>
            <Button
              onClick={() => setPeriodic(0)}
              className={`rounded border border-dark px-3 py-1 ${periodic === 0 && "bg-dark"}`}
            >
              Årligen
            </Button>
            <Button
              onClick={() => setPeriodic(1)}
              className={`rounded border border-dark px-3 py-1  ${periodic === 1 && "bg-dark"}`}
            >
              Månadsvis
            </Button>
            <Button
              onClick={() => setPeriodic(2)}
              className={`"rounded border border-dark px-3 py-1  ${periodic === 2 && "bg-dark"}`}
            >
              Veckovis
            </Button>
          </div>

          <div className='my-3 d-flex justify-content-between row'>
            <div className='col-12 col-md-4 mt-2'>
              <div className='border rounded p-4 d-flex align-items-center justify-content-between'>
                <div className='h1 mb-0'>23</div>
                <div className='h5 mb-0'>Avklarade</div>
              </div>
            </div>

            <div className='col-12 col-md-4 mt-2'>
              <div className='border rounded p-4 d-flex align-items-center justify-content-between'>
                <div className='h1 mb-0'>29</div>
                <div className='h5 mb-0'>Påbörjade</div>
              </div>
            </div>

            <div className='col-12 col-md-4 mt-2'>
              <div className='border rounded p-4 d-flex align-items-center justify-content-between'>
                <div className='h1 mb-0'>13</div>
                <div className='h5 mb-0'>Ej påbörjade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
