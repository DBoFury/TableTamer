import { HallType, TableType } from "../../../stores/types";
import TableButton from "../../TableButton/TableButton";
import "./Tables.css";

interface TablesPropsType {
  selectedHall: HallType | null;
}

const Tables = ({ selectedHall }: TablesPropsType) => {
  return (
    <div className="tables-container">
      {selectedHall?.tables?.map((table: TableType) => (
        <TableButton key={table.tableNumber} table={table} />
      ))}
    </div>
  );
};

export default Tables;
