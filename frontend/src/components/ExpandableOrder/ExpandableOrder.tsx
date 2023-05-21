import { FetchedOrderType } from "../../stores/types";
import Expand from "react-expand-animated";
import OrderDetails from "../OrderDetails/OrderDetails";

interface ExpandableOrderPropsType {
  order: FetchedOrderType;
  isOpened: boolean;
  handleClick: (id: number) => void;
}

const ExpandableOrder = ({
  order,
  isOpened,
  handleClick,
}: ExpandableOrderPropsType) => {
  return (
    <div
      onClick={() => handleClick(order.id || 0)}
      className="expandable-order-container">
      {order.createdAt}
      <Expand open={isOpened}>
        <OrderDetails order={order} />
        <div>{order.fullPrice}</div>
      </Expand>
    </div>
  );
};

export default ExpandableOrder;
