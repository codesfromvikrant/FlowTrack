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
      <div className="">
        <div className="max-w-6xl mx-auto flex justify-between items-center gap-10 py-3">
          <h3 className="text-2xl font-bold text-foreground">
            Workspaces Board
          </h3>

          <div className="flex justify-start items-center gap-2">
            <Button
              variant="outline"
              className="bg-secondary text-secondary-foreground"
            >
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
