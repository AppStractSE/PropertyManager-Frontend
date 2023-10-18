import { BsFillHouseFill } from "react-icons/bs";
import { CustomerChoreResponseDto, CustomerResponseDto } from "../../../api/client";

interface Props {
  customerchores: CustomerChoreResponseDto[];
  customer: CustomerResponseDto;
}

const CustomerProgressCard = ({ customerchores, customer }: Props) => {
  const amountDone = customerchores.filter(
    (x) => x.status === "Klar" && x.customerId === customer.id,
  ).length;
  const amountStarted = customerchores.filter(
    (x) => x.status === "Påbörjad" && x.customerId === customer.id,
  ).length;
  const amountNotStarted = customerchores.filter(
    (x) => x.status === "Ej påbörjad" && x.customerId === customer.id,
  ).length;

  return (
    <div className='col-12 col-md-6 col-xl-3'>
      <div className='fs-5'>{customer.name}</div>
      <div className='d-flex justify-content-around'>
        <div className='text-center'>
          <BsFillHouseFill style={{ color: "green" }} />
          <div>{amountDone}</div>
        </div>
        <div className='text-center'>
          <BsFillHouseFill style={{ color: "yellow" }} />
          <div>{amountStarted}</div>
        </div>
        <div className='text-center'>
          <BsFillHouseFill style={{ color: "red" }} />
          <div>{amountNotStarted}</div>
        </div>
      </div>
      {customerchores
        .filter((x) => x.customerId === customer.id)
        .map((customerchore) => (
          <div
            key={customerchore.id}
            className={`mt-1 p-2 rounded
        ${customerchore?.status === "Klar" ? "bg-success" : ""}
        ${customerchore?.status === "Påbörjad" ? "bg-warning" : ""}
        ${customerchore?.status === "Ej påbörjad" ? "bg-danger" : ""}
          `}
          >
            <div>{customerchore?.chore?.title}</div>
            <div>{customerchore?.status}</div>
            {/* <div>{customerchore?.chore?.title}</div> */}
          </div>
        ))}
    </div>
  );
};

export default CustomerProgressCard;
