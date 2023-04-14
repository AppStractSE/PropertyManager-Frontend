import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { Container, ProgressBar, Spinner } from "react-bootstrap";
import "react-day-picker/dist/style.css";
import { AiOutlineFileDone, AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiTask, BiTimeFive } from "react-icons/bi";
import { BsChat, BsChevronLeft } from "react-icons/bs";
import { GoFileMedia, GoX } from "react-icons/go";
import { IoMdSync } from "react-icons/io";
import { VscPieChart } from "react-icons/vsc";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ChoreCommentResponseDto, ChoreStatusResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";
import { useQueries } from "../hooks/useQueries";
import CompleteCustomerChore from "./modals/CustomerChore/CompleteCustomerChore";
import CustomerChoreComments from "./modals/CustomerChore/CustomerChoreComments";
const CustomerChoreInfo = () => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 5,
      spacing: 10,
    },
    breakpoints: {
      "(max-width: 780px)": {
        slides: {
          perView: 4,
          spacing: 5,
        },
      },
    },
  });
  const { id, customerChoreId } = useParams();
  const { userData } = useQueries();
  const client = useClient();

  const [showComments, setShowComments] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const {
    data: chorecomments,
    error: choreCommentsError,
    isLoading: choreCommentsLoading,
  } = useQuery<ChoreCommentResponseDto[]>(
    ["choreComment", customerChoreId],
    async () => await client.choreComment_GetCustomerChoresByCustomer(customerChoreId),
  );

  const {
    data: chorestatuses,
    error: choreStatusesError,
    isLoading: choreStatusesLoading,
  } = useQuery<ChoreStatusResponseDto[]>(
    ["choreStatus", customerChoreId],
    async () => await client.choreStatus_GetChoreStatusById(customerChoreId),
  );

  const customerchore = userData?.userTeamsData
    ?.find((x) => x.userCustomersData?.find((y) => y.customerSlug === id))
    ?.userCustomersData?.find((x) => x.customerSlug === id)
    ?.customerChores?.find((y) => y.customerChoreId === customerChoreId);
  const customer = userData?.userTeamsData
    ?.find((x) => x.userCustomersData?.find((y) => y.customerSlug === id))
    ?.userCustomersData?.find((x) => x.customerSlug === id);

  if (
    !chorecomments ||
    !customerchore ||
    !chorestatuses ||
    !customer ||
    choreStatusesLoading ||
    choreCommentsLoading
  )
    return (
      <div className='h-100 bg-transparent w-100 d-flex align-items-center justify-content-center'>
        <Spinner />
      </div>
    );
  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
      <Container className='d-flex align-items-center border-bottom py-3'>
        <Link to={`/customer/${id}`}>
          <BsChevronLeft size={28} />
        </Link>
        <Container>
          <div className='h3 mb-0'>{customerchore?.chore?.title}</div>
        </Container>
      </Container>
      <div className='h-100 py-3 overflow-y-scroll container px-0'>
        <Container>
          <div className='fs-5 fw-bold mb-2'>Information</div>
          <div className='d-flex gap-2 align-items-center my-2'>
            <AiOutlineUser size={24} />
            <div className='fs-7'>{customer?.customerName}</div>
          </div>
          <div className='d-flex gap-2 align-items-center my-2'>
            <AiOutlineFileDone size={24} />
            {customerchore?.progress === 0 ? (
              <div className='fs-7'>Har inte gjorts denna iteration</div>
            ) : (
              <>
                {chorestatuses
                  ?.sort(
                    (a, b) =>
                      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime(),
                  )
                  .slice(0, 1)
                  .map((latestStatus) => (
                    <div className='fs-7' key={latestStatus.id}>
                      Gjordes senast{" "}
                      {new Date(latestStatus.completedDate).getDate() === new Date().getDate()
                        ? `idag - ${latestStatus.completedDate.toString().slice(11, 16)}`
                        : new Date(latestStatus.completedDate).getDate() ===
                          new Date().getDate() - 1
                        ? `igår - ${latestStatus.completedDate.toString().slice(11, 16)}`
                        : latestStatus.completedDate
                            .toString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")
                            .slice(0, 5) +
                          " - " +
                          latestStatus.completedDate.toString().slice(11, 16)}
                    </div>
                  ))}
              </>
            )}
          </div>
          <div className='d-flex gap-2 align-items-center my-2'>
            <BiTimeFive size={24} />
            <div className='fs-7'>
              Ska göras {customerchore?.frequency}{" "}
              {customerchore?.frequency > 1 ? "gånger " : "gång "}
              {customerchore?.periodic?.name?.toLowerCase()}
            </div>
          </div>
          <div className='d-flex gap-2 align-items-center my-2'>
            <IoMdSync size={24} />
            <div className='fs-7'>
              Återställs
              {customerchore.daysUntilReset === 1
                ? " i morgon"
                : ` om  ${customerchore.daysUntilReset} dagar`}
            </div>
          </div>
        </Container>
        <div className='divider' />
        <Container>
          <div className='fs-5 fw-bold mb-2'>Beskrivning</div>
          <div className='fs-6'>{customerchore?.chore?.description}</div>
        </Container>
        <div className='divider' />
        <Container>
          <div className='fs-5 fw-bold mb-2'>Status</div>
          <div
            className={`w-fit-content rounded-pill px-3 py-1 d-flex gap-1 align-items-center border border-dark ${
              customerchore.status === "Klar"
                ? "bg-success"
                : customerchore.status === "Påbörjad"
                ? "bg-primary"
                : "bg-danger"
            }`}
          >
            {customerchore.status === "Klar" ? (
              <BiCheck size={20} />
            ) : customerchore.status === "Påbörjad" ? (
              <VscPieChart size={20} />
            ) : (
              <GoX size={20} />
            )}
            <div className='fs-7 text-center'>{customerchore?.status}</div>
          </div>
          <div className='position-relative'>
            <ProgressBar className='rounded-pill mt-3 border border-dark' style={{ height: 24 }}>
              {Array.from({ length: customerchore?.progress }, (_, i) => i + 1).map((x, idx) => (
                <ProgressBar variant={"success"} now={100 / customerchore.frequency} key={idx} />
              ))}
            </ProgressBar>
            <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center'>
              <div className='fs-7'>
                {customerchore?.progress} / {customerchore.frequency}
              </div>
            </div>
          </div>
        </Container>
        <div className='divider' />
        <CustomerChoreComments
          show={showComments}
          toggleModal={() => setShowComments(!showComments)}
          customerchore={customerchore}
          chorecomments={chorecomments}
        />
        <div className='divider' />
        <Container>
          <div className='fs-5 fw-bold mb-2'>Media</div>
          <div ref={ref} className='keen-slider'>
            <div
              className='keen-slider__slide bg-dark rounded'
              onClick={() => setShowMediaModal(!showMediaModal)}
            >
              <img src='' height='auto' width='100%' />
            </div>
          </div>
        </Container>
      </div>
      <div className='d-flex gap-2 px-1 border-top bottom-buttons modal-footer safe-area'>
        <div
          className='usel-none flex-fill py-3 px-2 d-flex gap-2 align-items-center justify-content-center pe-force'
          onClick={() => setShowDoneModal(!showDoneModal)}
        >
          <BiTask size={22} />
          <span className='fs-7'>Klarmarkera</span>
        </div>

        <div
          className='usel-none flex-fill py-3 px-2 d-flex gap-2 align-items-center justify-content-center pe-force'
          onClick={() => setShowComments(!showComments)}
        >
          <BsChat size={22} />
          <span className='fs-7'>Kommentera</span>
        </div>

        <div
          className='usel-none flex-fill py-3 px-2 d-flex gap-2 align-items-center justify-content-center pe-force'
          onClick={() => setShowMediaModal(!showMediaModal)}
        >
          <GoFileMedia size={22} />
          <span className='fs-7'>Media</span>
        </div>
      </div>
      <CompleteCustomerChore
        customerchore={customerchore}
        customer={customer}
        show={showDoneModal}
        onHide={() => setShowDoneModal(!showDoneModal)}
      />
    </div>
  );
};

export default CustomerChoreInfo;
