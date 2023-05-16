import { HallType, TableType } from "../../../stores/types";

interface TablesPropsType {
  selectedHall: HallType | null;
}

const Tables = ({ selectedHall }: TablesPropsType) => {
  console.log(selectedHall);

  const handleTableClick = (table: TableType) => {
    console.log(table);
  };

  return (
    <div className="hall-nav-container">
      {selectedHall?.tables?.map((table: TableType) => (
        <button key={table.tableNumber} onClick={() => handleTableClick(table)}>
          {table.tableNumber}
        </button>
      ))}
    </div>
  );
};

export default Tables;
