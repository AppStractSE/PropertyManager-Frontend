import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { Button, Container, Modal, Placeholder, ProgressBar, Spinner } from "react-bootstrap";
import "react-day-picker/dist/style.css";
import { AiOutlineFileDone, AiOutlineUser } from "react-icons/ai";
import { BiCheck, BiTask, BiTimeFive } from "react-icons/bi";
import { BsChat, BsChevronLeft } from "react-icons/bs";
import { GoFileMedia, GoX } from "react-icons/go";
import { IoMdSync } from "react-icons/io";
import { VscPieChart } from "react-icons/vsc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ChoreCommentResponseDto,
  ChoreStatusResponseDto,
  CustomerChoreResponseDto,
} from "../api/client";
import { useClient } from "../contexts/ClientContext";
import toasts from "../data/toasts";
import { useQueries } from "../hooks/useQueries";
import CompleteCustomerChore from "./modals/CustomerChore/CompleteCustomerChore";
import CustomerChoreComments from "./modals/CustomerChore/CustomerChoreComments";
const CustomerChoreInfo = () => {
  const { id, customerChoreId } = useParams();
  const { data: choreImages = [], isLoading: choreImagesIsLoading } = useQuery<any>(
    ["choreImages", customerChoreId],
    async () => {
      try {
        return await client.blob_ListBlobs(customerChoreId!);
      } catch (error) {
        return [];
      }
    },
  );

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
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

  useEffect(() => {
    slider && slider.current?.update();
  }, [choreImages.length]);

  const { userData, customers } = useQueries();
  const client = useClient();
  const customer = customers?.find((customer) => customer.slug === id);

  const [showComments, setShowComments] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

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
  const {
    data: customerchore,
    error: customerchoreError,
    isLoading: customerchoreLoading,
  } = useQuery<CustomerChoreResponseDto>(
    ["customerChore", customerChoreId],
    async () => await client.customerChore_GetCustomerChoreById(customerChoreId),
  );

  const queryClient = useQueryClient();
  const [file, setFile] = useState<File>();

  const { mutate: postImage, isLoading: postingImage } = useMutation(
    async () => {
      if (!file) {
        throw new Error("File is missing");
      }
      await client.blob_UploadBlob(
        customerChoreId,
        file?.name.split(".").pop(),
        {
          data: file,
          fileName: file!.name,
        },
        "",
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["choreImages", customerChoreId]);
        toast.success(toasts.images.onMutate.message);
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
    },
  );

  const handlePhotoCapture = (
    target: HTMLInputElement & EventTarget & { files: FileList | null },
  ) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newFile = new File([file], file.name, { type: "image/jpeg" });
        setFile(newFile);
      }
    }
  };

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
      <div className='h-100 py-3 overflow-auto container px-0'>
        <Container>
          <div className='fs-5 fw-bold mb-2'>Information</div>
          <div className='d-flex gap-2 align-items-center my-2'>
            <AiOutlineUser size={24} />
            <div className='fs-7'>{customer?.name}</div>
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
              {Array.from({ length: customerchore?.progress }, (_, i) => i + 1).map((_, idx) => (
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
          {choreImages.length > 0 || choreImagesIsLoading ? (
            <div ref={sliderRef} className='keen-slider'>
              {choreImagesIsLoading ? (
                <Placeholder animation='wave' className='d-flex'>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((_, idx) => (
                    <Placeholder
                      key={idx}
                      className='keen-slider__slide rounded'
                      style={{ aspectRatio: "4/4", minHeight: 120 }}
                    />
                  ))}
                </Placeholder>
              ) : (
                <>
                  {choreImages.map((image: string) => (
                    <div
                      key={image}
                      style={{ aspectRatio: "4/4", minHeight: 120 }}
                      className='keen-slider__slide bg-dark rounded d-flex align-items-center justify-content-center'
                      onClick={() => setSelectedImage(image)}
                    >
                      <img src={image} height='auto' width='100%' />
                    </div>
                  ))}
                </>
              )}
            </div>
          ) : (
            <div className='fs-7'>Ingen media hittades</div>
          )}
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
      <Modal
        fullscreen
        overflow-auto
        show={showMediaModal}
        onHide={() => setShowMediaModal(!showMediaModal)}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {choreImages.length > 0 ? (
            <div className='d-flex flex-wrap flex-row'>
              {choreImages.map((image: string) => (
                <div key={image} className='col-3 p-2' onClick={() => setSelectedImage(image)}>
                  <img className='rounded' src={image} height='auto' width='100%' />
                  <div className='fs-7'>Laddades upp</div>
                  <div className='fs-7'>Av</div>
                </div>
              ))}
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
              <GoFileMedia size={62} />
              <div className='fs-5 my-2'>Ingen media</div>
              <div className='text-muted fs-7'>
                Den här uppgiften har ingen media uppladdad ännu
              </div>
            </div>
          )}

          {/* TODO: START */}
          <Button onClick={() => postImage()}>ladda upp</Button>
          <input
            accept='*/*'
            id='icon-button-file'
            type='file'
            onChange={(e) => handlePhotoCapture(e.target)}
          />

          {/* TODO: END */}
        </Modal.Body>
      </Modal>
      <Modal
        backdropClassName='nested-modal-backdrop'
        className='nested-modal'
        contentClassName='border-0'
        centered
        show={selectedImage ? true : false}
        onHide={() => setSelectedImage(undefined)}
      >
        <Modal.Body>
          <img draggable={false} src={selectedImage} className='rounded border-0' width='100%' />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerChoreInfo;
