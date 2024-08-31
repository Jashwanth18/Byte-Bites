import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import authService from "../../appwrite backend/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <button
      className="inline-block bg-red-400 px-6 py-2 duration-300 hover:bg-red-600 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
