import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CategoryResponseDto } from "../../../api/client";

interface Props {
  categories: CategoryResponseDto[];
  latestSecectedCategoryId: string;
  setShowSubCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  showSubCategoryModal: boolean;
  setSelectedSubCategory: (e: string) => void;
}

const SubCategoryForm = ({
  categories,
  latestSecectedCategoryId,
  setShowSubCategoryModal,
  showSubCategoryModal,
  setSelectedSubCategory,
}: Props) => {
  const [subCategoryValue, setSubCategoryValue] = useState("");

  const hasChildren = (categoryId: string) => {
    const categoryObject = categories.find((x) => x.id === categoryId);
    if (categoryObject?.subCategories && categoryObject.subCategories?.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <Form.Group
      className='mb-3'
      controlId='category'
      hidden={!hasChildren(latestSecectedCategoryId)}
    >
      <Form.Label>Underkategori</Form.Label>
      <div className='d-flex gap-2'>
        <Form.Select
          className='flex-fill w-auto'
          value={subCategoryValue}
          onChange={(e) => {
            setSubCategoryValue(e.target.value);
            setSelectedSubCategory(e.target.value);
          }}
        >
          <option value=''>Välj underkategori</option>
          {categories
            .filter((category) => category.id === latestSecectedCategoryId)
            .map((filteredCategories) => {
              return filteredCategories.subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.reference} - {subCategory.title}
                </option>
              ));
            })}
        </Form.Select>
        <div>
          <Button
            className='d-flex gap-1 align-items-center'
            onClick={() => setShowSubCategoryModal(!showSubCategoryModal)}
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
