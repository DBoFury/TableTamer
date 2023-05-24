import { ReactElement } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

interface FadingModalPropsType {
  open: boolean;
  handleModalClose: () => void;
  children: ReactElement;
}

const FadingModal = ({
  open,
  handleModalClose,
  children,
}: FadingModalPropsType) => {
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
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
};

export default FadingModal;
