import SideBar from "src/components/SideBar.tsx";
import MenuIcon from "src/components/MenuIcon.tsx";
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
