import { useState, useEffect } from "react";
import {
  AppState,
  CategoryType,
  ProductType,
  ProductOrderItemType,
} from "../../stores/types";
import { useSelector } from "react-redux";
import Product from "../Product/Product";
import ProductCategoriesNavBar from "../ProductCategoriesNavBar/ProductCategoriesNavBar";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./ProductsModal.css";

type ProductsModalProps = {
  open: boolean;
  onClose: () => void;
};

const ProductsModal: React.FC<ProductsModalProps> = ({ open, onClose }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | null>();
  const [orderItems, setOrderItems] = useState<ProductOrderItemType[] | null>();
  const products: ProductType[] | null = useSelector(
    (state: AppState) => state.products
  );

  const handleSelectedCategoryChange = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };

  const findItemBySlug = (slug: string) => {
    return orderItems?.find((item) => item.slug === slug);
  };

  const handleItemIncrease = (slug: string) => {
    const targetItem = findItemBySlug(slug);
    if (targetItem) {
      targetItem.amount += 1;
      const updatedItems = orderItems?.map((item) =>
        item.slug === slug ? targetItem : item
      );
      setOrderItems(updatedItems);
    } else {
      if (orderItems) {
        setOrderItems([...orderItems, { slug: slug, amount: 1 }]);
      } else {
        setOrderItems([{ slug: slug, amount: 1 }]);
      }
    }
  };

  const handleItemDecrease = (slug: string) => {
    const targetItem = findItemBySlug(slug);
    if (targetItem) {
      targetItem.amount -= 1;
      if (targetItem.amount <= 0) {
        const updatedItems = orderItems?.filter((item) => item.slug !== slug);
        setOrderItems(updatedItems);
      } else {
        const updatedItems = orderItems?.map((item) =>
          item.slug === slug ? targetItem : item
        );
        setOrderItems(updatedItems);
      }
    }
  };

  useEffect(() => {
    console.log(orderItems);
  }, [orderItems]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <div className="modal-message-container">
          <div className="modal-message-title">Select Products</div>
          <div className="modal-message-content">
            <ProductCategoriesNavBar
              setSelectedCategory={handleSelectedCategoryChange}
            />
            {products?.map((product) => {
              if (
                !selectedCategory ||
                product.category.title === selectedCategory?.title
              ) {
                return (
                  <div className="product-amount-container">
                    <Product
                      key={product.slug}
                      title={product.title}
                      description={product.description}
                      imageUrl={product.imageUrl}
                      price={product.price}
                      isInStoplist={product.isInStoplist}
                      category={product.category}
                    />
                    <div className="product-amount-change">
                      <button onClick={() => handleItemIncrease(product.slug)}>
                        +
                      </button>
                      <p>{findItemBySlug(product.slug)?.amount || 0}</p>
                      <button onClick={() => handleItemDecrease(product.slug)}>
                        -
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <button className="sticky-button-commentary">Add Comment</button>
        </div>
      </Fade>
    </Modal>
  );
};

export default ProductsModal;
