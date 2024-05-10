import { useDispatch, useSelector } from "react-redux";
import IconButton from "../IconButton";
import { useState } from "react";
import { createProject } from "src/features/projectsSlice";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const { workspace } = useSelector((state: any) => state.workspace);
  const workspaceId = workspace.currentId;

  const [formStates, setFormStates] = useState({
    name: "",
    description: "",
    workspace: workspaceId,
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const handleFormStates = (e) => {
    setFormStates({ ...formStates, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject(formStates));
  };

  return (
    <form className="space-y-3">
      <input
        type="text"
        name="name"
        value={formStates.name}
        onChange={handleFormStates}
        placeholder="Project Name"
        className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
      />

      <textarea
        name="description"
        value={formStates.description}
        onChange={handleFormStates}
        placeholder="Project Description"
        className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
      ></textarea>

      <div className="flex items-center justify-between gap-3">
        <select
          name="status"
          onChange={handleFormStates}
          value={formStates.status}
          className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
        >
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          name="priority"
          onChange={handleFormStates}
          value={formStates.priority}
          className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
        >
          <option value="minor">Minor</option>
          <option value="major">Major</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="flex justify-between items-center gap-3">
        <input
          type="date"
          name="startDate"
          value={formStates.startDate}
          onChange={handleFormStates}
          className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
        />

        <input
          type="date"
          name="endDate"
          value={formStates.endDate}
          onChange={handleFormStates}
          className="text-gray-200 w-full text-sm py-3 px-2 border-[1px] border-slate-400 rounded-md bg-transparent"
        />
      </div>

      <IconButton onClick={handleSubmit} label="Submit" active={true} />
    </form>
  );
};

export default ProjectForm;
