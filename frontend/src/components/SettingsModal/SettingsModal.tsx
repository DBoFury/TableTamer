import FadingModal from "../FadingModal/FadingModal";
import "./SettingsModal.css";

interface SettingsModalPropsType {
  open: boolean;
  handleModalClose: () => void;
}

const SettingsModal = ({ open, handleModalClose }: SettingsModalPropsType) => {
  return (
    <FadingModal open={open} handleModalClose={handleModalClose}>
      <div className="settings-modal-container"></div>
    </FadingModal>
  );
};

export default SettingsModal;
