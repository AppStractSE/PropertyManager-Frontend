import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { CategoryResponseDto, ChoreResponseDto, CustomerChoreResponseDto, CustomerResponseDto, Periodic } from "../../../api/client";
import AddChore from "../chore/AddChore";
import AddCustomerChore from "../customer/add/AddCustomerChore";

interface Props {
  categories: CategoryResponseDto[]
                    chores: ChoreResponseDto[]
                    customers: CustomerResponseDto[]
                    customerchores: CustomerChoreResponseDto[]
                  periodics: Periodic[]
}

const CreateChores = ({categories, chores, customers, customerchores, periodics}: Props) => {
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
                  Nuvarande kundsysslor
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
                  Välj kund för att visa kundsysslor
                </motion.div>
              ) : (
                <motion.div
                  key='chore--left--content'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {currentChores}
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
                  <AddCustomerChore customerchores={customerchores} customers={customers} periodics={periodics} chores={chores} />
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
