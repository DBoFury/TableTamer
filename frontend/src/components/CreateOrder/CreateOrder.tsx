import { useState } from "react";
import { AppState, TableType } from "../../stores/types";
import { resetOrder } from "../../stores/reducers";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import OrderModal from "../OrderModal/OrderModal";
import "./CreateOrder.css";

const CreateOrder = () => {
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );
  const dispatch = useDispatch();

  const handleCreateOrderClick = () => {
    setCreateOrderOpen(true);
  };

  const closeOrderModal = () => {
    setCreateOrderOpen(false);
    dispatch(resetOrder());
  };

  return (
    <div className="create-order-container">
      <Button
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          backgroundColor: "#5c6ac4",
        }}
        onClick={handleCreateOrderClick}>
        {!!selectedTable
          ? `Create order for table ${selectedTable?.tableNumber}`
          : "Create Takeaway order"}
      </Button>
      {createOrderOpen && (
        <OrderModal open={createOrderOpen} closeOrderModal={closeOrderModal} />
      )}
    </div>
  );
};

export default CreateOrder;
