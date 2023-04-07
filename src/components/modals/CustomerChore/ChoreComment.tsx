import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChoreCommentResponseDto, UserCustomerChoreData } from "../../../api/client";
import { useUser } from "../../../contexts/UserContext";
import DeleteComment from "../../DeleteComment";

interface Props {
  chorecomment: ChoreCommentResponseDto;
  customerchore: UserCustomerChoreData;
}

const ChoreComment = ({ chorecomment, customerchore }: Props) => {
  const { currentUser } = useUser();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [activeDeleteButton, setActiveDeleteButton] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -20) {
      setShowDeleteButton(true);
      setActiveDeleteButton(chorecomment.id);
    } else if (info.offset.x > 10) {
      setShowDeleteButton(false);
      setActiveDeleteButton(null);
    }
  
    // Set a timeout to hide the delete button after 5 seconds of inactivity
    setTimeout(() => {
      setShowDeleteButton(false);
      setActiveDeleteButton(null);
    }, 5000);

  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDeleteButton(false);
        setActiveDeleteButton(null);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeDeleteButton]);
  
  

  return (
    <motion.div
      key={chorecomment.id}
      ref={containerRef}
      className='chore-comment-container d-flex align-items-center position-relative'
      onPan={handlePan}
    >
      <motion.div
        transition={{ duration: 0.25 }}
        animate={{
          x:
            showDeleteButton && chorecomment.displayName === currentUser.user?.displayName
              ? "-25%"
              : 0,
        }}
      >
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
        <div className='p text-wrap text-break px-1 my-2'>{chorecomment.message}</div>
      </motion.div>
      <AnimatePresence>
        {showDeleteButton &&
          chorecomment.displayName === currentUser.user?.displayName &&
          activeDeleteButton === chorecomment.id && (
            <DeleteComment customerchore={customerchore} chorecomment={chorecomment} />
          )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChoreComment;
