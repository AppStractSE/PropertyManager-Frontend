import { useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { BsCameraFill } from "react-icons/bs";
import { useQuery } from "react-query";
import useAxios from "../../hooks/useAxios";
import CustomToast from "../snacks/CustomToast";
import ImageModal from "./ImageModal";

const ChoreInfo = (props: any) => {
  const [choreImage, setChoreImage] = useState("");
  const [imgModal, setImgModalShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  const postChoreComment = useAxios({
    url: `/ChoreComment`,
    method: "post",
    body: JSON.stringify({
      message: "Tomt i lödan igen!",
      customerChoreId: "419a193b-2fbe-4c81-a704-c4ed53fd6c37",
      userId: "db2bd3c9-946a-4578-979f-16ff58e242f6",
      time: "2023-01-03T12:00:00",
    }),
    headers: JSON.stringify({
      "content-type": "application/json",
    }),
  });
  const { data, error, isLoading } = useQuery<any>("choreComments", fetchChoreComments);

  if (isLoading) {
    return <Spinner />;
  }

  if (error || data == undefined) {
    return <div>Error!</div>;
  }
  const handlePost = async () => {
    await postChoreComment;
    props.onHide();
  };

  return (
    <>
      <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.customerchore.chore.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal-body-section'>
            <Modal.Title className='p small'>Status</Modal.Title>
            <div className='p'>Ej påbörjad</div>
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
            {data.map((data: any) => (
              <div key={data.id} className='chore-comment-container'>
                <div className='d-flex align-items-center gap-1'>
                  <div className='p fw-bold'>Niklas P</div>{" "}
                  {/* Insert user here instead of hard coded */}
                  <div className='p small'>{data.time}</div>
                </div>
                <div className='p'>{data.message}</div>
              </div>
            ))}
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
              <Form className='ms-1'>
                <Form.Group controlId='formComment'>
                  <Form.Control type='text' placeholder='Lägg till en kommentar...' />
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
            onClick={() => {
              setShowToast(true);
              props.onHide();
              handlePost();
            }}
          >
            Markera som klar
          </Button>
        </Modal.Footer>
        <ImageModal show={imgModal} onHide={() => setImgModalShow(false)} image={choreImage} />
      </Modal>
      <CustomToast show={showToast} onHide={() => setShowToast(false)} />
    </>
  );
};

export default ChoreInfo;
