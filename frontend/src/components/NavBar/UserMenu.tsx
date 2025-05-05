import React, { useState } from "react";
import type { User } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import { logout } from "../../features/users/usersThunks.ts";
import { unsetUser } from "../../features/users/usersSlice.ts";
import { toast } from "react-toastify";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [userOptionsEl, setUserOptionsEl] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handeClick = () => {
    setUserOptionsEl(!userOptionsEl);
  };

  const handleClose = () => {
    setUserOptionsEl(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(unsetUser());
    handleClose();
    toast.success("Logout is successful");
  };

  return (
    <div className="relative">
      <button
        onClick={handeClick}
        className="text-white hover:text-gray-300 focus:outline-none font-semibold"
      >
        Hello, {user.username}
      </button>

      {userOptionsEl && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
          <button
            className="w-full py-2 text-gray-800 hover:text-gray-500 font-semibold"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
