import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

const CustomerGraph = () => {
  const [barChart, setBarChart] = useState("12m");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
  );
  const options = {
    maintainAspectRatio: true,
    interaction: {
      mode: "point" as const,
      axis: "xy" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "start" as const,
        labels: {
          padding: 50,
          color: "#fff",
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10,
          autoSkip: true,
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels:
      (barChart === "12m" && [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
      ]) ||
      (barChart === "30d" && ["Vecka 1", "Vecka 2", "Vecka 3", "Vecka 4"]) ||
      (barChart === "1v" && ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"]) ||
      [],
    datasets: [
      {
        axis: "y",
        label: "Sysslor avklarade",
        data: [15, 35, 5, 10, 20],
        fill: false,
        borderColor: "rgb(67, 53, 190)",
        backgroundColor: "rgb(67, 53, 190)",
        tension: 0.25,
        spanGaps: true,
      },

    ],
  };
  return (
    <>
      <ButtonGroup aria-label='Basic example'>
        <Button
          variant='primary'
          active={barChart === "12m" ? true : false}
          onClick={() => setBarChart("12m")}
        >
          12m
        </Button>
        <Button
          variant='primary'
          active={barChart === "30d" ? true : false}
          onClick={() => setBarChart("30d")}
        >
          30d
        </Button>
        <Button
          variant='primary'
          active={barChart === "1v" ? true : false}
          onClick={() => setBarChart("1v")}
        >
          1v
        </Button>
      </ButtonGroup>
      <div className='col-9'>
        <Bar data={data} options={options} style={{ maxHeight: 300 }} />
      </div>
    </>
  );
};

export default CustomerGraph;
