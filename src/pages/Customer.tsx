import { motion } from "framer-motion";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { BiCheck, BsChevronLeft, GoX, VscPieChart } from "react-icons/all";
import { Link, useParams } from "react-router-dom";
import { item } from "../animation";
import ChoreCard from "../components/ChoreCard";
import CustomerEllipsis from "../components/dropdowns/CustomerEllipsis";
import Search from "../components/Search";
import { useQueries } from "../hooks/useQueries";

const Customer = () => {
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const { userData } = useQueries();
  const customer = userData?.userTeamsData
    ?.find((team) => team.userCustomersData?.find((customer) => customer.customerSlug === id))
    ?.userCustomersData?.find((customer) => customer.customerSlug === id);
  const [active, setActive] = useState("All");

  if (!customer) return null;

  const handleFilterClick = (status: string) => setActive(active === status ? "All" : status);

  const filteredChores = customer.customerChores
    ?.filter((chore) => active === "All" || chore.status === active)
    .filter((chore) => chore.chore?.title?.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <div className='d-flex flex-column h-100 overflow-hidden'>
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
      <Container className='h-100 py-3 overflow-y-scroll'>
        <Search
          value={searchValue}
          onChange={(value) => setSearchValue(value)}
          placeholder='uppgift'
        />
        <div className='fs-7 mb-3'>
          {(filteredChores?.length || 0) > 0
            ? `Visar ${filteredChores?.length}st uppgifter`
            : "Inga uppgifter hittades"}
        </div>
        <div className='d-flex flex-column gap-3'>
          {filteredChores?.map((chore) => (
            <motion.div key={chore.customerChoreId} variants={item}>
              <ChoreCard customerchore={chore} />
            </motion.div>
          ))}
        </div>
      </Container>
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
    </div>
  );
};

export default Customer;
