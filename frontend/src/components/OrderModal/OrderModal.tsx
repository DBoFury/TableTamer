import { useState } from "react";
import {
  AppState,
  CategoryType,
  ProductType,
  ProductOrderItemType,
  OrderType,
  TableType,
} from "../../stores/types";
import { setOrder } from "../../stores/reducers";
import { useDispatch, useSelector } from "react-redux";
import ProductSelect from "./ProductSelect/ProductSelect";
import OrderSummary from "./OrderSummary/OrderSummary";
import getOrderTotal from "../../utils/getOrderTotal";
import FadingModal from "../FadingModal/FadingModal";
import "./OrderModal.css";

type OrderModalProps = {
  open: boolean;
  closeOrderModal: () => void;
};

const OrderModal = ({ open, closeOrderModal }: OrderModalProps) => {
  const dispatch = useDispatch();
  const [orderSummary, setOrderSummary] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [orderItems, setOrderItems] = useState<ProductOrderItemType[] | null>(
    null
  );
  const [commentary, setCommentary] = useState<string>("");
  const products: ProductType[] | null = useSelector(
    (state: AppState) => state.products
  );
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );

  const handleModalClose = () => {
    closeOrderModal();
  };

  const handleSelectedCategoryChange = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };

  const findProduct = (product: ProductType): ProductOrderItemType | null => {
    return (
      orderItems?.find((item) => item.product.slug === product.slug) || null
    );
  };

  const handleItemIncrease = (product: ProductType) => {
    let targetItem = findProduct(product);
    if (targetItem) {
      let updatedItem = { ...targetItem, amount: targetItem.amount + 1 };
      let updatedItems =
        orderItems?.map((item) =>
          item.product.slug === product.slug ? updatedItem : item
        ) || null;
      setOrderItems(updatedItems);
    } else {
      if (orderItems) {
        setOrderItems([...orderItems, { product: product, amount: 1 }]);
      } else {
        setOrderItems([{ product: product, amount: 1 }]);
      }
    }
  };

  const handleItemDecrease = (product: ProductType) => {
    let targetItem = findProduct(product);
    if (targetItem) {
      let updatedItem = { ...targetItem, amount: targetItem.amount - 1 };
      if (updatedItem.amount <= 0) {
        let updatedItems =
          orderItems?.filter((item) => item.product.slug !== product.slug) ||
          null;
        setOrderItems(updatedItems);
      } else {
        let updatedItems =
          orderItems?.map((item) =>
            item.product.slug === product.slug ? updatedItem : item
          ) || null;
        setOrderItems(updatedItems);
      }
    }
  };

  const handleSubmitCommentary = (text: string) => {
    setCommentary(text);
  };

  const handleNextClick = () => {
    if (orderItems && orderItems.length > 0) {
      const order: OrderType = {
        products: orderItems,
        commentary: commentary,
        isTakeaway: !!!selectedTable,
      };
      dispatch(setOrder(order));
      setOrderSummary(true);
    }
  };

  const handleBackClick = () => {
    dispatch(setOrder(null));
    setOrderSummary(false);
  };

  return (
    <FadingModal open={open} handleModalClose={handleModalClose}>
      <div className="order-modal-container">
        <ProductSelect
          style={{
            opacity: orderSummary ? 0 : 1,
            transform: `translateX(${orderSummary ? -100 : 0}%)`,
            transition: "transform 0.6s ease-in",
            pointerEvents: orderSummary ? "none" : "auto",
            width: orderSummary ? "0%" : "100%",
            overflow: orderSummary ? "hidden" : "",
          }}
          total={getOrderTotal(orderItems || [])}
          commentary={commentary}
          products={products}
          selectedCategory={selectedCategory}
          handleSelectedCategoryChange={handleSelectedCategoryChange}
          findProduct={findProduct}
          handleItemIncrease={handleItemIncrease}
          handleItemDecrease={handleItemDecrease}
          handleSubmitCommentary={handleSubmitCommentary}
          handleNextClick={handleNextClick}
        />
        <OrderSummary
          style={{
            opacity: orderSummary ? 1 : 0,
            transform: `translateX(${orderSummary ? 0 : 100}%)`,
            transition: "transform 0.6s ease-in",
            pointerEvents: orderSummary ? "auto" : "none",
            width: orderSummary ? "100%" : "0%",
            overflow: orderSummary ? "" : "hidden",
          }}
          closeOrderModal={closeOrderModal}
          handleBackClick={handleBackClick}
        />
      </div>
    </FadingModal>
  );
};

export default OrderModal;
