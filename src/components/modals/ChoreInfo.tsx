import { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ChoreCommentResponseDto, CustomerChoreResponseDto } from "../../api/client";
import { useClient } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";
import CustomToast from "../snacks/CustomToast";
import CustomerChoreComments from "./CustomerChore/CustomerChoreComments";
import ImageModal from "./ImageModal";

interface Props {
  show: boolean;
  onHide: () => void;
  customerchore: CustomerChoreResponseDto;
}

const ChoreInfo = ({ show, onHide, customerchore }: Props) => {
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
    data: chorecomments,
    error: choreCommentError,
    isLoading: choreCommentLoading,
  } = useQuery<ChoreCommentResponseDto[]>(
    ["choreComment", customerchore.id],
    async () => await client.choreComment_GetCustomerChoresByCustomer(customerchore.id),
  );

  const { mutate: postComment, isLoading: postingComment } = useMutation(
    async () => {
      return await client.choreComment_PostChoreComment({
        message: commentValue,
        customerChoreId: customerchore.id,
        userId: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        setCommentValue("");
        queryClient.invalidateQueries(["choreComment", customerchore.id]);
      },
    },
  );

  const { mutate: postChoreStatus, isLoading: postingChoreStatus } = useMutation(
    async () => {
      return await client.choreStatus_PostChoreStatus({
        customerChoreId: customerchore.id,
        doneBy: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["choreStatus", customerchore.id]);
        setShowToast(true);
      },
    },
  );

  if (!chorecomments) return null;

  return (
    <>
      <Modal
        show={show}
        onEscapeKeyDown={() => onHide()}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton onHide={() => onHide()}>
          <Modal.Title>{customerchore.chore?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Status</Modal.Title>
            <div className='p'>{customerchore.status}</div>
            {customerchore.status === "Påbörjad" && (
              <div className='p fst-italic'>
                Har gjorts {customerchore.progress} av {customerchore.frequency} gånger
              </div>
            )}
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Återkommer</Modal.Title>
            <div className='p'>
              {customerchore?.periodic?.name} {customerchore.frequency}
              {customerchore.frequency === 1 ? " gång" : " gånger"}
            </div>
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Beskrivning</Modal.Title>
            <div className='p'>{customerchore?.chore?.description}</div>
          </div>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Kommentarer</Modal.Title>
            <CustomerChoreComments chorecomments={chorecomments} />
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
            disabled={customerchore?.frequency === customerchore?.progress ? true : false}
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
            {customerchore?.frequency === customerchore?.progress
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

export default ChoreInfo;
