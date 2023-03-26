import { useState } from "react";
import { Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { useClient } from "../../../../contexts/ClientContext";

const AddChore = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [titleValue, setChoreTitle] = useState("");
  const [categoryValue, setChoreCategory] = useState("");
  const [subCategoryValue, setChoreSubCategory] = useState("");
  const [choreDescriptionValue, setChoreDescription] = useState("");
  const { mutate: postChore, isLoading: postingChore } = useMutation(
    async () => {
      return await client.chore_PostChore({
        choreTitle: titleValue,
        choreCategory: categoryValue,
        subCategory: subCategoryValue,
        choreDescription: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        setChoreTitle("");
        setChoreCategory("");
        setChoreSubCategory("");
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
        <Form.Control type='text' placeholder='Namn på syssla' />
      </Form.Group>
      <Form.Group className='mb-3' controlId='category'>
        <Form.Label>Huvudkategori</Form.Label>
        <Form.Control as='select'>
          <option>SE1.2.3.4.255</option>
          <option>KR1.2.2.1</option>
          <option>SKK1.1.2.1</option>
          <option>SKK1.1.2.2</option>
          <option>SKK1.1.2.2.3</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default AddChore;
