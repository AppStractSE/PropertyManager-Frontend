import { ChoreCommentResponseDto } from "../../../api/client";

interface Props {
  chorecomments: ChoreCommentResponseDto[];
}

const CustomerChoreComments = ({ chorecomments }: Props) => {
  return (
    <div className='chore-comments'>
      {chorecomments.map((chorecomment) => (
        <div key={chorecomment.id} className='chore-comment-container'>
          <div className='d-flex align-items-center gap-1'>
            <div className='p fw-bold'>{chorecomment.displayName}</div>
            <div className='p small text-muted'>
              {chorecomment.time.toString().slice(0, 16).replace("T", " - ")}
            </div>
          </div>
          <div className='p'>{chorecomment.message}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomerChoreComments;
