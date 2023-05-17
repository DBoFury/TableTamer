import { HallType } from "../../../stores/types";
import "./HallsNavBar.css";

interface HallsNavBarPropsType {
  halls: HallType[] | null;
  handleHallClick: (hall: HallType) => void;
  selectedHall: HallType | null;
}

const HallsNavBar = ({
  halls,
  handleHallClick,
  selectedHall,
}: HallsNavBarPropsType) => {
  return (
    <div className="hall-nav-container">
      {halls?.map((hall: HallType) => (
        <button
          key={hall.title}
          onClick={() => handleHallClick(hall)}
          style={{
            backgroundColor:
              selectedHall?.title === hall.title ? "lightblue" : "white",
          }}>
          {hall.title}
        </button>
      ))}
    </div>
  );
};

export default HallsNavBar;
