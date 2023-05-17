import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AiOutlineFileDone } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Category } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";
import CompleteCustomerChore from "../CustomerChore/CompleteCustomerChore";

interface Props {
  show: boolean;
  onHide: () => void;
}

const Category = ({ show, onHide }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const [titleValue, setTitleValue] = useState("");
  const { mutate: postCategory, isLoading: postingCategory } = useMutation(
    async () => {
      return await client.category_PostCategory({
        title: "",
        description: "",
      });
    },
    {
      onSuccess: () => {
        toast.success(toasts.choreStatuses.onMutate.message);
        queryClient.invalidateQueries(["category"]);
        onHide();
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
    },
  );

  return (
    <>
      <Modal size='sm' centered show={show} onHide={() => onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Ny huvudkategori</Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-3 py-2 mb-2'>
          <Form
            className='d-flex flex-fill align-items-center'
            onSubmit={(e) => {
              e.preventDefault();
              setTitleValue("");
            }}
          >
            <Form.Control
              type='text'
              className='border-0 bg-transparent'
              placeholder='Lägg till kategori'
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='success'
            className='d-flex gap-2 flex-fill align-items-center justify-content-center'
            // onClick={() => postChoreStatus()}
          >
            <AiOutlineFileDone size={18} />
            <div>Klarmarkera</div>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompleteCustomerChore;
