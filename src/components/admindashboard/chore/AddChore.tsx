import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CategoryResponseDto } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";
import Category from "../../modals/Categories/Category";
import SubCategory from "../../modals/Categories/SubCategory";
import SubCategoryForm from "./SubCategoryForm";

interface Props {
  categories: CategoryResponseDto[];
}

const AddChore = ({ categories }: Props) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [titleValue, setChoreTitle] = useState("");
  const [choreDescriptionValue, setChoreDescription] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [subCategoryValue, setSubCategoryValue] = useState<Array<string>>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const { mutate: postChore, isLoading: postingChore } = useMutation(
    async () => {
      return await client.chore_PostChore({
        title: titleValue,
        subCategoryId: subCategoryValue.findLast((x) => x !== "") as string,
        description: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        setChoreTitle("");
        setCategoryValue("");
        setChoreDescription("");
        queryClient.invalidateQueries("chores");
        toast.success(toasts.create.chore.onMutate.message);
      },
    },
  );
  const depthOfSubCategories = (categoryId: string) => {
    let DepthOfSubCategories = 0;
    const categoryObject = categories.find((x) => x.id === categoryId);
    if (categoryObject?.subCategories && categoryObject.subCategories?.length > 0) {
      DepthOfSubCategories++;
      categoryObject.subCategories.forEach((subCategory) => {
        DepthOfSubCategories += depthOfSubCategories(subCategory.id);
      });
    }
    return DepthOfSubCategories;
  };

  const printSubCategoryForm = (categoryId: string): JSX.Element => {
    let categoryValue = categoryId;
    if (depthOfSubCategories(categoryId) > 0) {
      return (
        <SubCategoryForm
          key={categoryValue}
          categories={categories}
          latestSecectedCategoryId={categoryValue}
          setShowSubCategoryModal={setShowSubCategoryModal}
          showSubCategoryModal={showCategoryModal}
          setSelectedSubCategory={(x) => setSubCategoryValue((prev) => [...prev, x])}
        />
      );
    }
    return <></>;
  };

  if (!categories) return null;
  return (
    <>
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
          <Form.Label>Kategori</Form.Label>
          <div className='d-flex gap-2'>
            <Form.Select
              className='form-active flex-fill w-auto'
              value={categoryValue}
              onChange={(e) => {
                setCategoryValue(e.target.value);
                setSubCategoryValue([]);
              }}
            >
              <option value=''>Välj kategori</option>
              {categories.map((category) => {
                if (category.parentId === "00000000-0000-0000-0000-000000000000") {
                  return (
                    <option
                      key={category.reference}
                      value={category.id}
                      label={category.reference + " - " + category.title}
                    ></option>
                  );
                }
              })}
            </Form.Select>
            <div>
              <Button
                className='d-flex gap-1 align-items-center'
                onClick={() => setShowCategoryModal(!showCategoryModal)}
              >
                <AiOutlinePlus size={18} />
                <div className='fs-6'>Ny</div>
              </Button>
            </div>
          </div>
        </Form.Group>

        {subCategoryValue.length > 0 ? (
          <>
            {printSubCategoryForm(categoryValue)}
            {subCategoryValue.map((subCat) => {
              printSubCategoryForm(subCat);
            })}
          </>
        ) : (
          printSubCategoryForm(categoryValue)
        )}

        <Button
          className='w-100'
          onClick={() => postChore()}
          disabled={
            postingChore ||
            !titleValue ||
            !choreDescriptionValue ||
            !categoryValue ||
            !subCategoryValue
          }
        >
          Lägg till syssla
        </Button>
      </Form>
      <Category show={showCategoryModal} onHide={() => setShowCategoryModal(!showCategoryModal)} />
      <SubCategory
        category={categories.find((x) => x.id === categoryValue) as CategoryResponseDto}
        show={showSubCategoryModal}
        onHide={() => setShowSubCategoryModal(!showSubCategoryModal)}
      />
    </>
  );
};

export default AddChore;
