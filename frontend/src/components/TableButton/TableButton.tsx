import { TableType } from "../../stores/types";
import TableImage from "../../assets/table.png";
import "./TableButton.css";

interface TableButtonPropsType {
  isSelected: boolean;
  table: TableType;
  handleTableClick: (table: TableType) => void;
}

const TableButton = ({
  isSelected,
  table,
  handleTableClick,
}: TableButtonPropsType) => {
  const handleClicK = () => {
    handleTableClick(table);
  };

  return (
    <button
      className="image-button"
      style={{
        background: isSelected ? "blue" : "none",
      }}
      onClick={handleClicK}>
      <img src={TableImage} />
      Table number: {table.tableNumber}
    </button>
  );
};

export default TableButton;
