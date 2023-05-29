import React from "react";
import { motion } from "framer-motion";
import { BsFillTrashFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ChoreCommentResponseDto, CustomerChoreResponseDto } from "../api/client";
import { useClient } from "../contexts/ClientContext";
import toasts from "../data/toasts";

interface Props {
  chorecomment: ChoreCommentResponseDto;
  customerchore: CustomerChoreResponseDto;
}

const DeleteComment = ({ chorecomment, customerchore }: Props) => {
  const queryClient = useQueryClient();
  const client = useClient();
  const { mutate: deleteComment } = useMutation(
    async () => {
      return await client.choreComment_DeleteChoreCommentById(chorecomment.id);
    },
    {
      onSuccess: () => {
        toast.error(toasts.comments.onDelete.message);
        queryClient.invalidateQueries(["choreComment", customerchore.id]);
      },
      onError: () => {
        toast.warning(toasts.generic.onError.message);
      },
    },
  );

  return (
    <motion.div
      key='delete-comment'
      className='comment-delete-container py-2 rounded'
      initial={{ opacity: 1, width: 0 }}
      animate={{ opacity: 1, width: 75 }}
      exit={{ opacity: 1, width: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className='bg-danger comment-delete rounded' onClick={() => deleteComment()}>
        <BsFillTrashFill className='color-white' size={20} />
      </div>
    </motion.div>
  );
};

export default DeleteComment;
