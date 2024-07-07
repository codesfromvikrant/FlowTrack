import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentId } from "src/features/tasksSlice";
import { toggleTaskForm } from "@/features/tasksSlice";
import TaskCard from "./TaskCard";

const TasksGroup = ({ data }) => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.tasks.tasks.data);
  const groupId = data?._id;
  const groupTasksData = allTasks.filter((item) => item.groupId === data._id);

  const renderTaskBlocks = groupTasksData.map((data) => (
    <TaskCard key={data._id} data={data} groupId={groupId} />
  ));

  const handleTaskFormToggle = (value) => {
    dispatch(toggleTaskForm(value));
    dispatch(setCurrentId({ key: "tasks", value: "" }));
    dispatch(setCurrentId({ key: "tasksgroups", value: data._id }));
  };

  return (
    <div className="w-[350px] h-screen text-foreground">
      <div className="mb-1 flex justify-between items-center gap-3">
        <h4 className="font-semibold">{data.name}</h4>
        <i className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer pr-2"></i>
      </div>
      <Button
        onClick={() => handleTaskFormToggle(true)}
        variant="outline"
        className="w-full bg-secondary shadow-none  text-foreground dark:text-gray-200"
      >
        Create Task
      </Button>
      <div className="space-y-3 mt-3">{renderTaskBlocks}</div>
    </div>
  );
};

export default TasksGroup;
