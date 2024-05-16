import React, { useState } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "src/features/tasksSlice";
import { current } from "@reduxjs/toolkit";

const TaskForm = () => {
  const dispatch = useDispatch();
  const tasksgroupId = useSelector(
    (state) => state.tasks.tasksgroups.currentId
  );
  const projectId = useSelector((state) => state.projects.projects.currentId);
  const currentTaskId = useSelector((state) => state.tasks.tasks.currentId);
  const allTasksData = useSelector((state) => state.tasks.tasks.data);
  const currentTaskData = allTasksData.find(
    (item) => item._id === currentTaskId
  );

  const getFormState = (key, defaultValue) =>
    currentTaskData?.[key] || defaultValue;

  const [formStates, setFormStates] = useState({
    name: getFormState("name", ""),
    description: getFormState("description", ""),
    startDate: getFormState("startDate", ""),
    endDate: getFormState("endDate", ""),
    projectId: getFormState("projectId", projectId),
    tasksgroupId: getFormState("tasksgroupId", tasksgroupId),
  });

  const handleFormStates = (e) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId && tasksgroupId) {
      dispatch(createTask(formStates));
      dispatch(toggleTaskForm(false));
    }
  };

  return (
    <form className="space-y-3">
      <input
        type="text"
        name="name"
        value={formStates.name}
        placeholder="Task Name"
        onChange={handleFormStates}
        className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
      />

      <textarea
        name="description"
        value={formStates.description}
        onChange={handleFormStates}
        placeholder="Task Description"
        className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
      ></textarea>

      <div className="flex justify-between items-center gap-3">
        <div className="">
          <label htmlFor="startDate" className="text-gray-200 text-sm">
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            value={formStates.startDate}
            onChange={handleFormStates}
            className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
          />
        </div>

        <div className="">
          <label htmlFor="endDate" className="text-gray-200 text-sm">
            End Date:
          </label>
          <input
            type="date"
            name="endDate"
            value={formStates.endDate}
            onChange={handleFormStates}
            className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        label="Add Task"
        active={true}
        className={"py-3"}
      />
    </form>
  );
};

export default TaskForm;
