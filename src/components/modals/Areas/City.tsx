import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";
import React from "react";

interface Props {
  show: boolean;
  onHide: () => void;
}

const City = ({ show, onHide }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const [cityNameValue, setCityNameValue] = useState("");
  const { mutate: postCity, isLoading: postingCity } = useMutation(
    async () => {
      return await client.city_PostCity({
        name: cityNameValue,
      });
    },
    {
      onSuccess: () => {
        toast.success(toasts.create.city.onMutate.message);
        queryClient.invalidateQueries(["cities"]);
        queryClient.invalidateQueries(["areas"]);
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
        <Modal.Title>Ny ort</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <Form className='d-flex flex-column gap-4'>
          <Form.Group className='flex-grow-1'>
            <Form.Label>Ortnamn</Form.Label>
            <Form.Control
              type='text'
              placeholder='Skriv in ortnamn'
              onChange={(e) => setCityNameValue(e.target.value)}
              value={cityNameValue}
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
            onClick={() => postCity()}
            disabled={postingCity || cityNameValue === ""}
          >
            {postingCity && (
              <Spinner
                className='mx-2'
                size='sm'
                as='span'
                animation='border'
                role='status'
                aria-hidden='true'
              />
            )}
            {postingCity ? "Lägger till..." : "Lägg till"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default City;
