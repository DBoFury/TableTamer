import { FaChevronUp } from "react-icons/fa";
import "./SpinningChevron.css";

interface SpinningChevronPropsType {
  isOpen: boolean;
}

const SpinningChevron = ({ isOpen }: SpinningChevronPropsType) => {
  return (
    <div className="spinning-chevron-container">
      <FaChevronUp
        style={{
          transform: `rotate(${isOpen ? -180 : 0}deg)`,
          transition: "all 0.3s ease-in",
        }}
      />
    </div>
  );
};

export default SpinningChevron;
