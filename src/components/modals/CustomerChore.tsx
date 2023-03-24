import { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChoreCommentResponseDto, ChoreStatusResponseDto } from "../../api/client";
import { useClient } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";
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
  const client = useClient();

  const handlePhotoCapture = (target: any) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setChoreImage(newUrl);
      }
    }
  };

  const {
    data: choreComment,
    error: choreCommentError,
    isLoading: choreCommentLoading,
  } = useQuery<ChoreCommentResponseDto[]>(
    ["choreComment", props.customerchore.id],
    async () => await client.choreComment_GetCustomerChoresByCustomer(props.customerchore.id),
  );

  const { mutate: postComment, isLoading: postingComment } = useMutation(
    async () => {
      return await client.choreComment_PostChoreComment({
        message: commentValue,
        customerChoreId: props.customerchore.id,
        userId: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        setCommentValue("");
        queryClient.invalidateQueries("choreComment", props.customerchore.id);
      },
    },
  );

  const {
    data: choreStatus,
    error: choreStatusError, // TODO: Unused, use it?
    isLoading: choreStatusIsLoading,
  } = useQuery<ChoreStatusResponseDto[]>(
    ["choreStatus", props.customerchore.id],
    async () => await client.choreStatus_GetChoreStatusById(props.customerchore.id),
  );

  const { mutate: postChoreStatus, isLoading: postingChoreStatus } = useMutation(
    async () => {
      return await client.choreStatus_PostChoreStatus({
        customerChoreId: props.customerchore.id,
        doneBy: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("choreStatus", props.customerchore.id);
        setShowToast(true);
      },
    },
  );

  if (choreCommentLoading || choreStatusIsLoading) {
    return <></>;
  }

  if (choreCommentError || choreComment == undefined) {
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
            <CustomerChoreStatus chorestatuses={choreStatus} customerchore={props.customerchore} />
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
            <CustomerChoreComments data={choreComment} />
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
              choreStatus && props.customerchore.frequency === choreStatus.length ? true : false
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
            {choreStatus && props.customerchore.frequency === choreStatus.length
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
