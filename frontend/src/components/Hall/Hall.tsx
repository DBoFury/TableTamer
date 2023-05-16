import { useState } from "react";
import { AppState, HallType } from "../../stores/types";
import { useSelector } from "react-redux";
import HallsNavBar from "./HallsNavBar/HallsNavBar";
import Tables from "./Tables/Tables";
import "./Hall.css";

const Hall = () => {
  const [selectedHall, setSelectedHall] = useState<HallType | null>(null);
  const halls: HallType[] | null = useSelector(
    (state: AppState) => state.hallsData
  );

  const handleHallClick = (hall: HallType | null) => {
    setSelectedHall(hall);
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
