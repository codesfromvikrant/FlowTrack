import SideBar from "src/components/SideBar";
import MenuIcon from "src/components/MenuIcon";
import { Outlet } from "react-router";

const UserPortal = () => {
  return (
    <div className="flex justify-start items-start">
      <MenuIcon />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default UserPortal;
