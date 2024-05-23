import React from "react";
import { useDispatch } from "react-redux";
import { toggleTaskForm } from "src/features/tasksSlice";
import { setCurrentId } from "src/features/tasksSlice";

const statusStyles = {
  to_do: {
    backgroundColor: "#0666eb58",
    color: "#0666eb",
  },
  in_progress: {
    backgroundColor: "#d6eb1358",
    color: "#d6eb13",
  },
  on_hold: {
    backgroundColor: "#b82d0a5f",
    color: "#b82d0a",
  },
  completed: {
    backgroundColor: "#08852774",
    color: "#07962b",
  },
};

const priorityStyles = {
  minor: {
    backgroundColor: "#0666eb58",
    color: "#0666eb",
  },
  major: {
    backgroundColor: "#d6eb1358",
    color: "#d6eb13",
  },
  critical: {
    backgroundColor: "#b82d0a5f",
    color: "#b82d0a",
  },
};

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
    <div className="bg-white shadow-md p-2 rounded-lg text-sm text-slate-600">
      <div className="flex justify-between items-start">
        <span
          onClick={handleToggleTaskForm}
          className="capitalize hover:text-blue-500 cursor-pointer font-semibold"
        >
          {data?.name}
        </span>
        <i className="fa-solid fa-ellipsis text-xl hover:text-blue-500 cursor-pointer"></i>
      </div>

      <div className="flex justify-between items-center gap-1 font-semibold">
        <span>
          Deadline :{" "}
          <span className="text-red-500">{spliceDate(data?.endDate)}</span>
        </span>
        <div className="flex justify-end items-center gap-1 text-xs capitalize  text-white">
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
    </div>
  );
};

export default TaskBlock;
