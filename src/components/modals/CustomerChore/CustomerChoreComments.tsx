import { useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ChoreCommentResponseDto, UserCustomerChoreData } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import { useUser } from "../../../contexts/UserContext";
import ChoreComment from "./ChoreComment";

interface Props {
  chorecomments: ChoreCommentResponseDto[];
  customerchore: UserCustomerChoreData;
  show?: boolean;
  toggleModal?: () => void;
}

const CustomerChoreComments = ({
  chorecomments,
  customerchore,
  show,
  toggleModal: toggleModal,
}: Props) => {
  const [commentValue, setCommentValue] = useState("");
  const [footerFocus, setFooterFocus] = useState(false);
  const client = useClient();
  const { currentUser } = useUser();
  const queryClient = useQueryClient();
  const { customerChoreId } = useParams();
  const { mutate: postComment, isLoading: postingComment } = useMutation(
    async () => {
      return await client.choreComment_PostChoreComment({
        message: commentValue,
        customerChoreId: customerChoreId,
        userId: currentUser.user!.userId,
      });
    },
    {
      onSuccess: () => {
        setCommentValue("");
        queryClient.invalidateQueries(["choreComment", customerChoreId]);
      },
    },
  );

  if (!customerchore) return null;
  return (
    <>
      <Container>
        <div className='fs-5 fw-bold mb-2'>Kommentarer</div>
        {chorecomments.length > 0 ? (
          <div className='chore-comments'>
            {chorecomments
              .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
              .slice(0, 3)
              .map((chorecomment) => (
                <div key={chorecomment.id} className='chore-comment-container px-2'>
                  <div className='d-flex align-items-center gap-3'>
                    <div className='p fw-bold'>{chorecomment.displayName}</div>
                    <div className='p fs-7 text-muted'>
                      {new Date(chorecomment.time).getDate() === new Date().getDate()
                        ? `Idag - ${chorecomment.time.toString().slice(11, 16)}`
                        : new Date(chorecomment.time).getDate() === new Date().getDate() - 1
                        ? `Igår - ${chorecomment.time.toString().slice(11, 16)}`
                        : chorecomment.time
                            .toString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")
                            .slice(0, 5) +
                          " - " +
                          chorecomment.time.toString().slice(11, 16)}
                    </div>
                  </div>
                  <div className='p text-wrap text-break text-truncate px-1 my-2'>
                    {chorecomment.message}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>Inga kommentarer ännu</div>
        )}
        {chorecomments.length > 3 ? (
          <div className='fs-6 fw-bold text-muted mt-3 pe-force' onClick={toggleModal}>
            Visa alla {chorecomments.length} kommentarer
          </div>
        ) : undefined}
      </Container>
      <Modal fullscreen show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Kommentarer</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-2'>
          {customerchore?.chore?.title}
          {customerchore?.chore?.description}
          <div className='chore-comments mt-2 px-2'>
            {chorecomments.map((chorecomment) => (
              <ChoreComment customerchore={customerchore} chorecomment={chorecomment} />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className={`pb-2 border-top ${!footerFocus && "pb-2 safe-area"}`}>
          <div className='w-100 ps-1 mx-1 border rounded-pill bg-input-field'>
            <Form
              className='d-flex flex-fill align-items-center'
              onSubmit={(e) => {
                e.preventDefault();
                setCommentValue("");
              }}
            >
              <Form.Control
                type='text'
                onBlur={() => setFooterFocus(!footerFocus)}
                onFocus={() => setFooterFocus(!footerFocus)}
                className='border-0 bg-transparent'
                placeholder='Lägg till en kommentar...'
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <div
                className={`p-2 me-2 fs-7 text-primary fade pe-force ${commentValue ? "show" : ""}`}
                onClick={() => commentValue && postComment()}
              >
                Publicera
              </div>
            </Form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomerChoreComments;
