import SpinningChevron from "../SpinningChevron/SpinningChevron";
import "./OrdersSort.css";

interface OrdersSortPropsType {
  sortCriteria: string;
  handleSortCriteriaClick: (criteria: string) => void;
}

const OrdersSort = ({
  sortCriteria,
  handleSortCriteriaClick,
}: OrdersSortPropsType) => {
  return (
    <div className="orders-sorting-container">
      <button onClick={() => handleSortCriteriaClick("id")}>
        Id{" "}
        {sortCriteria === "id" ? (
          <SpinningChevron isOpen={true} />
        ) : sortCriteria === "-id" ? (
          <SpinningChevron isOpen={false} />
        ) : null}
      </button>
      <button onClick={() => handleSortCriteriaClick("date")}>
        Date{" "}
        {sortCriteria === "date" ? (
          <SpinningChevron isOpen={true} />
        ) : sortCriteria === "-date" ? (
          <SpinningChevron isOpen={false} />
        ) : null}
      </button>
      <button onClick={() => handleSortCriteriaClick("price")}>
        Full Price{" "}
        {sortCriteria === "price" ? (
          <SpinningChevron isOpen={true} />
        ) : sortCriteria === "-price" ? (
          <SpinningChevron isOpen={false} />
        ) : null}
      </button>
    </div>
  );
};

export default OrdersSort;
