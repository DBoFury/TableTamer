import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./SettingsModal.css";

interface SettingsModalPropsType {
  open: boolean;
  handleModalClose: () => void;
}

const SettingsModal = ({ open, handleModalClose }: SettingsModalPropsType) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <div className="settings-modal-container"></div>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
