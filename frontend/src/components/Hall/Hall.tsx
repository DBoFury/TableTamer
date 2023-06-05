import { AppState, HallType } from "../../stores/types";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHall, setSelectedTable } from "../../stores/reducers";
import HallsNavBar from "./HallsNavBar/HallsNavBar";
import Tables from "./Tables/Tables";
import "./Hall.css";

const Hall = () => {
  const dispatch = useDispatch();
  const halls: HallType[] | null = useSelector(
    (state: AppState) => state.halls
  );
  const selectedHall: HallType | null = useSelector(
    (state: AppState) => state.selectedHall
  );

  const handleHallClick = (hall: HallType | null) => {
    if (hall === selectedHall) {
      dispatch(setSelectedHall(null));
      dispatch(setSelectedTable(null));
    } else {
      dispatch(setSelectedHall(hall));
    }
  };

  return (
    <div className="wrapper">
      <div className="halls-container">
        <HallsNavBar
          halls={halls}
          handleHallClick={handleHallClick}
          selectedHall={selectedHall}
        />
        <Tables selectedHall={selectedHall} />
      </div>
    </div>
  );
};

export default Hall;
