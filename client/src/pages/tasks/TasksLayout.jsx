import { useEffect, useMemo } from "react";
import AddTaskGroup from "@/modules/Tasks/AddTaskGroup";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksGroup } from "@/features/tasksSlice";
import TasksGroup from "@/modules/Tasks/TasksGroup";
import Modal from "@/components/Modal/Modal";
import TaskForm from "@/forms/TaskForm";
import { toggleTaskForm } from "@/features/tasksSlice";
import { useParams } from "react-router-dom";

const TasksLayout = () => {
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const tasksGroupIds = useSelector((state) => state.tasks.tasksgroups.data);

  const taskForm = useSelector((state) => state.tasks.taskForm);
  const handleTaskFormToggle = (value) => dispatch(toggleTaskForm(value));

  useEffect(() => {
    if (!workspaceId) return;
    dispatch(getAllTasksGroup(workspaceId));
  }, [workspaceId]);

  const renderTaskGroup = useMemo(() => {
    return tasksGroupIds?.map((item) => {
      return <TasksGroup key={item._id} data={item} />;
    });
  }, [tasksGroupIds]);

  return (
    <main className="p-6">
      <div className="w-full inline-flex justify-start items-start gap-6">
        {renderTaskGroup}
        <AddTaskGroup />
      </div>

      <Modal
        isOpen={taskForm}
        onClose={() => handleTaskFormToggle(false)}
        className=""
      >
        <TaskForm />
      </Modal>
    </main>
  );
};

export default TasksLayout;
