import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../components/API/api";
import { resetState, setOrders } from "../../stores/reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppState, FetchedOrderType } from "../../stores/types";
import ExpandableOrder from "../../components/ExpandableOrder/ExpandableOrder";
import ReactPaginate from "react-paginate";
import OrdersSort from "../../components/OrdersSort/OrdersSort";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const orders: FetchedOrderType[] | null = useSelector(
    (state: AppState) => state.orders
  );

  const [itemOffset, setItemOffset] = useState<number>(0);
  const [openedOrder, setOpenedOrder] = useState<number | null>(null);
  const [sortCriteria, setSortCriteria] = useState("id");

  const itemsPerPapge = 1;

  const endOffset = itemOffset + itemsPerPapge;
  const currentItems = orders?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders?.length || 0 / itemsPerPapge);

  const fetchOrders = async (criteria: string = "id") => {
    try {
      const response = await api.get(`/orders?sort=${criteria}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const fetchedOrders: FetchedOrderType[] = response.data;
      dispatch(setOrders(fetchedOrders));
    } catch {
      localStorage.removeItem("token");
      dispatch(resetState());
      navigate("/login");
    }
  };

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPapge) % (orders?.length || 1);
    setItemOffset(newOffset);
  };

  const handleOpenOrder = (id: number) => {
    if (id === openedOrder) {
      setOpenedOrder(null);
    } else {
      setOpenedOrder(id);
    }
  };

  const handleSortCriteriaClick = (criteria: string) => {
    let newCriteria = "";
    if (criteria === sortCriteria) {
      if (sortCriteria.includes("-")) {
        newCriteria = criteria;
      } else {
        newCriteria = `-${criteria}`;
      }
    } else {
      newCriteria = criteria;
    }
    setSortCriteria(newCriteria);
    fetchOrders(newCriteria);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <OrdersSort
        sortCriteria={sortCriteria}
        handleSortCriteriaClick={handleSortCriteriaClick}
      />
      <div className="orders-container">
        {currentItems?.map((order) => (
          <ExpandableOrder
            key={order.id}
            order={order}
            isOpened={openedOrder === order.id}
            handleClick={handleOpenOrder}
          />
        ))}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Orders;
