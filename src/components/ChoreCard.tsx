import { Card, Container } from "react-bootstrap";
import { BiCheck } from "react-icons/bi";
import { GoX } from "react-icons/go";
import { IoMdSync } from "react-icons/io";
import { VscPieChart } from "react-icons/vsc";
import { Link, useParams } from "react-router-dom";
import { UserCustomerChoreData } from "../api/client";

interface Props {
  customerchore: UserCustomerChoreData;
}

const ChoreCard = ({ customerchore }: Props) => {
  const { id } = useParams();
  return (
    <Link to={`/customer/${id}/chore/${customerchore.customerChoreId}`}>
      <Card className='rounded'>
        <Card.Body className='d-flex align-items-center'>
          <Container>
            <Card.Title>{customerchore.chore!.title}</Card.Title>
            <Card.Title className='small text-muted'>{customerchore?.subCategoryName}</Card.Title>
            <div className='d-flex align-items-center gap-2'>
              <div
                className={`w-fit-content rounded-pill border border-dark px-3 py-1 d-flex gap-1 align-items-center ${
                  customerchore.status === "Klar"
                    ? "bg-success"
                    : customerchore.status === "Påbörjad"
                    ? "bg-primary"
                    : "bg-danger"
                }`}
              >
                {customerchore.status === "Klar" ? (
                  <BiCheck size={20} />
                ) : customerchore.status === "Påbörjad" ? (
                  <VscPieChart size={20} />
                ) : (
                  <GoX size={20} />
                )}
                <div className='fs-7 text-center'>{customerchore?.status}</div>
              </div>
              <div className='d-flex align-items-center gap-2 rounded-pill border border-dark px-3 py-1'>
                <IoMdSync size={20} />
                <div className='fs-7 text-center'>3 dagar</div>
              </div>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ChoreCard;
