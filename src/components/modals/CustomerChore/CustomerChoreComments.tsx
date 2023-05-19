import { useState } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChoreCommentResponseDto, UserCustomerChoreData } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import { useUser } from "../../../contexts/UserContext";
import toasts from "../../../data/toasts";
import ChoreComment from "./ChoreComment";
import { BsChat } from "react-icons/bs";

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
        toast.success(toasts.comments.onMutate.message);
        setCommentValue("");
        queryClient.invalidateQueries(["choreComment", customerChoreId]);
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
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
                <div key={chorecomment.id} className='chore-comment-container py-2 d-flex'>
                  <div className='me-1 align-self-start avatar'>
                    <div
                      className='rounded-circle'
                      style={{
                        ["--avatar-image" as any]: `url('https://propertyfilesystem.blob.core.windows.net/fddff525-58e3-423b-ab63-8cfae2bdd997/profile.png')`,
                      }}
                    />
                  </div>
                  <div className='flex-fill'>
                    <div className='rounded py-2 px-2 bg-thirdondary'>
                      <div className='d-flex gap-2 align-items-center'>
                        <div className='fw-bold'>{chorecomment.displayName}</div>
                        <div className='fs-7 text-muted'>
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
                      <div className='text-wrap text-break text-truncate fs-6'>
                        {chorecomment.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>Inga kommentarer ännu</div>
        )}
        {chorecomments.length > 3 ? (
          <div className='fs-6 fw-bold text-muted mt-2 pe-force' onClick={toggleModal}>
            Visa alla {chorecomments.length} kommentarer
          </div>
        ) : undefined}
      </Container>
      <Modal fullscreen show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Kommentarer</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pb-2'>
          {chorecomments.length > 0 ? (
            <div className='chore-comments mt-2 px-2'>
              {chorecomments.map((chorecomment, index) => (
                <ChoreComment
                  key={index}
                  customerchore={customerchore}
                  chorecomment={chorecomment}
                />
              ))}
            </div>
          ) : (
            <div className='d-flex flex-column align-items-center justify-content-center h-100'>
              <BsChat size={62} />
              <div className='fs-5 my-2'>Inga kommentarer</div>
              <div className='text-muted fs-7'>Den här uppgiften har inga kommentarer ännu</div>
            </div>
          )}
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
