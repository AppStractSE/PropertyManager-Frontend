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
      className='chore-comment-container position-relative py-2'
      onPan={handlePan}
    >
      <motion.div
        className='d-flex'
        transition={{ duration: 0.25 }}
        animate={{
          x:
            showDeleteButton && chorecomment.displayName === currentUser.user?.displayName
              ? "-85px"
              : 0,
        }}
      >
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
            <div className='text-wrap text-break fs-6'>{chorecomment.message}</div>
          </div>
        </div>
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
