/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { CategoryResponseDto, ChoreResponseDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";

interface Props {
  categories: CategoryResponseDto[];
  currentChore: ChoreResponseDto | null;
}

const EditChore = ({ categories, currentChore }: Props) => {
  const [titleValue, setChoreTitle] = useState("");
  const [choreDescriptionValue, setChoreDescription] = useState("");
  const [mainCategoryValue, setMainCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");

  const queryClient = useQueryClient();
  const client = useClient();

  const { mutate: updateChore, isLoading: updatingChore } = useMutation(
    async () => {
      return await client.chore_PutChore({
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        id: currentChore?.id!,
        title: titleValue,
        subCategoryId: subCategoryValue,
        description: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["chores"]);
        queryClient.invalidateQueries(["categories"]);
      },
    },
  );
  useEffect(() => {
    if (currentChore) {
      setChoreTitle(currentChore?.title!);
      setChoreDescription(currentChore?.description!);
      setMainCategoryValue(
        categories.find((x) =>
          x.subCategories ? x.subCategories.find((y) => y.id === currentChore.subCategoryId) : "",
        )?.id!,
      );

      setSubCategoryValue(currentChore?.subCategoryId!);
    }
  }, [currentChore]);

  return (
    <Col md={12} lg={6} className='mb-3'>
      <Card className='default-cursor'>
        <Card.Header className='fs-4 mb-2'>Redigera syssla</Card.Header>
        <Card.Body>
          {currentChore ? (
            <Form>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Namn</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Namn på syssla'
                  value={titleValue}
                  onChange={(e) => setChoreTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Beskrivning</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={4}
                  placeholder='Beskrivning på syssla'
                  value={choreDescriptionValue}
                  onChange={(e) => setChoreDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='category'>
                <Form.Label>Huvudkategori</Form.Label>
                <Form.Select
                  className='form-active flex-fill w-100'
                  value={mainCategoryValue}
                  onChange={(e) => {
                    setMainCategoryValue(e.target.value);
                    setSubCategoryValue("");
                  }}
                >
                  <option value=''>Välj huvudkategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.reference} - {category.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3' controlId='category'>
                <Form.Label>Underkategori</Form.Label>
                <Form.Select
                  className='flex-fill w-100'
                  disabled={!mainCategoryValue}
                  value={subCategoryValue}
                  onChange={(e) => setSubCategoryValue(e.target.value)}
                >
                  <option value=''>Välj underkategori</option>
                  {categories
                    .filter((category) => category.id === mainCategoryValue)
                    .map((filteredCategories) => {
                      return filteredCategories.subCategories?.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.reference} - {subCategory.title}
                        </option>
                      ));
                    })}
                </Form.Select>
              </Form.Group>
              <Button
                className='w-100'
                onClick={() => updateChore()}
                disabled={
                  updatingChore ||
                  !titleValue ||
                  !choreDescriptionValue ||
                  !mainCategoryValue ||
                  !subCategoryValue
                }
              >
                Uppdatera syssla
              </Button>
            </Form>
          ) : (
            <div>Välj en syssla till vänster</div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EditChore;
