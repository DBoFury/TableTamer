import { OrderType } from "../../stores/types";
import "./OrderDetails.css";

interface OrderDetailsPropsType {
  order: OrderType | null;
}

const OrderDetails = ({ order }: OrderDetailsPropsType) => {
  return (
    <div className="order-details-container">
      {order?.products?.map((item, index) => (
        <div key={index} className="order-detail-container">
          <p>{item.product.title}</p>
          <div className="filler" />
          <p>{item.amount}</p>
        </div>
      ))}
      {order?.commentary && (
        <div className="order-comment">Comment: {order?.commentary}</div>
      )}
    </div>
  );
};

export default OrderDetails;
