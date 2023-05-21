import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CategoryResponseDto } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";

interface Props {
  show: boolean;
  onHide: () => void;
  category: CategoryResponseDto | undefined;
}

const SubCategory = ({ show, onHide, category }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const [refValue, setRefValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const { mutate: postSubCategory, isLoading: postingSubCategory } = useMutation(
    async () => {
      return await client.category_PostSubCategory({
        categoryId: category ? category.id : "",
        title: titleValue,
        reference: `${category?.title}.${refValue}`,
      });
    },
    {
      onSuccess: () => {
        toast.success(toasts.create.subcategory.onMutate.message);
        queryClient.invalidateQueries(["categories"]);
        onHide();
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
    },
  );

  return (
    <Modal size='sm' centered show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Ny underkategori</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Form className='d-flex flex-column gap-4'>
          <Form.Group className='flex-grow-1'>
            <Form.Label>Referenskod</Form.Label>
            <Form.Control
              type='text'
              autoFocus={true}
              placeholder='Skriv in referenskod'
              onChange={(e) =>
                setRefValue(e.target.value.replace(`${category?.title}.`, "").toUpperCase())
              }
              value={`${category?.title}.${refValue}`}
            />
          </Form.Group>
          <Form.Group className='flex-grow-1'>
            <Form.Label>Underkategorikod</Form.Label>
            <Form.Control
              type='text'
              placeholder='Skriv in kategorikod'
              onChange={(e) => setTitleValue(e.target.value)}
              value={titleValue}
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
            onClick={() => postSubCategory()}
            disabled={postingSubCategory || titleValue === ""}
          >
            {postingSubCategory && (
              <Spinner
                className='mx-2'
                size='sm'
                as='span'
                animation='border'
                role='status'
                aria-hidden='true'
              />
            )}
            {postingSubCategory ? "Lägger till..." : "Lägg till"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SubCategory;
