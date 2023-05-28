import { useEffect, useRef, HTMLProps } from "react";
import {
  AppState,
  HallType,
  TableType,
  OrderType,
} from "../../../stores/types";
import { useSelector } from "react-redux";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";
import { TextField, Typography, FormControlLabel, Button } from "@mui/material";
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
  const selectedHall: HallType | null = useSelector(
    (state: AppState) => state.selectedHall
  );
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );
  const order: OrderType | null = useSelector((state: AppState) => state.order);
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const paidNumberField = useRef<HTMLInputElement>(null);

  const getOrderData = () => {
    return {
      products: order?.products?.map((item) => {
        return { slug: item.product.slug, amount: item.amount };
      }),
      commentary: order?.commentary,
      isTakeaway: order?.isTakeaway,
      paidAmount: paidNumberField.current?.value,
      table: selectedTable?.id,
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

  useEffect(() => {
    if (!!paidNumberField.current) {
      paidNumberField.current.value = `${order?.paidAmount}`;
    }
  }, [order]);

  return (
    <div className="order-summary-container" style={style}>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: "20px",
        }}>
        {order?.isTakeaway
          ? "Order Summary"
          : `Order Summary for ${selectedHall?.title}, Table
        ${selectedTable?.tableNumber}`}
      </Typography>
      <OrderDetails order={order} />
      <div className="order-paid-container">
        <FormControlLabel
          sx={{
            justifyContent: "left",
            width: "50%",
            flexDirection: "row-reverse",
            margin: 0,
            gap: "1.5rem",
            "& .MuiSvgIcon-root": { fontSize: 36 },
            "& .MuiFormControlLabel-label": {
              fontSize: 30,
              fontWeight: 600,
            },
          }}
          label="Paid"
          control={
            <TextField
              sx={{
                maxWidth: "120px",
                width: "50%",
              }}
              inputRef={paidNumberField}
              type="number"
            />
          }
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
