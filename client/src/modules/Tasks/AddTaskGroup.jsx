import React, { useState } from "react";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { createTasksGroup } from "src/features/tasksSlice";

const AddTaskGroup = () => {
  const dispatch = useDispatch();
  const projectId = useSelector((state) => state.projects.projects.currentId);

  const [formState, setFormState] = useState({
    title: "",
    toggleTaskGroupForm: false,
  });

  const handlFormState = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const toggleTaskGroupForm = () => {
    setFormState({
      ...formState,
      toggleTaskGroupForm: !formState.toggleTaskGroupForm,
    });
  };
  const handleCreateTaskGroup = () => {
    if (!projectId || !formState.title) return;
    dispatch(createTasksGroup({ name: formState.title, projectId }));
    toggleTaskGroupForm();
  };

  return (
    <div className="bg-slate-100 p-4 rounded-md w-[350px] shadow-lg">
      {formState.toggleTaskGroupForm ? (
        <div className="">
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handlFormState}
            placeholder="Enter Task Group Title"
            className="w-full px-3 py-4 text-sm mb-3 bg-slate-200 rounded text-gray-200"
          />
          <div className="flex justify-start items-center gap-2">
            <Button
              onClick={handleCreateTaskGroup}
              label="Add"
              className="w-max"
            />
            <Button
              onClick={toggleTaskGroupForm}
              label="Cancel"
              className="w-max"
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={toggleTaskGroupForm}
          label="Add Task Group"
          active={false}
          className="w-full shadow-none"
        />
      )}
    </div>
  );
};

export default AddTaskGroup;
