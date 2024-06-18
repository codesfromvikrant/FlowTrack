import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WorkspaceHeader from "../../modules/Workspace/WorkspaceHeader";
import { Outlet } from "react-router-dom";

const Workspace = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();

  return (
    <main className="">
      <WorkspaceHeader />
      <Outlet />
    </main>
  );
};

export default Workspace;
