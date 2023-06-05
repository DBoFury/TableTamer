import { FaChevronUp } from "react-icons/fa";

interface SpinningChevronPropsType {
  isOpen: boolean;
  startRotation?: number;
}

const SpinningChevron = ({
  isOpen,
  startRotation,
}: SpinningChevronPropsType) => {
  return (
    <div className="spinning-chevron-container">
      <FaChevronUp
        style={{
          transform: `rotate(${isOpen ? -180 : startRotation || 0}deg)`,
          transition: "all 0.3s ease-in",
        }}
      />
    </div>
  );
};

export default SpinningChevron;
