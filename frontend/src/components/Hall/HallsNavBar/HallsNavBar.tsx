import { HallType } from "../../../stores/types";
import { Button } from "@mui/material";
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
        <Button
          key={hall.title}
          onClick={() => handleHallClick(hall)}
          sx={{
            fontWeight: "bold",
            color: selectedHall?.title === hall.title ? "#ffffff" : "#545e6f",
            backgroundColor:
              selectedHall?.title === hall.title ? "#5c6ac4" : "",
          }}>
          {hall.title}
        </Button>
      ))}
    </div>
  );
};

export default HallsNavBar;
