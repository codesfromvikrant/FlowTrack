import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toggleTaskForm } from "src/features/tasksSlice";
import { setCurrentId } from "src/features/tasksSlice";

const TaskBlock = ({ data, tasksGroupId }) => {
  const dispatch = useDispatch();

  const handleToggleTaskForm = () => {
    dispatch(toggleTaskForm(true));
    dispatch(setCurrentId({ key: "tasks", value: data._id }));
    dispatch(setCurrentId({ key: "tasksgroups", value: tasksGroupId }));
  };

  const spliceDate = (date) => {
    if (!date) return;
    return date.split("T")[0];
  };

  return (
    <div className="bg-secondary p-2 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <span
          onClick={handleToggleTaskForm}
          className="capitalize hover:text-blue-500 cursor-pointer font-medium"
        >
          {data?.name}
        </span>
        <CiMenuKebab className="text-xl hover:text-blue-500 cursor-pointer" />
      </div>

      <span className="text-gray-600 text-sm">{data?.description}</span>

      <div className="flex justify-between items-center mt-2 text-sm font-medium">
        <div className="">
          <div className="text-gray-400">Start Date:</div>
          <div className="text-slate-600">{spliceDate(data?.startDate)}</div>
        </div>

        <div className="">
          <div className="text-gray-400">End Date:</div>
          <div className="text-gray-600">{spliceDate(data?.endDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskBlock;
