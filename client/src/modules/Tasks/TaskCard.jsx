import React from "react";
import { useDispatch } from "react-redux";
import { toggleTaskForm } from "src/features/tasksSlice";
import { setCurrentId } from "src/features/tasksSlice";
import parse from "html-react-parser";
import { FaRegComments } from "react-icons/fa";
import { LuTags } from "react-icons/lu";
import Dropdown from "@/components/Dropdown";

const statusStyles = {
  to_do: {
    backgroundColor: "#2563eb",
  },
  in_progress: {
    backgroundColor: "#facc15",
  },
  on_hold: {
    backgroundColor: "#dc2626",
  },
  completed: {
    backgroundColor: "#059669",
  },
};

const priorityStyles = {
  minor: {
    backgroundColor: "#06b6d4",
  },
  major: {
    backgroundColor: "#0e7490",
  },
  critical: {
    backgroundColor: "#1e3a8a",
  },
};

const TaskCard = ({ data, groupId }) => {
  const dispatch = useDispatch();

  const handleToggleTaskForm = () => {
    dispatch(toggleTaskForm(true));
    dispatch(setCurrentId({ key: "tasks", value: data._id }));
    dispatch(setCurrentId({ key: "tasksgroups", value: groupId }));
  };

  const spliceDate = (date) => {
    if (!date) return;
    return date.split("T")[0];
  };

  const dropdownItems = [
    {
      label: "Edit",
      onClick: () => {
        handleToggleTaskForm();
      },
    },
    {
      label: "Delete",
      onClick: () => {},
    },
  ];

  return (
    <div className="bg-secondary shadow-md p-3 rounded-lg text-sm text-secondary-foreground">
      <div className="flex justify-between items-start gap-2">
        <span
          onClick={handleToggleTaskForm}
          className="capitalize hover:text-blue-500 cursor-pointer font-semibold"
        >
          {data?.name}
        </span>

        <Dropdown
          dropdownItems={dropdownItems}
          triggerComponent={
            <i className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer"></i>
          }
        />
      </div>

      <div className="text-xs text-muted-foreground mt-1 mb-3 font-medium">
        {parse(data?.description)}
      </div>

      <div className="flex justify-between items-center gap-1 font-semibold">
        <span>
          Deadline :{" "}
          <span className="text-red-500 font-bold">
            {spliceDate(data?.endDate)}
          </span>
        </span>
        <div className="flex justify-end items-center gap-1 text-xs capitalize text-white">
          <span
            style={statusStyles[data?.status]}
            className="py-1 px-2 rounded"
          >
            {data?.status.replace(/_/g, " ")}
          </span>
          <span
            style={priorityStyles[data?.priority]}
            className="py-1 px-2 rounded"
          >
            {data?.priority}
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-3 pt-2 border-t-[1px] border-gray-200">
        <div className="text-slate-500 text-xl flex justify-start items-center gap-2">
          <FaRegComments />
          <LuTags />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
