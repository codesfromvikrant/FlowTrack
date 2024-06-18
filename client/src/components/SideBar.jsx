import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiLinkedinFill } from "react-icons/ri";
import { MdWorkspaces, MdTask } from "react-icons/md";
import { IoDocuments, IoSettings, IoLogOut } from "react-icons/io5";
import { setLoggedIn } from "../features/authSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.auth.show_sidebar);

  const activeStyle = (isActive) => ({
    backgroundColor: isActive ? "#e2e8f0" : "",
    color: isActive ? "#475569" : "",
    padding: isActive ? "0.5rem" : "",
    margin: isActive ? "0.3rem 0" : "",
  });

  const menuItems = [
    { to: "/user/explore", icon: RiDashboardFill, text: "Dashboard" },
    { to: "/user/workspaces", icon: MdWorkspaces, text: "Workspaces" },
    { to: "/user/tasks", icon: MdTask, text: "Tasks" },
    { to: "/user/documents", icon: IoDocuments, text: "Documents" },
    { to: "/user/settings", icon: IoSettings, text: "Settings" },
  ];

  const renderMenuItems = menuItems.map(({ to, icon: Icon, text }) => (
    <NavLink
      key={to}
      to={to}
      style={({ isActive }) => activeStyle(isActive)}
      className="flex items-center gap-2 text-slate-600 hover:text-gray-700 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-secondary cursor-pointer"
    >
      <Icon className="text-xl text-slate-600" />
      <p className="font-semibold tracking-wide text-sm">{text}</p>
    </NavLink>
  ));

  return (
    <div
      className={`${
        sidebar ? "lg:flex hidden" : ""
      } lg:flex flex-col justify-between min-w-52 min-h-screen  overflow-y-auto bg-white px-4 pt-8 lg:static fixed top-0 left-0 shadow-md`}
    >
      <div className="flex flex-col items-start gap-6 w-full">
        <nav className="w-full">
          <ul className="w-full">{renderMenuItems}</ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
