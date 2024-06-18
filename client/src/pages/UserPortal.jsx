import SideBar from "src/components/SideBar";
import MenuIcon from "src/components/MenuIcon";
import { Outlet } from "react-router";
import Header from "@/components/Header";

const UserPortal = () => {
  return (
    <main>
      <Header />
      <div className="flex justify-start items-start">
        <MenuIcon />
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
};

export default UserPortal;
