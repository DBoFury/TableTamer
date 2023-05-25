import { OrderType } from "../../stores/types";
import { Typography } from "@mui/material";
import "./OrderDetails.css";

interface OrderDetailsPropsType {
  order: OrderType | null;
}

const OrderDetails = ({ order }: OrderDetailsPropsType) => {
  return (
    <div className="order-details-container">
      {order?.products?.map((item, index) => (
        <div key={index} className="order-detail-container">
          <Typography sx={{ fontWeight: "bold" }}>
            {item.product.title}
          </Typography>
          <div className="filler" />
          <Typography sx={{ fontWeight: "bold" }}>{item.amount}</Typography>
        </div>
      ))}
      {order?.commentary && (
        <Typography
          sx={{
            marginTop: "20px",
          }}>
          <b>Comment: </b>
          {order?.commentary}
        </Typography>
      )}
    </div>
  );
};

export default OrderDetails;
