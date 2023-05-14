import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./ErrorModal.css";

type ErrorModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({ open, message, onClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={open}>
        <div className="modal-message-container">
          <div className="modal-message-title">Error</div>
          <div className="modal-message-content">{message}</div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ErrorModal;
