import React, { useState } from "react";
import Button from "src/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "src/features/tasksSlice";
import { toggleTaskForm } from "src/features/tasksSlice";
import Tags from "src/components/Tags";
import TextEditor from "src/components/TextEditor";
import Todos from "src/modules/Tasks/Todos";

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

  const spliceDate = (date) => {
    if (!date) return;
    return date.split("T")[0];
  };

  const getFormState = (key, defaultValue) =>
    currentTaskData?.[key] || defaultValue;

  const [selectedTags, setSelectedTags] = useState(getFormState("tags", []));
  const handleSelectedTags = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== id));
    } else {
      setSelectedTags([...selectedTags, id]);
    }
  };

  const [formStates, setFormStates] = useState({
    name: getFormState("name", ""),
    description: getFormState("description", ""),
    startDate: spliceDate(getFormState("startDate", "")),
    endDate: spliceDate(getFormState("endDate", "")),
    status: getFormState("status", "todo"),
    priority: getFormState("priority", "minor"),
    projectId: getFormState("projectId", projectId),
    tasksgroupId: getFormState("tasksgroupId", tasksgroupId),
  });

  const handleFormStates = (e) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };
  const handleDescription = (value) => {
    setFormStates({ ...formStates, description: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectId && tasksgroupId) {
      if (currentTaskId) {
        console.log("update task", currentTaskId);
        dispatch(updateTask(formStates, currentTaskId));
        return;
      }
      dispatch(createTask(formStates));
      dispatch(toggleTaskForm(false));
    }
  };

  return (
    <div className="flex justify-center items-start gap-6">
      <form className="space-y-3">
        <input
          type="text"
          name="name"
          value={formStates.name}
          placeholder="Task Name"
          onChange={handleFormStates}
          className="text-slate-600  font-medium outline-none bg-primary shadow w-full text-sm py-2 px-2 rounded-md"
        />

        <TextEditor
          content={formStates.description}
          handleContentChange={(value) => handleDescription(value)}
        />

        <Todos />
      </form>

      <div className="space-y-2">
        <Tags
          selectedTags={selectedTags}
          handleSelectedTags={handleSelectedTags}
        />

        <div className="">
          <label
            htmlFor="startDate"
            className="text-slate-700 font-medium text-sm"
          >
            Start Date:
          </label>
          <input
            type="date"
            name="startDate"
            value={formStates.startDate}
            onChange={handleFormStates}
            className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-primary shadow rounded-md"
          />
        </div>

        <div className="">
          <label
            htmlFor="endDate"
            className="text-slate-700 font-medium text-sm"
          >
            End Date:
          </label>
          <input
            type="date"
            name="endDate"
            value={formStates.endDate}
            onChange={handleFormStates}
            className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-primary shadow rounded-md"
          />
        </div>

        <div className="">
          <label
            htmlFor="status"
            className="text-slate-700 font-medium text-sm"
          >
            Status:
          </label>
          <select
            name="status"
            onChange={handleFormStates}
            value={formStates.status}
            className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-primary shadow rounded-md "
          >
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="">
          <label
            htmlFor="status"
            className="text-slate-700 font-medium text-sm"
          >
            Priority:
          </label>
          <select
            name="priority"
            onChange={handleFormStates}
            value={formStates.priority}
            className="text-slate-600 font-medium w-full text-sm py-2 px-2 bg-primary shadow rounded-md"
          >
            <option value="minor">Minor</option>
            <option value="major">Major</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <Button
          onClick={handleSubmit}
          label={currentTaskId ? "Update Task" : "Create Task"}
          active={true}
          className={"py-2"}
        />

        <Button
          onClick={handleSubmit}
          label="Delete Task"
          active={false}
          className={"py-2 hover:text-white"}
        />
      </div>
    </div>
  );
};

export default TaskForm;