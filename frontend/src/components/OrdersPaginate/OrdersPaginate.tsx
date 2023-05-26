import ReactPaginate from "react-paginate";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import "./OrdersPaginate.css";

interface OrdersPaginatePropsType {
  pageCount: number;
  handlePageClick: (event: any) => void;
}

const OrdersPaginate = ({
  pageCount,
  handlePageClick,
}: OrdersPaginatePropsType) => {
  return (
    <ReactPaginate
      activeClassName={"item active"}
      breakClassName={"item break-me"}
      breakLabel={"..."}
      containerClassName={"pagination"}
      disabledClassName={"disabled-page"}
      marginPagesDisplayed={2}
      nextClassName={"item next"}
      nextLabel={<IoArrowForward style={{ fontSize: 30, width: 50 }} />}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageClassName={"item pagination-page"}
      pageRangeDisplayed={2}
      previousClassName={"item previous"}
      previousLabel={<IoArrowBack style={{ fontSize: 30, width: 50 }} />}
    />
  );
};

export default OrdersPaginate;
