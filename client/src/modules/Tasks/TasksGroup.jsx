import React from "react";
import Button from "../../components/Button";
import { CiMenuKebab } from "react-icons/ci";
import { toggleTaskForm } from "src/features/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId } from "src/features/tasksSlice";
import TaskBlock from "./TaskBlock";

const TasksGroup = ({ data }) => {
  const dispatch = useDispatch();
  const tasksGroupData = useSelector((state) => state.tasks.tasks.data);
  const tasksGroupId = data?._id;
  const allTasksData = tasksGroupData.filter(
    (item) => item.tasksgroupId === data._id
  );

  const renderTaskBlocks = allTasksData.map((data) => (
    <TaskBlock key={data._id} data={data} tasksGroupId={tasksGroupId} />
  ));

  const handleTaskFormToggle = (value) => {
    dispatch(setCurrentId({ key: "tasks", value: "" }));
    dispatch(toggleTaskForm(value));
    dispatch(setCurrentId({ key: "tasksgroups", value: data._id }));
  };

  return (
    <div className="w-[350px] h-screen bg-slate-100 text-gray-700 p-4 rounded-md shadow-lg">
      <div className="mb-4 flex justify-between items-center gap-6">
        <h4 className="font-semibold">{data.name}</h4>
        <CiMenuKebab className="text-xl" />
      </div>
      <Button
        onClick={() => handleTaskFormToggle(true)}
        label="Add Task"
        className="w-full"
      />
      <div className="space-y-3 mt-3">{renderTaskBlocks}</div>
    </div>
  );
};

export default TasksGroup;
