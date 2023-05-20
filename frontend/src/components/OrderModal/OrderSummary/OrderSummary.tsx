import { useRef } from "react";
import { AppState, OrderType } from "../../../stores/types";
import { useSelector } from "react-redux";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";
import { Checkbox, FormControlLabel } from "@mui/material";
import api from "../../API/api";
import "./OrderSummary.css";

interface OrderSummaryPropsType {
  handleBackClick: () => void;
  getTotal: () => number;
}

const OrderSummary = ({ getTotal, handleBackClick }: OrderSummaryPropsType) => {
  const order: OrderType | null = useSelector((state: AppState) => state.order);
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const paidCheckBox = useRef();

  const getOrderData = () => {
    return {
      products: order?.products?.map((item) => {
        return { slug: item.product.slug, amount: item.amount };
      }),
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
      .then((response) => console.log(response.data));
  };

  return (
    <div className="order-summary-container">
      <div className="order-summary-title">Order Summary</div>
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
      <div className="order-paid-container">
        <FormControlLabel
          inputRef={paidCheckBox}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: 44 },
            "& .MuiFormControlLabel-label": { fontSize: 30 },
          }}
          control={<Checkbox defaultChecked />}
          label="Paid"
        />
        <div>Total: {getTotal()}</div>
      </div>

      <StickyWrapper className="order-actions">
        <button onClick={handleSubmitOrder}>Create Order</button>
        <button onClick={handleBackClick}>Back</button>
      </StickyWrapper>
    </div>
  );
};

export default OrderSummary;
