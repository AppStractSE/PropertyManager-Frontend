import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { container, item } from "../animation";
import { CustomerChoreResponseDto } from "../api/client";
import ChoreCard from "../components/ChoreCard";
import CustomerEllipsis from "../components/dropdowns/CustomerEllipsis";
import CustomerPageSkeleton from "../components/skeletons/CustomerPageSkeleton";
import useAxios from "../hooks/useAxios";

const Customer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchCustomerChores = useAxios({
    url: `/CustomerChore/GetCustomerChoresByCustomerId?Id=${id}`,
    method: "get",
  });
  const { data, error, isLoading } = useQuery<CustomerChoreResponseDto[]>(
    "customerChores",
    fetchCustomerChores,
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {isLoading || error ? (
        <CustomerPageSkeleton />
      ) : data !== undefined ? (
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
                <div className='h3 mb-0'>{data[0].customer.name}</div>
                <div className='p mb-1'>{data[0].customer.address}</div>
              </Container>
              <CustomerEllipsis address={data[0].customer.address} />
            </div>
            {data.map((data) => (
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
