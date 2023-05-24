import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { AppState, UserType } from "../../stores/types";
import UserActions from "../UserActions/UserActions";
import "./UserAvatar.css";
import SettingsModal from "../SettingsModal/SettingsModal";

const UserAvatar = () => {
  const avatarRef = useRef(null);
  const [isUserActionsOpen, setIsUserActionsOpen] = useState<boolean>(false);
  const [isUserSettingsModalOpen, setIsUserSettingsModalOpen] =
    useState<boolean>(false);
  const user: UserType | null = useSelector((state: AppState) => state.user);

  let initials = "";

  if (user?.firstName) {
    initials += user?.firstName.charAt(0);
  }

  if (user?.lastName) {
    initials += user?.lastName.charAt(0);
  }

  if (!initials && user?.email) {
    initials = user?.email.charAt(0);
  }

  const handleAvatarClick = () => {
    setIsUserActionsOpen(!isUserActionsOpen);
  };

  return (
    <div className="user-avatar-container">
      <div ref={avatarRef} onClick={handleAvatarClick}>
        {user?.imageUrl ? (
          <img src={user?.imageUrl || ""} />
        ) : (
          <div className="round-name-avatar">{initials}</div>
        )}
      </div>
      <UserActions
        isOpened={isUserActionsOpen}
        closeUserActions={() => setIsUserActionsOpen(false)}
        handleSettingsClick={() => setIsUserSettingsModalOpen(true)}
        avatarRef={avatarRef}
      />
      <SettingsModal
        open={isUserSettingsModalOpen}
        handleModalClose={() => setIsUserSettingsModalOpen(false)}
      />
    </div>
  );
};

export default UserAvatar;
