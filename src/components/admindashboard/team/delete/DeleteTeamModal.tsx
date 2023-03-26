import { Button, Modal } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { TeamResponseDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";

interface Props {
  team: TeamResponseDto;
  show: boolean;
  onHide: () => void;
}

const DeleteTeamModal = ({ team, show, onHide }: Props) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const {
    mutate: deleteTeam,
    error: deleteTeamError,
    isLoading: deleteTeamIsLoading,
  } = useMutation(async () => await client.team_DeleteTeamById(team.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("teams");
      queryClient.invalidateQueries("teamMembers");
    },
  });
  return (
    <Modal
      centered
      backdropClassName='nested-modal-backdrop'
      className='nested-modal'
      show={show}
      onHide={() => onHide()}
      closeButton
    >
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Radera team</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-3 py-2 mb-2'>
        <div className='fs-6'>
          Är du säker på att du vill radera teamet <span className='fw-bold'>{team.name}</span>?
        </div>
        <div className='mb-2 mt-0 form-text'>
          Notera: Allt relaterat till teamet kommer att raderas och kan inte ångras.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex flex-fill gap-3'>
          <Button className='text-center' onClick={() => onHide()}>
            Avbryt
          </Button>
          <Button
            variant='danger'
            className='d-flex gap-2 align-items-center justify-content-center'
            onClick={() => deleteTeam()}
          >
            <BsFillTrashFill size={18} />
            <div>Ja, radera teamet</div>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTeamModal;
