import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Client } from "../../api/client";

const AddTeamModal = (props: any) => {
  const [teamValue, setTeamValue] = useState("");
  const queryClient = useQueryClient();
  const client = new Client();
  const { mutate: postTeam, isLoading: postingTeam } = useMutation(
    async () => {
      return await client.team_PostTeam({
        name: teamValue,
      });
    },
    {
      onSuccess: () => {
        setTeamValue("");
        console.log("success");
        queryClient.invalidateQueries("teams");
        props.onHide();
      },
    },
  );

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Lägg till team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formAddTeam'>
            <Form.Label>Team</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter team name'
              value={teamValue}
              onChange={(e) => setTeamValue(e.target.value)}
            />
          </Form.Group>
          <Button
            className='w-100'
            onClick={() => postTeam()}
            disabled={teamValue.length < 3 ? true : false}
          >
            Lägg till team
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTeamModal;
