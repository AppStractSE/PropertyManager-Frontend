import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import {
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerResponseDto,
  Periodic,
} from "../../../api/client";
import Search from "../../Search";
import AddChoreModal from "./add/AddChoreModal";

interface Props {
  customers: CustomerResponseDto[];
  chores: ChoreResponseDto[];
  periodics: Periodic[];
  categories: CategoryResponseDto[];
}

const ChorePane = ({ customers, chores, periodics, categories }: Props) => {
  const [showAddChoreModal, setShowAddChoreModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <Card className='default-cursor'>
      <Card.Header className='fs-4 mb-2'>Syssloöversikt</Card.Header>
      <Card.Body>
        <div className='d-flex align-items-center gap-4 mb-3'>
          <Search value={search} onChange={(value) => setSearch(value)} placeholder='syssla' />
          <Button
            className='d-flex align-items-center gap-2 align-self-stretch'
            onClick={() => setShowAddChoreModal(!showAddChoreModal)}
          >
            <AiOutlinePlus size={18} />
            <div>Skapa ny syssla</div>
          </Button>
        </div>
        <AddChoreModal
          show={showAddChoreModal}
          onHide={() => setShowAddChoreModal(!showAddChoreModal)}
          customers={customers}
          chores={chores}
          periodics={periodics}
          categories={categories}
        />
      </Card.Body>
    </Card>
  );
};

export default ChorePane;
