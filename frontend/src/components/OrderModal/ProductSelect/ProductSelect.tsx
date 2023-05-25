import {
  CategoryType,
  ProductType,
  ProductOrderItemType,
} from "../../../stores/types";
import { Button, IconButton, Typography } from "@mui/material";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useState, useEffect } from "react";
import Product from "../../Product/Product";
import ProductCategoriesNavBar from "../../ProductCategoriesNavBar/ProductCategoriesNavBar";
import CommentForm from "../CommentForm/CommentForm";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";
import "./ProductSelect.css";

type ProductSelectPropsType = {
  total: number;
  commentary: string;
  handleSubmitCommentary: (text: string) => void;
  products: ProductType[] | null;
  selectedCategory: CategoryType | null;
  handleSelectedCategoryChange: (category: CategoryType | null) => void;
  findProduct: (product: ProductType) => ProductOrderItemType | null;
  handleItemIncrease: (product: ProductType) => void;
  handleItemDecrease: (product: ProductType) => void;
  handleNextClick: () => void;
};

const ProductSelect = ({
  total,
  commentary,
  handleSubmitCommentary,
  products,
  selectedCategory,
  handleSelectedCategoryChange,
  findProduct,
  handleItemIncrease,
  handleItemDecrease,
  handleNextClick,
}: ProductSelectPropsType) => {
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const handleAddComment = () => {
    setFormVisible(true);
  };

  const handleSubmit = (text: string) => {
    handleSubmitCommentary(text);
    setFormVisible(false);
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  useEffect(() => {
    if (formVisible) {
      setTimeout(() => {
        const element = document.querySelector(".order-modal-container");
        element?.scrollTo({
          top: element?.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [formVisible]);

  return (
    <div className="product-select-container">
      <div className="title-container">
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: "bold",
          }}>
          Select Products
        </Typography>
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: "bold",
          }}>
          Total: {total}
        </Typography>
      </div>
      <ProductCategoriesNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={handleSelectedCategoryChange}
      />
      <div className="products-container">
        {products?.map((product) => {
          if (
            !selectedCategory ||
            product.category.title === selectedCategory?.title
          ) {
            return (
              <div key={product.slug} className="product-amount-container">
                <Product
                  title={product.title}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  isInStoplist={product.isInStoplist}
                />
                <div className="product-amount-change">
                  <IconButton
                    sx={{ color: "green", background: "#D0D0D0" }}
                    onClick={() => handleItemIncrease(product)}>
                    <HiPlusSm />
                  </IconButton>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {findProduct(product)?.amount || 0}
                  </Typography>
                  <IconButton
                    sx={{ color: "red", background: "#D0D0D0" }}
                    onClick={() => handleItemDecrease(product)}>
                    <HiMinusSm />
                  </IconButton>
                </div>
              </div>
            );
          }
        })}
      </div>

      {formVisible ? (
        <CommentForm
          commentary={commentary}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        <StickyWrapper className="actions-container">
          <Button
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#5c6ac4",
            }}
            onClick={handleAddComment}>
            {commentary ? "Edit Comment" : "Add Comment"}
          </Button>
          <Button
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#5c6ac4",
            }}
            onClick={handleNextClick}>
            Next
          </Button>
        </StickyWrapper>
      )}
    </div>
  );
};

export default ProductSelect;
