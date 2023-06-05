import { useState, useEffect } from "react";
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
  orderEdit?: OrderType;
};

const OrderModal = ({ open, closeOrderModal, orderEdit }: OrderModalProps) => {
  const dispatch = useDispatch();
  const [orderSummary, setOrderSummary] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const order: OrderType = useSelector((state: AppState) => state.order);
  const products: ProductType[] | null = useSelector(
    (state: AppState) => state.products
  );
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );

  useEffect(() => {
    console.log(order);
    if (!!orderEdit) {
      dispatch(setOrder(orderEdit));
    }
  }, []);

  const handleModalClose = () => {
    closeOrderModal();
  };

  const handleSelectedCategoryChange = (category: CategoryType | null) => {
    setSelectedCategory(category);
  };

  const findProduct = (product: ProductType): ProductOrderItemType | null => {
    return (
      order?.products?.find((item) => item.product.slug === product.slug) ||
      null
    );
  };

  const handleItemIncrease = (product: ProductType) => {
    let targetItem = findProduct(product);
    if (targetItem) {
      let updatedItem = { ...targetItem, amount: targetItem.amount + 1 };
      let updatedItems =
        order?.products?.map((item) =>
          item.product.slug === product.slug ? updatedItem : item
        ) || null;
      dispatch(setOrder({ ...order, products: updatedItems }));
    } else {
      if (order?.products) {
        dispatch(
          setOrder({
            ...order,
            products: [...order?.products, { product: product, amount: 1 }],
          })
        );
      } else {
        dispatch(
          setOrder({
            ...order,
            products: [{ product: product, amount: 1 }],
          })
        );
      }
    }
  };

  const handleItemDecrease = (product: ProductType) => {
    let targetItem = findProduct(product);
    if (targetItem) {
      let updatedItem = { ...targetItem, amount: targetItem.amount - 1 };
      if (updatedItem.amount <= 0) {
        let updatedItems =
          order?.products?.filter(
            (item) => item.product.slug !== product.slug
          ) || null;
        dispatch(setOrder({ ...order, products: updatedItems }));
      } else {
        let updatedItems =
          order?.products?.map((item) =>
            item.product.slug === product.slug ? updatedItem : item
          ) || null;
        dispatch(setOrder({ ...order, products: updatedItems }));
      }
    }
  };

  const handleSubmitCommentary = (text: string) => {
    dispatch(setOrder({ ...order, commentary: text }));
  };

  const handleNextClick = () => {
    if (order?.products && order?.products.length > 0) {
      dispatch(
        setOrder({
          ...order,
          isTakeaway: !!!selectedTable,
          paidAmount: getOrderTotal(order?.products),
        })
      );
      setOrderSummary(true);
    }
  };

  const handleBackClick = () => {
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
          total={getOrderTotal(order?.products)}
          commentary={order?.commentary}
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
