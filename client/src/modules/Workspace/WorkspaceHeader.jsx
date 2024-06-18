import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";

const WorkspaceHeader = () => {
  const { workspaceId } = useParams();
  const navs = [
    {
      name: "Overview",
      path: `/user/workspaces/${workspaceId}/overview`,
    },
    {
      name: "Tasks",
      path: `/user/workspaces/${workspaceId}/tasks`,
    },
    {
      name: "Documents",
      path: `/user/workspaces/${workspaceId}/documents`,
    },
    {
      name: "Discussion",
      path: `/user/workspaces/${workspaceId}/discussion`,
    },
  ];

  const NavLinkItems = useMemo(() => {
    return navs.map((nav, index) => (
      <NavLink
        key={index}
        to={nav.path}
        style={({ isActive }) => ({
          borderBottom: isActive ? "3px solid #3b82f6" : "",
        })}
        className="cursor-pointer hover:text-blue-500 w-max py-1"
      >
        <span className="text-gray-600 text-sm font-medium">{nav.name}</span>
      </NavLink>
    ));
  }, [navs]);

  return (
    <header className="px-8 pt-2 bg-white border-b-[1px] border-slate-200">
      <div className="flex justify-between items-center w-full gap-4">
        <span className="text-xl text-gray-700 font-semibold">
          Wokspace Name
        </span>

        <Button className="bg-primary text-foreground dark:text-gray-200">
          Open Details
        </Button>
      </div>

      <nav className="flex justify-start items-start gap-6">{NavLinkItems}</nav>
    </header>
  );
};

export default WorkspaceHeader;
