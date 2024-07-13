import SideBar from "@/modules/SideBar";
import { Outlet } from "react-router";
import Header from "@/components/Header";

const UserPortal = () => {
  return (
    <main>
      <Header />
      <div className="flex justify-start items-start">
        <SideBar />
        <Outlet />
      </div>
    </main>
  );
};

export default UserPortal;
