import { useRef } from "react";
import FadingModal from "../FadingModal/FadingModal";
import { TextField, InputAdornment, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../stores/reducers";
import "./SettingsModal.css";
import { AppState, UserType } from "../../stores/types";
import api from "../API/api";

interface SettingsModalPropsType {
  open: boolean;
  handleModalClose: () => void;
}

interface UpdatedUser {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
}

const SettingsModal = ({ open, handleModalClose }: SettingsModalPropsType) => {
  const dispatch = useDispatch();
  const jwt: string | null = useSelector((state: AppState) => state.jwtToken);
  const user: UserType | null = useSelector((state: AppState) => state.user);
  const firstNameRef = useRef<HTMLInputElement>();
  const lastNameRef = useRef<HTMLInputElement>();
  const phoneNumberRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();

  const handleSubmit = () => {
    const updatedUser: UpdatedUser = {};

    if (firstNameRef.current?.value) {
      updatedUser.firstName = firstNameRef.current.value;
    }

    if (lastNameRef.current?.value) {
      updatedUser.lastName = lastNameRef.current.value;
    }

    if (phoneNumberRef.current?.value) {
      updatedUser.phoneNumber = phoneNumberRef.current.value;
    } else if (user?.phoneNumber) {
      updatedUser.phoneNumber = user.phoneNumber;
    }

    if (emailRef.current?.value) {
      updatedUser.email = emailRef.current.value;
    } else if (user?.email) {
      updatedUser.email = user.email;
    }

    if (updatedUser.phoneNumber && !updatedUser.phoneNumber?.includes("+380")) {
      updatedUser.phoneNumber = "+380" + updatedUser.phoneNumber;
    }

    api
      .put("/user-details", updatedUser, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        const { email, phoneNumber, firstName, lastName, imageUrl } =
          response.data;
        dispatch(
          setUser({ email, phoneNumber, firstName, lastName, imageUrl })
        );
      })
      .catch((error) => {
        console.log(error);
      });

    handleModalClose();
  };

  return (
    <FadingModal open={open} handleModalClose={handleModalClose}>
      <div className="settings-modal-container">
        <div className="user-change-form">
          <TextField
            label="First Name"
            defaultValue={user?.firstName}
            inputRef={firstNameRef}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Last Name"
            defaultValue={user?.lastName}
            inputRef={lastNameRef}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Phone Number"
            defaultValue={user?.phoneNumber?.substring(4)}
            inputRef={phoneNumberRef}
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+380</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            defaultValue={user?.email}
            inputRef={emailRef}
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </div>

        <Button
          sx={{
            maxWidth: "600px",
            width: "100%",
            alignSelf: "center",
          }}
          onClick={handleSubmit}
          variant="contained"
          color="primary">
          Save
        </Button>
      </div>
    </FadingModal>
  );
};

export default SettingsModal;
