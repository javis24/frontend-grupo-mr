import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink to="/dashboard" className="flex items-center">
        <img src="/logo_mr.png" alt="Logo" className="h-16 w-16" />
        </NavLink>
        <div className="flex items-center space-x-4">
          <button
            onClick={logout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition duration-300"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
