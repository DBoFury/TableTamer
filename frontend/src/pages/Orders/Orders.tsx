import { useState, useEffect } from "react";
import api from "../../components/API/api";
import { setOrders } from "../../stores/reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppState, FetchedOrderType } from "../../stores/types";
import ExpandableOrder from "../../components/ExpandableOrder/ExpandableOrder";

const Orders = () => {
  const dispatch = useDispatch();
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const orders: FetchedOrderType[] | null = useSelector(
    (state: AppState) => state.orders
  );

  const [openedOrder, setOpenedOrder] = useState<number | null>(null);

  const handleOpenOrder = (id: number) => {
    if (id === openedOrder) {
      setOpenedOrder(null);
    } else {
      setOpenedOrder(id);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        const fetchedOrders: FetchedOrderType[] = response.data;
        console.log(response.data);
        dispatch(setOrders(fetchedOrders));
      } catch {
        dispatch(setOrders([]));
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="orders-sorting-container">
        <button>Id</button>
        <button>Date</button>
        <button>Full Price</button>
      </div>
      <div className="orders-container">
        {orders?.map((order) => (
          <ExpandableOrder
            key={order.id}
            order={order}
            isOpened={openedOrder === order.id}
            handleClick={handleOpenOrder}
          />
        ))}
      </div>
    </>
  );
};

export default Orders;
