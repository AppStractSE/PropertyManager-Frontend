import { motion } from "framer-motion";
import { lazy } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { GoX } from "react-icons/go";
import { VscPieChart } from "react-icons/vsc";
import { Link, useParams } from "react-router-dom";
import { container, item } from "../animation";
import Search from "../components/Search";
import CustomerEllipsis from "../components/dropdowns/CustomerEllipsis";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useQueries } from "../hooks/useQueries";

const ChoreCard = lazy(() => import("../components/ChoreCard"));

const Customer = () => {
  const [active, setActive] = useLocalStorage<string>("filterMode", "All");
  const { id } = useParams();
  const { userData } = useQueries();

  const [searchValue, setSearchValue] = useLocalStorage<string>("choreSearch", "");
  const customer = userData?.userTeamsData
    ?.find((team) => team.userCustomersData?.find((customer) => customer.customerSlug === id))
    ?.userCustomersData?.find((customer) => customer.customerSlug === id);

  const handleFilterClick = (status: string) => setActive(active === status ? "All" : status);

  if (!customer || !customer.customerChores) return null;
  const filteredChores = customer.customerChores
    ?.filter((chore) => active === "All" || chore.status === active)
    .filter((chore) => chore.chore?.title?.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className='d-flex flex-column h-100 overflow-hidden'
    >
      <Container className='d-flex align-items-center border-bottom py-3'>
        <Link to='/'>
          <BsChevronLeft size={28} />
        </Link>
        <Container>
          <div className='h3 mb-0'>{customer.customerName}</div>
          <div className='p mb-1'>{customer.customerAddress}</div>
        </Container>
        <CustomerEllipsis address={customer.customerAddress} />
      </Container>
      <Container className='h-100 py-3 scrollable'>
        {customer?.customerChores?.length > 0 ? (
          <motion.div variants={container} initial='hidden' animate='show'>
            <Search
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
              placeholder='uppgift hos kund'
            />
            <div className='d-flex flex-column gap-3'>
              {filteredChores?.length < 1 ? (
                <div className='text-break'>Inga resultat hittades {searchValue ? `för "${searchValue}"` : undefined}</div>
              ) : undefined}
              {filteredChores?.map((chore) => (
                <motion.div key={chore.customerChoreId} variants={item}>
                  <ChoreCard customerchore={chore} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className='d-flex flex-column align-items-center justify-content-center h-100'>
            <AiOutlineFileSearch size={62} />
            <div className='fs-5 my-2'>Inga uppgifter</div>
            <div className='text-muted fs-7'>Den här kunden har inga uppgifter ännu</div>
          </div>
        )}
      </Container>
      {customer?.customerChores?.length > 0 ? (
        <div className='d-flex gap-2 px-1 border-top bottom-buttons modal-footer safe-area'>
          {["Klar", "Påbörjad", "Ej påbörjad"].map((status) => (
            <div
              key={status}
              className={`usel-none flex-fill py-3 px-2 d-flex gap-2 align-items-center justify-content-center pe-force ${
                active === status ? "text-primary fw-bold" : ""
              }`}
              onClick={() => handleFilterClick(status)}
            >
              {status === "Klar" && <BiCheck size={22} />}
              {status === "Påbörjad" && <VscPieChart size={22} />}
              {status === "Ej påbörjad" && <GoX size={22} />}
              <span className='fs-7'>{status}</span>
            </div>
          ))}
        </div>
      ) : undefined}
    </motion.div>
  );
};

export default Customer;
