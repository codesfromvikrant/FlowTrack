import { Button } from "@/components/ui/button";
import WorkspaceBlock from "src/modules/Workspace/WorkspaceBlock";
import Modal from "src/components/Modal";
import WorkspaceForm from "src/forms/WorkspaceForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllWorkspaces,
  toggleActiveWorkspaceForm,
} from "src/features/workspaceSlice";

const WorkspaceBoard = () => {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state) => state.workspace);
  const allWorkspaceData = workspace?.data;

  useEffect(() => {
    dispatch(getAllWorkspaces());
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-10 py-4">
          <h3 className="text-xl font-semibold text-slate-700">
            Workspaces Board
          </h3>

          <div className="flex justify-start items-center gap-2">
            <Button className="bg-primary text-foreground dark:text-gray-200">
              Filter
            </Button>
            <Modal
              buttonLabel="Create Workspace"
              headerTitle="Create New Workspace"
            >
              <WorkspaceForm />
            </Modal>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {allWorkspaceData && <WorkspaceBlock data={allWorkspaceData} />}
      </div>
    </>
  );
};

export default WorkspaceBoard;
