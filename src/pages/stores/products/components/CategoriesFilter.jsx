import styled from "styled-components";
import useGetAllCategories from "../../../../hooks/products/useGetAllCategories";
import { Flex } from "../../../../styles/generalStyles";
import CardActionButton from "../../../../components/CardActionButton";
import { useSearchParams } from "react-router";
import { useState } from "react";
import AddButton from "../../../../components/AddButton";
import Modal from "../../../../components/Modal";
import CategoryForm from "./CategoryForm";
import useDelete from "../../../../hooks/general/useDelete";
import PageContentLoader from "../../../../components/PageContentLoader";
import { Skeleton } from "@mui/material";

// const CategoriesContainer = styled.div`
//   display: flex;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 8px;
//   padding: 4px;
//   border-radius: 12px;
//   background: #c7f0da;
// `;

const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px;
  border-radius: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  text-align: center;
  color: var(--dark);
  background: #eefbf4;
  cursor: pointer;
  transition: background 300ms ease-in-out, color 300ms ease-in-out;

  &.active {
    padding: 10px;
  }

  &.active,
  &:hover {
    background: var(--mainColor);
    color: white;
  }
`;

const CategoriesFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("subCategoryId") || ""
  );
  const { data, isLoading, isError } = useGetAllCategories();
  const { mutate, isPending } = useDelete("/delete_sub_category", [
    ["sub-categories"],
  ]);
  const applyFilter = (option) => {
    const updatedParams = new URLSearchParams(searchParams);

    setCategory(option);

    if (option) {
      updatedParams.set("subCategoryId", option);
    } else {
      updatedParams.delete("subCategoryId");
    }

    setSearchParams(updatedParams);
  };

  const deleteCategory = (id, onCloseModal) => {
    mutate(id, { onSuccess: () => onCloseModal?.() });
  };

  // useEffect(() => {
  //   setCategory(searchParams.get("subCategoryId") || "");
  // }, [searchParams]);

  return (
    <Modal>
      <Flex $align="center" $gap={8} $wrap="wrap">
        {/* <CategoriesContainer> */}
        {!isLoading &&
          !isError &&
          data?.data?.map((item) => (
            <CategoryButton
              key={item.id}
              onClick={() => applyFilter(item.id)}
              className={Number(category) === item.id && "active"}
            >
              {item.name}
              {Number(category) === item.id && (
                <>
                  <CardActionButton
                    background="white"
                    deleteAction={(onCloseModal) =>
                      deleteCategory(item.id, onCloseModal)
                    }
                    isDeleting={isPending}
                    windowToOpen={"editCategory"}
                    window={<CategoryForm isEditForm defaultData={item} />}
                  />
                </>
              )}
            </CategoryButton>
          ))}
        <PageContentLoader
          isLoading={isLoading}
          loadingComponent={Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              variant="rectangular"
              width={"148px"}
              height={"45px"}
              sx={{ borderRadius: "8px" }}
              key={i}
              animation="wave"
            />
          ))}
        />
        <CategoryButton
          onClick={() => applyFilter(null)}
          className={category === null && "active"}
          style={{
            padding: "16.5px",
          }}
        >
          All
        </CategoryButton>
        <Modal.Open opens="addCategory">
          <button>
            <AddButton title={"Add Category"} />
          </button>
        </Modal.Open>

        <Modal.Window name="addCategory">
          <CategoryForm />
        </Modal.Window>

        {/* </CategoriesContainer> */}
      </Flex>
    </Modal>
  );
};

export default CategoriesFilter;
