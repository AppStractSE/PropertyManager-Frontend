import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { AreaResponseDto } from "../../../api/client";
import Search from "../../Search";
import AddAreaModal from "./add/AddAreaModal";
import AreaTable from "./table/AreaTable";

interface Props {
  areas: AreaResponseDto[];
}

const AreaPane = ({ areas }: Props) => {
  const [showAddAreaModal, setShowAddAreaModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <Card className='default-cursor'>
      <Card.Header className='fs-4 mb-2'>Områdesöversikt</Card.Header>
      <Card.Body>
        <div className='d-flex align-items-center gap-4 mb-3'>
          <Search value={search} onChange={(value) => setSearch(value)} placeholder='område' />
          <Button
            className='d-flex align-items-center gap-2 align-self-stretch'
            onClick={() => setShowAddAreaModal(!showAddAreaModal)}
          >
            <AiOutlinePlus size={18} />
            <div>Skapa nytt område</div>
          </Button>
        </div>
        <AreaTable search={search} areas={areas} />
        <AddAreaModal
          show={showAddAreaModal}
          onHide={() => setShowAddAreaModal(!showAddAreaModal)}
        />
      </Card.Body>
    </Card>
  );
};

export default AreaPane;
