import { ProductOrderItemType } from "../stores/types";

const getOrderTotal = (orderItems: ProductOrderItemType[]) => {
  let total = 0;
  orderItems.map((item) => {
    total += item.amount * item.product.price;
  });
  return total;
};

export default getOrderTotal;
