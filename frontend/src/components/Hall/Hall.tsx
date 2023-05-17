import { AppState, HallType } from "../../stores/types";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedHall } from "../../stores/reducers";
import HallsNavBar from "./HallsNavBar/HallsNavBar";
import Tables from "./Tables/Tables";
import "./Hall.css";

const Hall = () => {
  const dispatch = useDispatch();
  const halls: HallType[] | null = useSelector(
    (state: AppState) => state.hallsData
  );
  const selectedHall: HallType | null = useSelector(
    (state: AppState) => state.selectedHall
  );

  const handleHallClick = (hall: HallType | null) => {
    dispatch(setSelectedHall(hall));
  };

  return (
    <div className="wrapper">
      <div className="halls-container">
        <HallsNavBar
          halls={halls}
          handleHallClick={handleHallClick}
          selectedHall={selectedHall}
        />
        <div className="tables-container">
          <Tables selectedHall={selectedHall} />
        </div>
      </div>
    </div>
  );
};

export default Hall;
