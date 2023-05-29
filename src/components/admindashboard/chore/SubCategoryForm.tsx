import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CategoryResponseDto } from "../../../api/client";

interface Props {
  categories: CategoryResponseDto[];
  latestSecectedCategoryId: string;
  setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCategoryModal: boolean;
  setCategoryModalStates: (categoryId: string, isMain: boolean) => void;
  setSelectedSubCategory: (newValue: string, oldValue: string) => void;
}

const SubCategoryForm = ({
  categories,
  latestSecectedCategoryId,
  setShowCategoryModal,
  showCategoryModal,
  setSelectedSubCategory,
  setCategoryModalStates,
}: Props) => {
  const [subCategoryValue, setSubCategoryValue] = useState("");
  const hasChildren = (categoryId: string) => {
    const categoryObject = categories.find((x) => x.id === categoryId);
    return (categoryObject?.subCategories?.length ?? 0) > 0;
  };

  return (
    <Form.Group className='mb-3' controlId='category'>
      <Form.Label>Underkategori</Form.Label>
      <div className='d-flex gap-2'>
        <Form.Select
          className='flex-fill w-auto'
          value={subCategoryValue}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedSubCategory(value, subCategoryValue ? subCategoryValue : "");
            setSubCategoryValue(value);
          }}
        >
          <option value=''>Välj underkategori</option>
          {categories
            .filter((category) => category.id === latestSecectedCategoryId)
            .map((filteredCategories) =>
              filteredCategories?.subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.reference} - {subCategory.title}
                </option>
              )),
            )}
        </Form.Select>
        <div>
          <Button
            className='d-flex gap-1 align-items-center'
            onClick={() => {
              setCategoryModalStates(
                categories.find((x) => x.id === subCategoryValue)?.parentId ??
                  latestSecectedCategoryId,
                false,
              );
              setShowCategoryModal(!showCategoryModal);
            }}
          >
            <AiOutlinePlus size={18} />
            <div className='fs-6'>Ny</div>
          </Button>
        </div>
      </div>
    </Form.Group>
  );
};

export default SubCategoryForm;
