import IconButton from "src/components/IconButton";
import { IoMdCreate } from "react-icons/io";
import Image from "src/assets/images/project_bg.jpg";
import WorkspaceBlock from "src/components/workspace/WorkspaceBlock";
import Modal from "src/components/Modal/Modal";
import WorkspaceForm from "src/components/workspace/WorkspaceForm";
import { toggleModalVisibility } from "src/features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllWorkspaces } from "src/features/workspaceSlice";

const Workspace = () => {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state: any) => state.workspace);
  const allWorkspaceData = workspace?.data;

  useEffect(() => {
    dispatch(getAllWorkspaces());
  }, []);

  return (
    <main className="w-full">
      <div id="head_cover" className="w-full h-40">
        <img src={Image} className="w-full h-full object-cover" />
      </div>

      <div id="container" className="max-w-5xl mx-auto my-4">
        <div className="w-full rounded-lg shadow-md px-4 py-2 bg-primary flex justify-between items-center gap-10">
          <h3 className="text-xl font-medium text-white">Workspaces Board</h3>

          <IconButton
            onClick={() => {
              dispatch(toggleModalVisibility(true));
            }}
            label={"Create New Workspace"}
            icon={<IoMdCreate className="text-xl" />}
            active={false}
          />
        </div>

        <Modal>
          <WorkspaceForm />
        </Modal>
        {allWorkspaceData && <WorkspaceBlock data={allWorkspaceData} />}
      </div>
    </main>
  );
};

export default Workspace;
