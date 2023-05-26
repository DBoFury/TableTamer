import { FetchedOrderType } from "../../stores/types";
import { Typography, FormControlLabel, Checkbox } from "@mui/material";
import Expand from "react-expand-animated";
import OrderDetails from "../OrderDetails/OrderDetails";
import "./ExpandableOrder.css";
import SpinningChevron from "../SpinningChevron/SpinningChevron";

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
    <div className="expandable-order-container">
      <div
        onClick={() => handleClick(order.id || 0)}
        className="expandable-order-title"
        style={{
          marginBottom: `${isOpened ? 20 : 0}px`,
        }}>
        <div className="expandable-order-naming">
          <Typography>
            <b>Order № {order.id}</b>
          </Typography>
          <Typography>
            <b>Created at: </b>
            {order.createdAt}
          </Typography>
        </div>
        <SpinningChevron isOpen={isOpened} />
      </div>
      <Expand
        className={`expandable-order-details ${
          isOpened ? "expandable-order-details-opened" : ""
        }`}
        open={isOpened}>
        <OrderDetails order={order} />
        <div className="expandable-order-total-paid">
          <FormControlLabel
            sx={{
              "& .MuiSvgIcon-root": { fontSize: 36 },
              "& .MuiFormControlLabel-label": {
                fontSize: 30,
                fontWeight: 600,
              },
            }}
            control={<Checkbox checked={order.isPaid} />}
            label="Paid"
          />
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 600,
              marginTop: "1rem",
            }}>
            Total: {order.fullPrice}
          </Typography>
        </div>
      </Expand>
    </div>
  );
};

export default ExpandableOrder;
