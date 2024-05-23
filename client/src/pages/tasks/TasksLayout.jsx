import { useEffect, useMemo } from "react";
import AddTaskGroup from "src/modules/Tasks/AddTaskGroup";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksGroup } from "src/features/tasksSlice";
import TasksGroup from "src/modules/Tasks/TasksGroup";
import Modal from "src/components/Modal/Modal";
import TaskForm from "src/forms/TaskForm";
import { toggleTaskForm, getAllTasks } from "src/features/tasksSlice";

const TasksLayout = () => {
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.projects.projects.currentId);
  const tasksGroupIds = useSelector((state) => state.tasks.tasksgroups.data);

  const taskForm = useSelector((state) => state.tasks.taskForm);
  const handleTaskFormToggle = (value) => dispatch(toggleTaskForm(value));

  useEffect(() => {
    if (!projectId) return;
    dispatch(getAllTasksGroup(projectId));
    dispatch(getAllTasks(projectId));
  }, [projectId]);

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

      <Modal active={taskForm} handleActive={() => handleTaskFormToggle(false)}>
        <TaskForm />
      </Modal>
    </main>
  );
};

export default TasksLayout;
