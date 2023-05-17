import { AppState, TableType } from "../../stores/types";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTable } from "../../stores/reducers";
import TableImage from "../../assets/table.png";
import "./TableButton.css";

interface TableButtonPropsType {
  table: TableType;
}

const TableButton = ({ table }: TableButtonPropsType) => {
  const dispatch = useDispatch();
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );

  const handleTableClick = () => {
    console.log(table);
    dispatch(setSelectedTable(table));
  };

  return (
    <button className="image-button" onClick={handleTableClick}>
      <img src={TableImage} />
      Table number: {table.tableNumber}
    </button>
  );
};

export default TableButton;
