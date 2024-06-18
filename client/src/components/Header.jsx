import React from "react";
import Logo from "@/assets/icons/workflow.png";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "@/components/theme-provider";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const signOut = () => {
    sessionStorage.removeItem("user_data");
    dispatch(setLoggedIn(false));
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-4 bg-white border-b-[1px] border-gray-200">
      <div className="flex items-center">
        <img src={Logo} className="w-10" alt="mediaharbor-logo" />
        <p className="text-lg font-black text-slate-700">Flowtrack</p>
      </div>

      <div className="flex justify-start items-center gap-2">
        <div
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="text-slate-700 hover:text-blue-600 transition-all duration-300 text-xl cursor-pointer"
        >
          {theme === "dark" ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </div>

        <IoLogOut
          onClick={signOut}
          className="text-2xl text-slate-700 hover:text-blue-600 transition-all duration-300 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
