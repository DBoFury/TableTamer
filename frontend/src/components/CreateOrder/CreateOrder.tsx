import { useState } from "react";
import { AppState, TableType } from "../../stores/types";
import { useSelector } from "react-redux";
import ProductsModal from "../ProductsModal/ProductsModal";
import "./CreateOrder.css";

const CreateOrder = () => {
  const [createOrderOpen, setCreateOrderOpen] = useState(false);
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );

  const handleCreateOrderClick = () => {
    setCreateOrderOpen(true);
  };

  const closeProductsModal = () => {
    setCreateOrderOpen(false);
  };

  return (
    <div className="create-order-container">
      <button onClick={handleCreateOrderClick}>
        {!!selectedTable
          ? `Create order for table ${selectedTable?.tableNumber}`
          : "Create Takeaway order"}
      </button>
      {createOrderOpen && (
        <ProductsModal
          open={createOrderOpen}
          message={"Test"}
          onClose={closeProductsModal}
        />
      )}
    </div>
  );
};

export default CreateOrder;
