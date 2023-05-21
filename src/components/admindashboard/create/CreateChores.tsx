import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Accordion, Card, Col, Form, Row } from "react-bootstrap";
import { CategoryResponseDto, ChoreResponseDto, CustomerChoreResponseDto, CustomerResponseDto, Periodic } from "../../../api/client";
import Search from "../../Search";
import AddChore from "../chore/AddChore";
import AddCustomerChore from "../customer/add/AddCustomerChore";

interface Props {
  categories: CategoryResponseDto[];
  chores: ChoreResponseDto[];
  customers: CustomerResponseDto[];
  customerchores: CustomerChoreResponseDto[];
  periodics: Periodic[];
}

const CreateChores = ({ categories, chores, customers, customerchores, periodics }: Props) => {
  const [choreType, setChoreType] = useState(true);
  const [search, setSearch] = useState("");
  const currentChores = categories
  .filter((category) =>
    category?.subCategories?.some((subcategory) =>
      chores.some(
        (chore) =>
          chore.subCategoryId === subcategory.id &&
          chore.title?.toLowerCase().includes(search.toLowerCase())
      )
    )
  )
  .map((category) => (
    <Accordion.Item eventKey={category.id.toString()} className='mb-3' key={category.id}>
      <Accordion.Header>{category.title} - {category.description}</Accordion.Header>
      <Accordion.Body>
      {category.subCategories
        ?.filter((subcategory) =>
          chores.some(
            (chore) =>
            chore.subCategoryId === subcategory.id &&
            chore.title?.toLowerCase().includes(search.toLowerCase())
            )
            )
        .map((subcategory) => (
          <div key={subcategory.id}>
            <Card.Text className='ms-2'>
              {subcategory.reference} - {subcategory.title}
            </Card.Text>
            {chores
              .sort((a, b) => a.title!.localeCompare(b.title!))
              .filter(
                (chore) =>
                  chore.subCategoryId === subcategory.id &&
                  chore.title?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((chore) => (
                    <Card.Text key={chore.id} className='ms-4 fw-light'>
                  {chore.title}
                </Card.Text>
              ))}
          </div>
        ))}
        </Accordion.Body>
    </Accordion.Item>
  ));

  return (
    <Row className='my-5'>
      <Col md={12} lg={4} className='mb-3'>
        <Card className='default-cursor'>
          <Card.Header className='fs-5'>
            <AnimatePresence mode='wait'>
              {choreType ? (
                <motion.div
                  key='customerchore--left--header'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Kundsysslor
                </motion.div>
              ) : (
                <motion.div
                  key='chore--left--header'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Nuvarande sysslor
                </motion.div>
              )}
            </AnimatePresence>
          </Card.Header>

          <Card.Body>
            <AnimatePresence mode='wait'>
              {choreType ? (
                <motion.div
                  key='customer-chore--left--content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Välj en kund för att se tillgängliga sysslor, utgråade sysslor ligger redan på
                  kund.
                </motion.div>
              ) : (
                <motion.div
                  key='chore--left--content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Search
                    value={search}
                    onChange={(value) => setSearch(value)}
                    placeholder={"syssla"}
                    />
                    <Accordion flush defaultActiveKey={categories.map((category) => category.id.toString())} alwaysOpen>
                  {currentChores}
                    </Accordion>
                  {currentChores.length === 0 ? <div>Inga resultat hittades.</div> : null}
                </motion.div>
              )}
            </AnimatePresence>
          </Card.Body>
        </Card>
      </Col>
      <Col md={12} lg={8}>
        <Card className='default-cursor'>
          <Card.Header className='fs-5 d-flex'>
            <AnimatePresence mode='wait'>
              {choreType ? (
                <motion.div
                  key='customerchore--right--header'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Skapa kundsyssla
                </motion.div>
              ) : (
                <motion.div
                  key='chore--right--header'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Skapa syssla
                </motion.div>
              )}
            </AnimatePresence>
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
          <AnimatePresence mode='wait'>
            <Card.Body
              key={choreType ? "add-customer-chore" : "add-chore"}
              className='justify-content-center d-flex flex-column'
            >
              {choreType ? (
                <motion.div
                  key='customer-chore--right--content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AddCustomerChore
                    customerchores={customerchores}
                    customers={customers}
                    periodics={periodics}
                    chores={chores}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key='chore--right--content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AddChore categories={categories} />
                </motion.div>
              )}
            </Card.Body>
          </AnimatePresence>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateChores;
