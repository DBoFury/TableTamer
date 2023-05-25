import { useRef, HTMLProps } from "react";
import { AppState, OrderType } from "../../../stores/types";
import { useSelector } from "react-redux";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";
import { Checkbox, Typography, FormControlLabel, Button } from "@mui/material";
import api from "../../API/api";
import "./OrderSummary.css";
import getOrderTotal from "../../../utils/getOrderTotal";
import OrderDetails from "../../OrderDetails/OrderDetails";

interface OrderSummaryPropsType extends HTMLProps<HTMLDivElement> {
  handleBackClick: () => void;
  closeOrderModal: () => void;
}

const OrderSummary = ({
  style,
  handleBackClick,
  closeOrderModal,
}: OrderSummaryPropsType) => {
  const order: OrderType | null = useSelector((state: AppState) => state.order);
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const paidCheckBox = useRef();

  const getOrderData = () => {
    return {
      products: order?.products?.map((item) => {
        return { slug: item.product.slug, amount: item.amount };
      }),
      commentary: order?.commentary,
      is_takeaway: order?.isTakeaway,
    };
  };

  const handleSubmitOrder = () => {
    api
      .post("/orders", getOrderData(), {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        closeOrderModal();
      });
  };

  return (
    <div className="order-summary-container" style={style}>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: "20px",
        }}>
        Order Summary
      </Typography>
      <OrderDetails order={order} />
      <div className="order-paid-container">
        <FormControlLabel
          inputRef={paidCheckBox}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 36 },
            "& .MuiFormControlLabel-label": {
              fontSize: 30,
              fontWeight: 600,
            },
          }}
          control={<Checkbox defaultChecked />}
          label="Paid"
        />
        <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
          Total: {getOrderTotal(order?.products || [])}
        </Typography>
      </div>

      <StickyWrapper className="order-actions">
        <Button
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#5c6ac4",
          }}
          onClick={handleBackClick}>
          Back
        </Button>
        <Button
          sx={{
            fontWeight: "bold",
            color: "#ffffff",
            backgroundColor: "#5c6ac4",
          }}
          onClick={handleSubmitOrder}>
          Create Order
        </Button>
      </StickyWrapper>
    </div>
  );
};

export default OrderSummary;
