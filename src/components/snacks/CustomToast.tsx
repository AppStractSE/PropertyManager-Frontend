import { Toast, ToastContainer } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";

const CustomToast = (props: any) => {
  return (
    <ToastContainer position='bottom-center' className='p-5'>
      <Toast className='slide-up' onClose={props.onHide} show={props.show} delay={5000} autohide>
        <Toast.Header>
          <AiOutlineCheckCircle size={28} className='me-2' />
          <strong className='me-auto'>Syssla klar</strong>
          <small>Just nu</small>
        </Toast.Header>
        <Toast.Body>Bra jobbat! 👏</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;
