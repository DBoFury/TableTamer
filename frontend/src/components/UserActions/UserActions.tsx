import { useEffect } from "react";
import { ImExit } from "react-icons/im";
import { BsFillGearFill } from "react-icons/bs";
import Expand from "react-expand-animated";
import { useDispatch } from "react-redux";
import { resetState } from "../../stores/reducers";
import { useNavigate } from "react-router-dom";
import "./UserActions.css";

interface UserActionsPropsType {
  isOpened: boolean;
  closeUserActions: () => void;
  handleSettingsClick: () => void;
  avatarRef: React.MutableRefObject<null>;
}

const UserActions = ({
  isOpened,
  closeUserActions,
  handleSettingsClick,
  avatarRef,
}: UserActionsPropsType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      //@ts-ignore
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        closeUserActions();
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [closeUserActions]);

  const handleLoginClick = () => {
    localStorage.removeItem("token");
    dispatch(resetState());
    navigate("/login");
  };

  return (
    <>
      <div className="user-actions-wrapper">
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
    </>
  );
};

export default UserActions;
