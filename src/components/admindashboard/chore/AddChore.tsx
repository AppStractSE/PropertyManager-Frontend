/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { CategoryResponseDto } from "../../../api/client";
import { useClient } from "../../../contexts/ClientContext";
import toasts from "../../../data/toasts";
import Category from "../../modals/Categories/Category";
import SubCategoryForm from "./SubCategoryForm";

interface Props {
  categories: CategoryResponseDto[];
}

const AddChore = ({ categories }: Props) => {
  const client = useClient();
  const queryClient = useQueryClient();
  const [titleValue, setChoreTitle] = useState("");
  const [isMainCategory, setIsMainCategory] = useState<boolean>(true);
  const [choreDescriptionValue, setChoreDescription] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryModalValue, setCategoryModalValue] = useState<string>("");
  const [subCategoryValue, setSubCategoryValue] = useState<string[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { mutate: postChore, isLoading: postingChore } = useMutation(
    async () => {
      return await client.chore_PostChore({
        title: titleValue,
        subCategoryId: subCategoryValue[subCategoryValue.length - 1],
        description: choreDescriptionValue,
      });
    },
    {
      onSuccess: () => {
        setChoreTitle("");
        setCategoryValue("");
        setChoreDescription("");
        setSubCategoryValue([]);
        queryClient.invalidateQueries("chores");
        toast.success(toasts.create.chore.onMutate.message);
      },
    },
  );
  const depthOfSubCategories = (categoryId: string): number => {
    let depth = 0;
    const categoryObject = categories.find((x) => x.id === categoryId);
    if (categoryObject?.subCategories && categoryObject.subCategories.length > 0) {
      depth++;
      categoryObject.subCategories.forEach((subCategory) => {
        depth += depthOfSubCategories(subCategory.id);
      });
    }
    return depth;
  };

  const setSubCategoryValues = (categoryId: string, valueBefore: string) => {
    if (!valueBefore && categoryId) {
      setSubCategoryValue((prev) => [...prev, categoryId]);
      return;
    }

    if (valueBefore) {
      setSubCategoryValue((prev) => {
        const index = prev.indexOf(valueBefore);
        if (index === -1) {
          const newValues = [...prev, categoryId];
          return newValues;
        }

        const newValues = [...prev];
        newValues[index] = categoryId;
        return newValues.slice(0, index + 1);
      });
    }
  };

  const setModalStates = (categoryId: string, isMain: boolean) => {
    setCategoryModalValue(categoryId);
    setIsMainCategory(isMain);
  };

  const printSubCategoryForm = (categoryId: string): JSX.Element | null => {
    if (depthOfSubCategories(categoryId) > 0) {
      return (
        <SubCategoryForm
          key={categoryId}
          categories={categories}
          latestSecectedCategoryId={categoryId}
          setShowCategoryModal={setShowCategoryModal}
          showCategoryModal={showCategoryModal}
          setCategoryModalStates={setModalStates}
          setSelectedSubCategory={setSubCategoryValues}
        />
      );
    }
    return null;
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
                setSubCategoryValue([e.target.value]);
                setCategoryValue(e.target.value);
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
                return null;
              })}
            </Form.Select>
            <div>
              <Button
                className='d-flex gap-1 align-items-center'
                onClick={() => {
                  setCategoryModalValue(categoryValue);
                  setIsMainCategory(true);
                  setShowCategoryModal(!showCategoryModal);
                }}
              >
                <AiOutlinePlus size={18} />
                <div className='fs-6'>Ny</div>
              </Button>
            </div>
          </div>
        </Form.Group>
        <>{subCategoryValue.map((subCat) => printSubCategoryForm(subCat))}</>

        <Button
          className='w-100'
          onClick={() => postChore()}
          disabled={
            postingChore ||
            !titleValue ||
            !choreDescriptionValue ||
            !subCategoryValue ||
            subCategoryValue.length === 0
          }
        >
          Lägg till syssla
        </Button>
      </Form>
      <Category
        isMainCategory={isMainCategory}
        category={categories.find((x) => x.id === categoryModalValue) as CategoryResponseDto}
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(!showCategoryModal)}
      />
    </>
  );
};

export default AddChore;
