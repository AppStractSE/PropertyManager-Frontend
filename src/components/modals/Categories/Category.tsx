import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";

interface Props {
  show: boolean;
  onHide: () => void;
}

const Category = ({ show, onHide }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const [descValue, setDescValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const { mutate: postCategory, isLoading: postingCategory } = useMutation(
    async () => {
      return await client.category_PostCategory({
        title: titleValue,
        description: descValue,
      });
    },
    {
      onSuccess: () => {
        toast.success(toasts.category.onMutate.message);
        queryClient.invalidateQueries(["categories"]);
        onHide();
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
      onSettled: () => {
        setTitleValue("");
        setDescValue("");
      },
    },
  );

  return (
    <Modal size='sm' centered show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Ny huvudkategori</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Form className='d-flex flex-column gap-4'>
          <Form.Group className='flex-grow-1'>
            <Form.Label>Kategorikod</Form.Label>
            <Form.Control
              autoFocus={true}
              type='text'
              placeholder='Skriv in kategorikod'
              onChange={(e) => setTitleValue(e.target.value)}
              value={titleValue}
            />
          </Form.Group>
          <Form.Group className='flex-grow-1'>
            <Form.Label>Kodbeskrivning</Form.Label>
            <Form.Control
              type='text'
              placeholder='Skriv in kodbeskrivning'
              onChange={(e) => setDescValue(e.target.value)}
              value={descValue}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex gap-4 flex-fill'>
          <Button variant='outline-primary' onClick={() => onHide()}>
            Avbryt
          </Button>
          <Button
            className=''
            onClick={() => postCategory()}
            disabled={postingCategory || titleValue === ""}
          >
            {postingCategory && (
              <Spinner
                className='mx-2'
                size='sm'
                as='span'
                animation='border'
                role='status'
                aria-hidden='true'
              />
            )}
            {postingCategory ? "Lägger till..." : "Lägg till"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Category;
