import Logo from "../assets/icons/workflow.png";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDashboardFill, RiLinkedinFill } from "react-icons/ri";
import { MdWorkspaces, MdTask } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { IoDocuments, IoSettings, IoLogOut } from "react-icons/io5";
import { setLoggedIn } from "../features/authSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.auth.show_sidebar);

  const activeStyle = (isActive) => ({
    backgroundColor: isActive ? "#ffffff" : "",
    color: isActive ? "#475569" : "",
    padding: isActive ? "0.5rem" : "",
    margin: isActive ? "0.3rem 0" : "",
  });

  const signOut = () => {
    sessionStorage.removeItem("user_data");
    dispatch(setLoggedIn(false));
    navigate("/");
  };

  const menuItems = [
    { to: "/user/explore", icon: RiDashboardFill, text: "Dashboard" },
    { to: "/user/workspaces", icon: MdWorkspaces, text: "Workspaces" },
    { to: "/user/projects", icon: AiFillProject, text: "Projects" },
    { to: "/user/gallery", icon: MdTask, text: "Tasks" },
    { to: "/user/documents", icon: IoDocuments, text: "Documents" },
    { to: "/user/settings", icon: IoSettings, text: "Settings" },
  ];

  const renderMenuItems = menuItems.map(({ to, icon: Icon, text }) => (
    <NavLink
      key={to}
      to={to}
      style={({ isActive }) => activeStyle(isActive)}
      className="flex items-center gap-2 text-slate-600 hover:text-gray-700 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-primary cursor-pointer"
    >
      <Icon className="text-2xl text-slate-700" />
      <p className="font-medium tracking-wide text-sm">{text}</p>
    </NavLink>
  ));

  return (
    <div
      className={`${
        sidebar ? "lg:flex hidden" : ""
      } lg:flex flex-col min-w-max h-[100vh] overflow-y-auto bg-secondary px-4 py-8 lg:static fixed top-0 left-0 z-[99] shadow-md`}
    >
      <div className="flex flex-col items-start gap-6 w-full">
        <div className="flex items-center mx-auto">
          <img src={Logo} className="w-12" alt="mediaharbor-logo" />
          <p className="text-lg font-black text-slate-700">WorkFLow</p>
        </div>
        <nav className="w-full">
          <ul className="w-full">
            {renderMenuItems}
            <li
              onClick={signOut}
              className="flex items-center gap-2 text-slate-600 hover:text-gray-700 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-primary cursor-pointer"
            >
              <IoLogOut className="text-2xl text-slate-700" />
              <p className="font-medium tracking-wide">LogOut</p>
            </li>
          </ul>
        </nav>
        <div className="text-gray-700 w-full">
          <p className="text-xs">Developed By</p>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-semibold">Vikrant Kumar</p>
            <div className="flex gap-3">
              <RiLinkedinFill
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/vikrant-kumar-1b1b3b1b5/"
                  )
                }
                className="text-2xl text-slate-700"
              />
              <i
                onClick={() =>
                  window.open("https://github.com/codesfromvikrant")
                }
                className="fa-brands fa-github text-xl cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
