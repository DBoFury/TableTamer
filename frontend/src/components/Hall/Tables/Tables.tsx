import { AppState, HallType, TableType } from "../../../stores/types";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTable } from "../../../stores/reducers";
import TableButton from "../../TableButton/TableButton";
import "./Tables.css";

interface TablesPropsType {
  selectedHall: HallType | null;
}

const Tables = ({ selectedHall }: TablesPropsType) => {
  const dispatch = useDispatch();
  const selectedTable: TableType | null = useSelector(
    (state: AppState) => state.selectedTable
  );

  const handleTableClick = (table: TableType) => {
    dispatch(setSelectedTable(table.id === selectedTable?.id ? null : table));
  };

  return (
    <div className="tables-container">
      {selectedHall?.tables?.map((table: TableType) => (
        <TableButton
          key={table.id}
          isSelected={table.id === selectedTable?.id}
          table={table}
          handleTableClick={handleTableClick}
        />
      ))}
    </div>
  );
};

export default Tables;
