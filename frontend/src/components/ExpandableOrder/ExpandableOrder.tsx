import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetOrder } from "../../stores/reducers";
import { Typography } from "@mui/material";
import Expand from "react-expand-animated";
import OrderDetails from "../OrderDetails/OrderDetails";
import SpinningChevron from "../SpinningChevron/SpinningChevron";
import { Button } from "@mui/material";
import OrderModal from "../OrderModal/OrderModal";
import { OrderType } from "../../stores/types";
import "./ExpandableOrder.css";

interface ExpandableOrderPropsType {
  order: OrderType;
  isOpened: boolean;
  handleClick: (id: number) => void;
}

const ExpandableOrder = ({
  order,
  isOpened,
  handleClick,
}: ExpandableOrderPropsType) => {
  const dispatch = useDispatch();

  const [editOrderModalOpen, setEditOrderModalOpen] = useState<boolean>(false);

  const handleEditOrderClick = () => {
    setEditOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setEditOrderModalOpen(false);
    dispatch(resetOrder());
  };

  return (
    <div className="expandable-order-container">
      <div
        onClick={() => handleClick(order.id || 0)}
        className="expandable-order-title"
        style={{
          marginBottom: `${isOpened ? 20 : 0}px`,
        }}>
        <div className="expandable-order-naming">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
            }}>
            <Typography>
              <b>Order № {order.id}</b>
            </Typography>
            <Typography>
              <b>{order.hall}</b>
            </Typography>
            <Typography>
              <b>{order.table}</b>
            </Typography>
          </div>
          <Typography>
            <b>Created at: </b>
            {order.createdAt}
          </Typography>
        </div>
        <SpinningChevron isOpen={isOpened} startRotation={-90} />
      </div>
      <Expand
        className={`expandable-order-details ${
          isOpened ? "expandable-order-details-opened" : ""
        }`}
        open={isOpened}>
        <OrderDetails order={order} />
        <div className="expandable-order-total-paid">
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 600,
              marginTop: "1rem",
            }}>
            Paid: {order.paidAmount}
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 600,
              marginTop: "1rem",
            }}>
            Total: {order.fullPrice}
          </Typography>
          <Button
            onClick={handleEditOrderClick}
            sx={{
              height: "3rem",
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#5c6ac4",
              marginTop: "0.5rem",
            }}>
            Edit Order
          </Button>
        </div>
      </Expand>
      {editOrderModalOpen && (
        <OrderModal
          open={editOrderModalOpen}
          closeOrderModal={closeOrderModal}
          orderEdit={order}
        />
      )}
    </div>
  );
};

export default ExpandableOrder;
