import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useParams } from "react-router-dom";
import Modal from "@/components/Modal";
import InviteMembers from "./InviteMembers";

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
        <span className="text-secondary-foreground text-sm font-medium">
          {nav.name}
        </span>
      </NavLink>
    ));
  }, [navs]);

  return (
    <header className="px-8 pt-2 bg-slate-100 dark:bg-gray-900 shadow-md text-secondary-foreground">
      <div className="flex justify-between items-center w-full gap-4">
        <span className="text-xl font-semibold">Wokspace Name</span>

        {/* <Button variant="outline">Invite Members</Button> */}
        <Modal
          buttonLabel="Invite Members"
          headerTitle="Invite Board Members"
          headerDescription="Only addmin members can invite members in the workspace while other member invitation request first have to be approved by admins."
        >
          <InviteMembers />
        </Modal>
      </div>

      <nav className="flex justify-start items-start gap-6">{NavLinkItems}</nav>
    </header>
  );
};

export default WorkspaceHeader;
