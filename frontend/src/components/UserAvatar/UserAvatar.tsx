import { useSelector } from "react-redux";
import "./UserAvatar.css";
import { AppState, UserType } from "../../stores/types";

const UserAvatar = () => {
  const user: UserType | null = useSelector((state: AppState) => state.user);

  return <div>UserAvatar</div>;
};

export default UserAvatar;
