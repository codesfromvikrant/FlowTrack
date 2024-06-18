import React from "react";
import { Button } from "@/components/ui/button";
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
    <div className="w-[350px] h-screen text-gray-700">
      <div className="mb-1 flex justify-between items-center gap-3">
        <h4 className="font-semibold">{data.name}</h4>
        <i className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer pr-2"></i>
      </div>
      <Button
        onClick={() => handleTaskFormToggle(true)}
        className="w-full bg-white shadow-none border-[1px] border-gray-300 text-foreground dark:text-gray-200"
      >
        Create Task
      </Button>
      <div className="space-y-3 mt-3">{renderTaskBlocks}</div>
    </div>
  );
};

export default TasksGroup;
