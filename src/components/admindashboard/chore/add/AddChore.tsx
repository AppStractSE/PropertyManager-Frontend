import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { CategoryResponseDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";

interface Props {
  categories: CategoryResponseDto[];
}

const AddChore = ({ categories }: Props) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [titleValue, setChoreTitle] = useState("");
  const [choreDescriptionValue, setChoreDescription] = useState("");
  const [mainCategoryValue, setMainCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const { mutate: postChore, isLoading: postingChore } = useMutation(
    async () => {
      return await client.chore_PostChore({
        title: titleValue,
        subCategoryId: subCategoryValue,
        description: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        setChoreTitle("");
        setMainCategoryValue("");
        setSubCategoryValue("");
        setChoreDescription("");
        queryClient.invalidateQueries("chores");
        console.log("Chore posted");
      },
    },
  );

  return (
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
          type='text'
          placeholder='Beskrivning på syssla'
          value={choreDescriptionValue}
          onChange={(e) => setChoreDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Huvudkategori</Form.Label>
        <Form.Select
          className='form-active'
          value={mainCategoryValue}
          onChange={(e) => {
            setMainCategoryValue(e.target.value);
            setSubCategoryValue("");
          }}
        >
          <option value=''>Välj huvudkategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title} - {category.description}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Underkategori</Form.Label>
        <Form.Select
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
        onClick={() => postChore()}
        disabled={
          postingChore ||
          !titleValue ||
          !choreDescriptionValue ||
          !mainCategoryValue ||
          !subCategoryValue
        }
      >
        Lägg till syssla
      </Button>
    </Form>
  );
};

export default AddChore;
