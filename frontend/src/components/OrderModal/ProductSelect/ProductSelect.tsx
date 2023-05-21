import {
  CategoryType,
  ProductType,
  ProductOrderItemType,
} from "../../../stores/types";
import { useState, useEffect } from "react";
import Product from "../../Product/Product";
import ProductCategoriesNavBar from "../../ProductCategoriesNavBar/ProductCategoriesNavBar";
import "./ProductSelect.css";
import CommentForm from "../CommentForm/CommentForm";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";

type ProductSelectPropsType = {
  total: number;
  commentary: string;
  handleSubmitComment: (text: string) => void;
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
  handleSubmitComment,
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

  const handleCancel = () => {
    setFormVisible(false);
  };

  const handleSubmit = () => {
    handleSubmitComment(commentary);
    setFormVisible(false);
  };

  useEffect(() => {
    if (formVisible) {
      setTimeout(() => {
        const element = document.querySelector(".modal-container");
        element?.scrollTo({
          top: element?.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [formVisible]);

  return (
    <>
      <div className="title-container">
        <div>Select Products</div>
        <div>Total: {total}</div>
      </div>
      <div className="product-select-container">
        <ProductCategoriesNavBar
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
                    category={product.category}
                  />
                  <div className="product-amount-change">
                    <button onClick={() => handleItemIncrease(product)}>
                      +
                    </button>
                    <p>{findProduct(product)?.amount || 0}</p>
                    <button onClick={() => handleItemDecrease(product)}>
                      -
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {formVisible ? (
          <CommentForm
            commentary={commentary}
            handleSubmitComment={handleSubmitComment}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        ) : (
          <StickyWrapper className="actions-container">
            <button onClick={handleNextClick}>Next</button>
            <button onClick={handleAddComment}>
              {commentary ? "Edit Comment" : "Add Comment"}
            </button>
          </StickyWrapper>
        )}
      </div>
    </>
  );
};

export default ProductSelect;
