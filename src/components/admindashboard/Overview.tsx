import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChoreCommentResponseDto } from "../../api/client";
import { CustomerChoreComments } from "../modals/CustomerChore/CustomerChoreComments";

interface Props {
  chorecomments: ChoreCommentResponseDto[];
}

const Overview = ({ chorecomments }: Props) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
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
          stepSize: 2,
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
    labels: ["December", "January", "February"],
    datasets: [
      {
        label: "Sysslor avklarade",
        data: [15, 35, 5],
        fill: false,
        borderColor: "rgb(67, 53, 190)",
        backgroundColor: "rgb(67, 53, 190)",
        tension: 0.25,
        spanGaps: true,
      },
      {
        label: "Kommentarer postade",
        data: [
          chorecomments.filter((x) => x.time.toString().includes("2022-12")).length,
          chorecomments.filter((x) => x.time.toString().includes("2023-01")).length,
          chorecomments.filter((x) => x.time.toString().includes("2023-02")).length,
        ],
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        backgroundColor: "rgb(255, 0, 0)",
        tension: 0.25,
      },
    ],
  };
  return (
    <div className='row gap-4'>
      <div className="row">
      <div className='fs-3 mb-2'>Översikt</div>
      <div className='col-xl-9 col-lg-8 col-sm-12 col-12'>
      <div className="mb-0 fs-5">Generell översikt</div>
        <Line options={options} data={data} className='w-100 h-auto' style={{ maxHeight: 350 }} />
      </div>
      <div className='col-xl-3 col-lg-4 col-sm-12 col-12'>
        <div className="mb-2 fs-5">Senaste kommentarer</div>
        <div className="border px-2 pb-2">
        <CustomerChoreComments data={chorecomments} />
        </div>
      </div></div>
      <div className="row">

      
      <div className='col-xl-3 col-sm-6 col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>Kunder</span>{" "}
                <span className='h3 font-bold mb-0'>25st</span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                  <i className='bi bi-credit-card'></i>
                </div>
              </div>
            </div>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1'></i>30%{" "}
              </span>
              <span className='text-nowrap text-xs text-muted'>Since last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-sm-6 col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>Budget</span>{" "}
                <span className='h3 font-bold mb-0'>$750.90</span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                  <i className='bi bi-credit-card'></i>
                </div>
              </div>
            </div>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1'></i>30%{" "}
              </span>
              <span className='text-nowrap text-xs text-muted'>Since last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-sm-6 col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>Budget</span>{" "}
                <span className='h3 font-bold mb-0'>$750.90</span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                  <i className='bi bi-credit-card'></i>
                </div>
              </div>
            </div>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1'></i>30%{" "}
              </span>
              <span className='text-nowrap text-xs text-muted'>Since last month</span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-3 col-sm-6 col-12'>
        <div className='card'>
          <div className='card-body'>
            <div className='row'>
              <div className='col'>
                <span className='h6 font-semibold text-muted text-sm d-block mb-2'>Budget</span>{" "}
                <span className='h3 font-bold mb-0'>$750.90</span>
              </div>
              <div className='col-auto'>
                <div className='icon icon-shape bg-tertiary text-white text-lg rounded-circle'>
                  <i className='bi bi-credit-card'></i>
                </div>
              </div>
            </div>
            <div className='mt-2 mb-0 text-sm'>
              <span className='badge badge-pill bg-soft-success text-success me-2'>
                <i className='bi bi-arrow-up me-1'></i>30%{" "}
              </span>
              <span className='text-nowrap text-xs text-muted'>Since last month</span>
            </div>
          </div>
        </div>
      </div></div>
    </div>
  );
};

export default Overview;
