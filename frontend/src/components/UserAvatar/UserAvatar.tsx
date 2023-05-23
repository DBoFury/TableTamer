import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState, UserType } from "../../stores/types";
import UserActions from "../UserActions/UserActions";
import "./UserAvatar.css";

const UserAvatar = () => {
  const [isUserActionsOpen, setIsUserActionsOpen] = useState<boolean>(false);
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

  const handleAvatarClick = (isOpened: boolean) => {
    setIsUserActionsOpen(!isOpened);
  };

  return (
    <div
      onClick={() => handleAvatarClick(isUserActionsOpen)}
      className="user-avatar-container">
      {user?.imageUrl ? (
        <img src={user?.imageUrl || ""} />
      ) : (
        <div className="round-name-avatar">{initials}</div>
      )}
      <UserActions
        closeUserActions={() => handleAvatarClick(true)}
        isOpened={isUserActionsOpen}
      />
    </div>
  );
};

export default UserAvatar;
