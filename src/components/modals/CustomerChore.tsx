import { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChoreCommentResponseDto, ChoreStatusResponseDto } from "../../api/client";
import { useUser } from "../../contexts/UserContext";
import useAxios from "../../hooks/useAxios";
import axiosClient from "../../utils/axiosClient";
import CustomToast from "../snacks/CustomToast";
import { CustomerChoreComments } from "./CustomerChore/CustomerChoreComments";
import { CustomerChoreStatus } from "./CustomerChore/CustomerChoreStatus";
import ImageModal from "./ImageModal";

const CustomerChore = (props: any) => {
  const queryClient = useQueryClient();
  const [choreImage, setChoreImage] = useState("");
  const [imgModal, setImgModalShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const { currentUser } = useUser();

  const handlePhotoCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setChoreImage(newUrl);
      }
    }
  };

  const fetchChoreComments = useAxios({
    url: `/ChoreComment/GetChoreCommentsByCustomerChoreId?Id=${props.customerchore.id}`,
    method: "get",
  });

  const fetchChoreStatuses = useAxios({
    url: `/ChoreStatus/GetChoreStatusById?Id=${props.customerchore.id}`,
    method: "get",
  });

  const { data, error, isLoading } = useQuery<ChoreCommentResponseDto[]>(
    "comment_" + props.customerchore.id,
    fetchChoreComments,
  );

  const {
    data: choreStatuses,
    error: choreStatusError,
    isLoading: choreStatusIsLoading,
  } = useQuery<ChoreStatusResponseDto[]>("status_" + props.customerchore.id, fetchChoreStatuses);

  const { mutate: postComment, isLoading: postingComment } = useMutation(
    async () => {
      return await axiosClient.post("/ChoreComment", {
        message: commentValue,
        customerChoreId: props.customerchore.id,
        userId: currentUser.userId,
      });
    },
    {
      onSuccess: () => {
        setCommentValue("");
        queryClient.invalidateQueries("comment_" + props.customerchore.id);
      },
    },
  );

  const { mutate: postChoreStatus, isLoading: postingChoreStatus } = useMutation(
    async () => {
      return await axiosClient.post("/ChoreStatus", {
        customerChoreId: props.customerchore.id,
        doneBy: currentUser.userId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("status_" + props.customerchore.id);
        setShowToast(true);
      },
    },
  );

  if (isLoading || choreStatusIsLoading) {
    return <></>;
  }

  if (error || data == undefined) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.customerchore.chore.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Status</Modal.Title>
            <CustomerChoreStatus
              chorestatuses={choreStatuses}
              customerchore={props.customerchore}
            />
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Återkommer</Modal.Title>
            <div className='p'>
              {props.customerchore.periodic.name} {props.customerchore.frequency}
              {props.customerchore.frequency === 1 ? " gång" : " gånger"}
            </div>
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Beskrivning</Modal.Title>
            <div className='p'>{props.customerchore.chore.description}</div>
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Kommentarer</Modal.Title>
            <CustomerChoreComments data={data} />
          </div>
          <div className='modal-body-section'>
            <div className='d-flex align-items-center camera-container'>
              <Button>
                <input
                  className='d-none'
                  accept='*/*'
                  id='icon-button-file'
                  type='file'
                  onChange={(e) => handlePhotoCapture(e.target)}
                />
                <label htmlFor='icon-button-file'>
                  <BsCameraFill size={24} />
                </label>
              </Button>
              <Form
                className='ms-1 w-100'
                onSubmit={(e) => {
                  e.preventDefault();
                  setCommentValue("");
                }}
              >
                <Form.Group controlId='formComment' className='d-flex align-items-center'>
                  <Form.Control
                    type='text'
                    placeholder='Lägg till en kommentar...'
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                  <Button
                    onClick={() => postComment()}
                    disabled={commentValue ? false : true}
                    variant='success'
                    className='upload-button'
                  >
                    {postingComment ? (
                      <Spinner as='span' animation='border' role='status' aria-hidden='true' />
                    ) : (
                      <BsFillArrowUpCircleFill size={36} />
                    )}
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
          {choreImage && (
            <div className='modal-body-section'>
              <Modal.Title className='p small'>Bilagor</Modal.Title>
              <img width={100} src={choreImage} onClick={() => setImgModalShow(true)} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={
              choreStatuses && props.customerchore.frequency === choreStatuses.length ? true : false
            }
            type='submit'
            onClick={() => {
              setCommentValue("");
              postChoreStatus();
            }}
          >
            {postingChoreStatus ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
                className='mx-2'
              />
            ) : null}
            {choreStatuses && props.customerchore.frequency === choreStatuses.length
              ? "Uppgift är klar!"
              : "Markera som klar"}
          </Button>
        </Modal.Footer>
        <ImageModal show={imgModal} onHide={() => setImgModalShow(false)} image={choreImage} />
      </Modal>
      <CustomToast show={showToast} onHide={() => setShowToast(false)} />
    </>
  );
};

export default CustomerChore;
