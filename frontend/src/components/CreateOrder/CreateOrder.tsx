import { useState } from "react";
import { AppState, TableType } from "../../stores/types";
import { setOrder } from "../../stores/reducers";
import { useSelector, useDispatch } from "react-redux";
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

  const closeProductsModal = () => {
    setCreateOrderOpen(false);
    dispatch(setOrder(null));
  };

  return (
    <div className="create-order-container">
      <button onClick={handleCreateOrderClick}>
        {!!selectedTable
          ? `Create order for table ${selectedTable?.tableNumber}`
          : "Create Takeaway order"}
      </button>
      {createOrderOpen && (
        <OrderModal open={createOrderOpen} onClose={closeProductsModal} />
      )}
    </div>
  );
};

export default CreateOrder;
