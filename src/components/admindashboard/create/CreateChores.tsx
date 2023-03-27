import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import {
  CategoryResponseDto,
  ChoreResponseDto,
  CustomerChoreResponseDto,
  CustomerResponseDto,
  Periodic,
} from "../../../api/client";
import AddChore from "../chore/add/AddChore";
import AddCustomerChore from "../customer/add/AddCustomerChore";

interface Props {
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  chores: ChoreResponseDto[];
  periodics: Periodic[];
  categories: CategoryResponseDto[];
}

const CreateChores = ({ customers, customerchores, chores, periodics, categories }: Props) => {
  return (
    <Tab.Container defaultActiveKey='first'>
      <Nav
        variant='pills'
        className='flex-row justify-content-center gap-5 py-2 card default-cursor'
      >
        <Nav.Item>
          <Nav.Link eventKey='first'>Kundsyssla</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='second'>Grundsyssla</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey='first'>
          <Row className='my-5'>
            <Col md={12} lg={4}>
              <Card className='default-cursor'>
                <Card.Header className='fs-5'>Nuvarande kundsysslor</Card.Header>
                <Card.Body className='justify-content-center d-flex flex-column'>
                  Välj kund för att visa kundsysslor
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={8}>
              <Card className='default-cursor'>
                <Card.Header className='fs-5'>Skapa kundsyssla</Card.Header>
                <Card.Body className='justify-content-center d-flex flex-column'>
                  <AddCustomerChore customers={customers} periodics={periodics} chores={chores} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab.Pane>
        <Tab.Pane eventKey='second'>
          <Row className='my-5'>
            <Col md={12} lg={4}>
              <Card className='default-cursor'>
                <Card.Header className='fs-5'>Nuvarande sysslor</Card.Header>
                <Card.Body className='justify-content-center d-flex flex-column'>
                  {categories.map((category) => (
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
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={8}>
              <Card className='default-cursor'>
                <Card.Header className='fs-5'>Skapa syssla</Card.Header>
                <Card.Body className='justify-content-center d-flex flex-column'>
                  <AddChore categories={categories} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default CreateChores;
