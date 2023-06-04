import { TableType } from "../../stores/types";
import { IconButton, Typography } from "@mui/material";
import { MdTableRestaurant } from "react-icons/md";
import { useWindowWidth } from "@react-hook/window-size";
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
  const width = useWindowWidth();

  const handleClicK = () => {
    handleTableClick(table);
  };

  return (
    <div className="table-button">
      <IconButton
        onClick={handleClicK}
        color={isSelected ? "primary" : "default"}
        aria-label="Table">
        <MdTableRestaurant
          size={width < 768 ? 100 : 200}
          style={{ fontSize: width < 768 ? "1rem" : "1.5rem" }}
        />
      </IconButton>
      <Typography
        color={isSelected ? "primary" : "grey"}
        sx={{ fontWeight: "bold" }}>
        Table number {table.tableNumber}
      </Typography>
    </div>
  );
};

export default TableButton;
