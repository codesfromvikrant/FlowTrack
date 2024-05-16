import React from "react";
import Button from "../Button";
import { CiMenuKebab } from "react-icons/ci";
import { toggleTaskForm } from "src/features/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId } from "src/features/tasksSlice";
import TaskBlock from "./TaskBlock";

const TasksGroup = ({ data }) => {
  const dispatch = useDispatch();
  const tasksGroupData = useSelector((state) => state.tasks.tasks.data);
  const allTasksData = tasksGroupData.filter(
    (item) => item.tasksgroupId === data._id
  );

  const renderTaskBlocks = allTasksData.map((data) => (
    <TaskBlock data={data} key={data._id} />
  ));

  const handleTaskFormToggle = (value) => {
    dispatch(setCurrentId({ key: "tasks", value: "" }));
    dispatch(toggleTaskForm(value));
    dispatch(setCurrentId({ key: "tasksgroups", value: data._id }));
  };

  return (
    <div className="w-[350px] h-screen bg-primary text-gray-200 p-4 rounded-md shadow-lg">
      <div className="mb-4 flex justify-between items-center gap-6">
        <h4>{data.name}</h4>
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
