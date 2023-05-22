import { FaChevronUp, FaChevronDown } from "react-icons/fa";
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
          <FaChevronUp />
        ) : sortCriteria === "-id" ? (
          <FaChevronDown />
        ) : null}
      </button>
      <button onClick={() => handleSortCriteriaClick("date")}>
        Date{" "}
        {sortCriteria === "date" ? (
          <FaChevronUp />
        ) : sortCriteria === "-date" ? (
          <FaChevronDown />
        ) : null}
      </button>
      <button onClick={() => handleSortCriteriaClick("price")}>
        Full Price{" "}
        {sortCriteria === "price" ? (
          <FaChevronUp />
        ) : sortCriteria === "-price" ? (
          <FaChevronDown />
        ) : null}
      </button>
    </div>
  );
};

export default OrdersSort;
