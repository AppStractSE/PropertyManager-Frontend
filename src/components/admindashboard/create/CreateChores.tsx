import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
} from "../../../api/client";
import AddChore from "../chore/AddChore";
import AddCustomerChore from "../customer/add/AddCustomerChore";

interface Props {
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  chores: ChoreResponseDto[];
  periodics: Periodic[];
  categories: CategoryResponseDto[];
}

const CreateChores = ({ customers, customerchores, chores, periodics, categories }: Props) => {
  const [choreType, setChoreType] = useState(true);

  const currentChores = categories.map((category) => (
    <div className='mb-3' key={category.id}>
      <Card.Title>
        {category.title} - {category.description}
      </Card.Title>
      {category.subCategories?.map((subcategory) => (
        <div key={subcategory.id}>
          <Card.Text>
            {subcategory.reference} - {subcategory.title}
          </Card.Text>
          {chores
            .sort((a, b) => a.title!.localeCompare(b.title!))
            .filter((chore) => chore.subCategoryId === subcategory.id)
            .map((chore) => (
              <Card.Text key={chore.id} className='fw-light'>
                {chore.title}
              </Card.Text>
            ))}
        </div>
      ))}
    </div>
  ));
  return (
    <Row className='my-5'>
      <Col md={12} lg={4}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>
            Nuvarande {choreType ? "kundsysslor" : "sysslor"}
          </Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {choreType ? <>Välj kund för att visa kundsysslor</> : <>{currentChores}</>}
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5 d-flex'>
            Skapa {choreType ? "kundsyssla" : "syssla"}
            <Form.Group className='ms-auto d-flex gap-2 align-items-center'>
              <Form.Label className={`fs-6 ${choreType ? "opacity-25" : ""} mb-0`}>
                Syssla
              </Form.Label>
              <Form.Check
                type='switch'
                checked={choreType}
                onChange={() => setChoreType(!choreType)}
              />
              <Form.Label className={`fs-6 ${!choreType ? "opacity-25" : ""} mb-0`}>
                Kundsyssla
              </Form.Label>
            </Form.Group>
          </Card.Header>
          <Card.Body className='justify-content-center d-flex flex-column'>
            {choreType ? (
              <AddCustomerChore customers={customers} periodics={periodics} chores={chores} />
            ) : (
              <AddChore categories={categories} />
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateChores;
