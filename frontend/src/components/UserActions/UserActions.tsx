import { useEffect, useRef, useState } from "react";
import { ImExit } from "react-icons/im";
import { BsFillGearFill } from "react-icons/bs";
import Expand from "react-expand-animated";
import { useDispatch } from "react-redux";
import { setUser, setJwtToken } from "../../stores/reducers";
import { useNavigate } from "react-router-dom";
import "./UserActions.css";
import SettingsModal from "../SettingsModal/SettingsModal";

interface UserActionsPropsType {
  isOpened: boolean;
  closeUserActions: () => void;
}

const UserActions = ({ isOpened, closeUserActions }: UserActionsPropsType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const ref = useRef(null);

  console.log("Hello");

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      //@ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        closeUserActions();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeUserActions]);

  const handleLoginClick = () => {
    localStorage.removeItem("token");
    dispatch(setJwtToken(null));
    dispatch(setUser(null));
    navigate("/login");
  };

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <>
      <div ref={ref} className="user-actions-wrapper">
        <Expand open={isOpened} className="user-actions-container">
          <div
            onClick={handleSettingsClick}
            style={{
              borderBottom: "1px solid white",
            }}>
            Settings <BsFillGearFill />
          </div>
          <div onClick={handleLoginClick}>
            Logout <ImExit />
          </div>
        </Expand>
      </div>
      <SettingsModal
        open={isSettingsModalOpen}
        handleModalClose={handleSettingsModalClose}
      />
    </>
  );
};

export default UserActions;
