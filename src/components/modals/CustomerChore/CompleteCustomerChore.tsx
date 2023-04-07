import { sv } from "date-fns/locale";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { DayPicker } from "react-day-picker";
import { AiOutlineFileDone } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { UserCustomerChoreData, UserCustomerData } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import { useUser } from "../../../contexts/UserContext";

interface Props {
  customerchore: UserCustomerChoreData;
  customer: UserCustomerData;
  show: boolean;
  onHide: () => void;
}

const CompleteCustomerChore = ({ customerchore, customer, show, onHide }: Props) => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateValue, setDateValue] = useState("Idag");
  const [selected, setSelected] = useState<Date>();
  const queryClient = useQueryClient();
  const client = useClient();
  const { currentUser } = useUser();
  const { mutate: postChoreStatus, isLoading: postingChoreStatus } = useMutation(
    async () => {
      return await client.choreStatus_PostChoreStatus({
        customerChoreId: customerchore?.customerChoreId,
        doneBy: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["choreStatus", customerchore?.customerChoreId]);
        queryClient.invalidateQueries(["customerChores", customerchore?.customerChoreId]);
        queryClient.invalidateQueries(["userData", currentUser.user!.userId]);
        onHide();
      },
    },
  );

  return (
    <>
      <Modal size='sm' centered show={show} onHide={() => onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>{customerchore?.chore?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-3 py-2 mb-2'>
          <div className='fs-6 mb-2'>
            Härmed intygas att <span className='fw-bold'>{customerchore?.chore?.title}</span> är
            klar hos <span className='fw-bold'>{customer?.customerName}</span>.
          </div>

          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Datum</Form.Label>
              <Form.Text as='div' className='mb-2 mt-0'>
                Välj när uppgiften utfördes.
              </Form.Text>
              <Form.Check
                className='d-flex gap-2 align-items-center mb-2'
                defaultChecked
                type='radio'
                label='Idag'
                name='datepicker'
                value='Idag'
                onChange={(e) => setDateValue(e.target.value)}
              />
              <Form.Check
                className='d-flex gap-2 align-items-center'
                type='radio'
                label='Ange datum'
                name='datepicker'
                value='PickDate'
                onChange={(e) => {
                  setDateValue(e.target.value);
                  setShowDateModal(!showDateModal);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='success'
            className='d-flex gap-2 flex-fill align-items-center justify-content-center'
            onClick={() => postChoreStatus()}
          >
            <AiOutlineFileDone size={18} />
            <div>Klarmarkera</div>
          </Button>
        </Modal.Footer>
      </Modal>
      {dateValue === "PickDate" && (
        <Modal
          size='sm'
          backdropClassName='nested-modal-backdrop'
          className='nested-modal'
          centered
          show={showDateModal}
          onHide={() => setShowDateModal(!showDateModal)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Välj datum</Modal.Title>
          </Modal.Header>
          <DayPicker
            showOutsideDays
            fixedWeeks
            mode='single'
            locale={sv}
            selected={selected}
            onSelect={setSelected}
            footer={
              <div className='d-flex my-1'>
                <div className={`my-2 py-1 fs-7 fade ${!selected ? "show" : ""}`}>Välj en dag</div>
                <Button size='sm' className={`ms-auto fade ${selected ? "show" : ""}`}>
                  Klar
                </Button>
              </div>
            }
          />
        </Modal>
      )}
    </>
  );
};

export default CompleteCustomerChore;
