import { useState } from "react";
import { Accordion, Card, Col, Nav, Row } from "react-bootstrap";
import { CategoryResponseDto, ChoreResponseDto } from "../../../api/client";
import Search from "../../../components/Search";
import EditChore from "./ChoreTab/EditChore";

interface Props {
  chores: ChoreResponseDto[];
  categories: CategoryResponseDto[];
}

const ChoreTab = ({ chores, categories }: Props) => {
  const [search, setSearch] = useState("");
  const [currentChore, setCurrentChore] = useState<ChoreResponseDto | null>(null);

  const currentChores = categories
    .filter((category) =>
      category?.subCategories?.some((subcategory) =>
        chores.some(
          (chore) =>
            chore.subCategoryId === subcategory.id &&
            chore.title?.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    )
    .map((category) => (
      <Accordion.Item eventKey={category.id.toString()} className='mb-3' key={category.id}>
        <Accordion.Header>
          {category.title} - {category.description}
        </Accordion.Header>
        <Accordion.Body>
          {category.subCategories
            ?.filter((subcategory) =>
              chores.some(
                (chore) =>
                  chore.subCategoryId === subcategory.id &&
                  chore.title?.toLowerCase().includes(search.toLowerCase()),
              ),
            )
            .map((subcategory) => (
              <div key={subcategory.id}>
                <Card.Text className='ms-2'>
                  {subcategory.reference} - {subcategory.title}
                </Card.Text>
                <Nav variant='pills' className='my-2 flex-column'>
                  {chores
                    .sort((a, b) => a.title!.localeCompare(b.title!))
                    .filter(
                      (chore) =>
                        chore.subCategoryId === subcategory.id &&
                        chore.title?.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((chore) => (
                      <Nav.Item
                        className={`p-0 m-0 border-left-2 ${
                          currentChore?.id === chore.id ? "nav-link active" : ""
                        }`}
                        key={chore.id}
                        onClick={() => setCurrentChore(chore)}
                      >
                        <Nav.Link>
                          <div className='text-theme'>{chore.title}</div>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </div>
            ))}
        </Accordion.Body>
      </Accordion.Item>
    ));

  return (
    <Row className=''>
      <Col md={12} lg={6} className='mb-3'>
        <Accordion
          flush
          defaultActiveKey={categories.map((category) => category.id.toString())}
          alwaysOpen
        >
          <Card className='default-cursor'>
            <Card.Header className='fs-4 mb-2'>Sysslor</Card.Header>
            <Card.Body>
              <Search
                value={search}
                onChange={(value) => setSearch(value)}
                placeholder={"syssla"}
              />
              {currentChores}
            </Card.Body>
          </Card>
        </Accordion>
      </Col>
      <EditChore categories={categories} currentChore={currentChore} />
    </Row>
  );
};

export default ChoreTab;
