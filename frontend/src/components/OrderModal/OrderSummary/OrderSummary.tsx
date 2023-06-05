import { useEffect, useRef, HTMLProps } from "react";
import {
  AppState,
  HallType,
  TableType,
  OrderType,
} from "../../../stores/types";
import { useDispatch, useSelector } from "react-redux";
import StickyWrapper from "../../StickyWrapper/StickyWrapper";
import { TextField, Typography, FormControlLabel, Button } from "@mui/material";
import api from "../../API/api";
import getOrderTotal from "../../../utils/getOrderTotal";
import OrderDetails from "../../OrderDetails/OrderDetails";
import "./OrderSummary.css";
import { setOrders } from "../../../stores/reducers";

interface OrderSummaryPropsType extends HTMLProps<HTMLDivElement> {
  isEdit?: boolean;
  handleBackClick: () => void;
  closeOrderModal: () => void;
}

const OrderSummary = ({
  style,
  isEdit,
  handleBackClick,
  closeOrderModal,
}: OrderSummaryPropsType) => {
  const dispatch = useDispatch();

  const selectedHall: HallType | null = useSelector(
    (state: AppState) => state.selectedHall
  );
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );
  const order: OrderType = useSelector((state: AppState) => state.order);
  const orders: OrderType[] = useSelector((state: AppState) => state.orders);
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const paidNumberField = useRef<HTMLInputElement>(null);

  const getOrderData = () => {
    return {
      ...order,
      products: order?.products?.map((item) => {
        return { slug: item.product.slug, amount: item.amount };
      }),
      paidAmount: paidNumberField.current?.value,
      table: selectedTable?.id,
    };
  };

  const handleSubmitOrder = () => {
    if (isEdit) {
      api
        .put(
          `/order/${order?.id}`,
          {
            ...order,
            products: order?.products?.map((item) => {
              return { slug: item.product.slug, amount: item.amount };
            }),
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          closeOrderModal();
          let ordersCopy = orders.map((item) => {
            if (item.id === order.id) {
              return { ...order };
            }
            return item;
          });
          dispatch(setOrders([...ordersCopy]));
        });
    } else {
      api
        .post("/orders", getOrderData(), {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          closeOrderModal();
          dispatch(setOrders([...orders, order]));
        });
    }
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
        {isEdit
          ? !!!order?.table
            ? "Order Summary"
            : `Order Summary for ${order?.hall},
        ${order?.table}`
          : order?.isTakeaway
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
          {isEdit ? "Edit Order" : "Create Order"}
        </Button>
      </StickyWrapper>
    </div>
  );
};

export default OrderSummary;
