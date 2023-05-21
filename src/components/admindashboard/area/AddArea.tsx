import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CityResponseDto } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";
import City from "../../modals/Areas/City";

interface Props {
  close?: () => void;
  cities: CityResponseDto[];
}

const AddArea = ({ close, cities }: Props) => {
  const [areaValue, setAreaValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);
  const queryClient = useQueryClient();
  const client = useClient();
  const { mutate: postArea } = useMutation(
    async () => {
      return await client.area_PostArea({
        name: areaValue,
        cityId: cityValue,
      });
    },
    {
      onSuccess: () => {
        setAreaValue("");
        setCityValue("");
        queryClient.invalidateQueries("areas");
        toast.success(toasts.create.area.onMutate.message);
        if (close) close();
      },
    },
  );

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formAddArea'>
        <Form.Label>Namn</Form.Label>
        <Form.Control
          type='text'
          placeholder='Skriv in områdesnamn'
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Ort</Form.Label>
        <div className='d-flex gap-2'>
          <Form.Select
            className='form-active flex-fill w-auto'
            value={cityValue}
            onChange={(e) => {
              setCityValue(e.target.value);
            }}
          >
            <option value=''>Välj ort</option>
            {cities?.map((city) => {
              return (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              );
            })}
          </Form.Select>
          <div>
            <Button
              className='d-flex gap-1 align-items-center'
              onClick={() => setShowCityModal(!showCityModal)}
            >
              <AiOutlinePlus size={18} />
              <div className='fs-6'>Ny</div>
            </Button>
          </div>
        </div>
      </Form.Group>
      <Button
        className='w-100'
        onClick={() => postArea()}
        disabled={areaValue.trim() === "" || cityValue.trim() === ""}
      >
        Lägg till område
      </Button>
      <City show={showCityModal} onHide={() => setShowCityModal(!showCityModal)} />
    </Form>
  );
};

export default AddArea;
