import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { container, item } from "../animation";
import { Client, CustomerChoreResponseDto } from "../api/client";
import ChoreCard from "../components/ChoreCard";
import CustomerEllipsis from "../components/dropdowns/CustomerEllipsis";
import CustomerPageSkeleton from "../components/skeletons/CustomerPageSkeleton";

const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = new Client();
  const {
    data: customerChores,
    error: customerChoresError,
    isLoading: customerChoresIsLoading,
  } = useQuery<CustomerChoreResponseDto[]>(
    // TODO: Does this work with "id"?
    ["customerChores", id],
    async () => client.customerChore_GetCustomerChoresByCustomer(id), // <-- Same here
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {customerChoresIsLoading || customerChoresError ? (
        <CustomerPageSkeleton />
      ) : customerChores !== undefined ? (
        <Container className='mt-3 mb-3'>
          <motion.div
            variants={container}
            initial='hidden'
            animate='show'
            className='vstack gap-2 minBreakpoint-xs'
          >
            <div className='d-flex align-items-center'>
              <div onClick={() => navigate("/")}>
                <BsChevronLeft size={28} />
              </div>
              <Container>
                <div className='h3 mb-0'>{customerChores[0]?.customer?.name}</div>
                <div className='p mb-1'>{customerChores[0]?.customer?.address}</div>
              </Container>
              <CustomerEllipsis address={customerChores[0]?.customer?.address} />
            </div>
            {customerChores?.map((data) => (
              <motion.div variants={item} key={data.id}>
                <ChoreCard customerchore={data} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      ) : (
        <CustomerPageSkeleton />
      )}
    </motion.div>
  );
};

export default Customer;
