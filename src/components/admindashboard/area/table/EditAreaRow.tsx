import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AreaResponseDto } from "../../../../api/client";

interface Props {
  area: AreaResponseDto;
}
const EditAreaRow = ({ area }: Props) => {
  const [disableRow, setDisableRow] = useState(true);
  const [areaName, setAreaName] = useState(area.name);
  return (
    <tr>
      <td>
        <Form.Control
          disabled={disableRow ? true : false}
          className={`${disableRow ? "border-transparent" : ""}`}
          type='text'
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
        />
      </td>
      <td>
        <div>
          {!disableRow ? (
            <Button
              className='me-2'
              size='sm'
              onClick={() => {
                setDisableRow(!disableRow);
              }}
            >
              Avbryt
            </Button>
          ) : undefined}
          <Button size='sm' className='me-2' onClick={() => setDisableRow(!disableRow)}>
            {disableRow ? "Redigera" : "Spara"}
          </Button>
          {!disableRow ? (
            <Button size='sm' variant='danger' onClick={() => console.log("I'm here")}>
              Radera
            </Button>
          ) : undefined}
        </div>
      </td>
    </tr>
  );
};

export default EditAreaRow;
